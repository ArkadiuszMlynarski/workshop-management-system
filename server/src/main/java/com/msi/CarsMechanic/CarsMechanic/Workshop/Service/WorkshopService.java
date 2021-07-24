package com.msi.CarsMechanic.CarsMechanic.Workshop.Service;

import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.UserNotFoundException;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.Role;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.RoleRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Repository.WorkshopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkshopService {

    @Autowired
    private WorkshopRepository workshopRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Workshop saveOrUpdateWorkshop(Workshop workshop, String username){

//        if(issue.getIssueId() != null){
//            Workshop existingIssue = issueRepository.findByIssueId(issue.getIssueId());
//
//            if(existingIssue != null && (!existingIssue.getIssueLeader().equals(username))){
//                throw new IssueNotFoundException("Issue not found in your account");
//            } else if (existingIssue == null){
//                throw new IssueNotFoundException("Issue with ID:'"+issue.getIssueId()+"' cannot be updated, because it doesnt exist");
//            }
//        }

        //TODO weryfikacja czy edytowany workshop nalezy do zalogowanego
        //TODO poki co przy edicie zmienia accepted na false
        User user = userRepository.findByUsername(username);

        workshop.setOwner(user.getUsername());
        workshop.setUser(user);
            workshop.setAccepted(false);

        //Przypisanie tworzacemu WORKSHOP roli WORKSHOPOWNER, gdy jej nie posiada
        if(!user.getRoles().contains(roleRepository.findByName("WORKSHOPOWNER"))){
            Role role = roleRepository.findByName("WORKSHOPOWNER");
            user.addRole(role);
            userRepository.save(user);
        }

        return workshopRepository.save(workshop);
    }

    public Iterable<Workshop> findAllWorkshops(String username){
        return workshopRepository.findAll();
    }

    public Iterable<Workshop> findAllPagedAcceptedWorkshops(Integer pageNo, Integer pageSize, String sortBy, String username){
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<Workshop> pagedResult = workshopRepository.findByAcceptedTrue(paging);
        return pagedResult;
    }

    public Iterable<Workshop> findAllPagedPendingWorkshops(Integer pageNo, Integer pageSize, String sortBy, String username){
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<Workshop> pagedResult = workshopRepository.findByAcceptedFalse(paging);
        return pagedResult;
    }

    public Iterable<Workshop> findAllWorkshopsByOwner(String username){
        return workshopRepository.findAllByOwner(username);
    }


    public void deleteWorkshopById(Long id, String username){
        workshopRepository.delete(findByWorkshopId(id, username));
    }

    public Workshop findByWorkshopId(Long id, String username) {
        Workshop workshop = workshopRepository.getById(id);
        if (workshop == null) {
            throw new UserNotFoundException("Workshop with ID '" + id + "' not found");
        }
        return workshop;
    }

    public Workshop acceptWorkshop(Long id, String username) {
        Workshop workshop = workshopRepository.getById(id);
        workshop.setAccepted(true);

        return workshopRepository.save(workshop);
    }
}

