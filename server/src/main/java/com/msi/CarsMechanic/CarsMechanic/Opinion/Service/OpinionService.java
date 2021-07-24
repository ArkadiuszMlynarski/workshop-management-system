package com.msi.CarsMechanic.CarsMechanic.Opinion.Service;

import com.msi.CarsMechanic.CarsMechanic.Issue.Entity.Issue;
import com.msi.CarsMechanic.CarsMechanic.Issue.Repository.IssueRepository;
import com.msi.CarsMechanic.CarsMechanic.Issue.exceptions.IssueNotFoundException;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Entity.Opinion;
import com.msi.CarsMechanic.CarsMechanic.Opinion.Repository.OpinionRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.Role;
import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.RoleRepository;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Entity.Workshop;
import com.msi.CarsMechanic.CarsMechanic.Workshop.Service.WorkshopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OpinionService {

    @Autowired
    OpinionRepository opinionRepository;

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    WorkshopService workshopService;

    public Opinion addOpinion(Long id, Opinion opinion, String username){

        //ITs to be added to a specific issue, issue != null, BL exists
        Workshop workshop = workshopService.findByWorkshopId(id, username);
        User user = userRepository.findByUsername(username);

        //set the Workshop, User to opinion
        opinion.setWorkshop(workshop);
        opinion.setUser(user);

        //pobranie id issue i nadanie id issue dla opinion
        Issue issue = issueRepository.findByIssueId(opinion.getOpinionedByIssueId());

        //Sprawdzenie, czy dane issue zostało wykonane przez dany workshop
        if(issue == null || issue.getAcceptedOffer() == null){
            throw new IssueNotFoundException("That issue wasn't done by that workshop");
        }
        if (!issue.getAcceptedOffer().getWorkshop().getId().equals(workshop.getId()) && !issue.getStatus().equals("DONE"))
                throw new IssueNotFoundException("That issue wasn't done by that workshop or issue status isn't DONE");

        if (issue.getOpinioned().equals(true))
            throw new IssueNotFoundException("You already opinioned that issue repair");

        if(workshop.getOwner().equals(username)){
            throw new IssueNotFoundException("You can't add opinion to your own workshop");
        }

        opinion.setIssue(issue);
        opinion.setBanned(false);
        opinion.setReported(false);
        opinion.setCreationDate(LocalDateTime.now());
        issue.setOpinioned(true);
        issueRepository.save(issue);
        return opinionRepository.save(opinion);
    }

    public Opinion banOpinion(Long opinionId, String username) {
        Opinion opinion = opinionRepository.findByOpinionId(opinionId);
        if(opinion == null){
            throw new IssueNotFoundException("Opinion not found");
        }
        if(opinion.getBanned()){
            throw new IssueNotFoundException("Opinion already banned");
        }
        opinion.setBanned(true);

        return opinionRepository.save(opinion);
    }

    public Opinion unbanOpinion(Long opinionId, String username) {
        Opinion opinion = opinionRepository.findByOpinionId(opinionId);
        if(opinion == null){
            throw new IssueNotFoundException("Opinion not found");
        }
        if(!opinion.getBanned()){
            throw new IssueNotFoundException("Opinion not banned");
        }
        opinion.setReported(false);
        opinion.setBanned(false);

        return opinionRepository.save(opinion);
    }

    public Opinion reportOpinion(Long opinionId, String username) {
        Opinion opinion = opinionRepository.findByOpinionId(opinionId);
        if(opinion == null){
            throw new IssueNotFoundException("Opinion not found");
        }
        if(!opinion.getWorkshop().getOwner().equals(username)){
            throw new IssueNotFoundException("You trying to report issue that is not to your workshop");
        }
        if(opinion.getReported()){
            throw new IssueNotFoundException("Opinion already reported");
        }
        opinion.setReported(true);

        return opinionRepository.save(opinion);
    }

    public Opinion unreportOpinion(Long opinionId, String username) {

        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName("ADMIN");

        Opinion opinion = opinionRepository.findByOpinionId(opinionId);
        if(opinion == null){
            throw new IssueNotFoundException("Opinion not found");
        }
        if(opinion.getBanned() == true){
            throw new IssueNotFoundException("That opinion is banned");
        }
        if(!opinion.getWorkshop().getOwner().equals(username) && !user.getRoles().contains(role)){
            throw new IssueNotFoundException("You trying to unreport issue that is not to your workshop");
        }
        if(!opinion.getReported()){
            throw new IssueNotFoundException("Opinion is not reported");
        }
        opinion.setReported(false);

        return opinionRepository.save(opinion);
    }

    public Iterable<Opinion> getAllReportedOpinions(String username){
        return opinionRepository.findAllByIsReported(true);
    }

    public Iterable<Opinion> findAllPagedReportedOpinions(Integer pageNo, Integer pageSize, String sortBy, String username){
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<Opinion> pagedResult = opinionRepository.findByIsReportedTrueAndIsBannedFalse(paging);
        return pagedResult;
    }

    public Iterable<Opinion> findAllPagedBannedOpinions(Integer pageNo, Integer pageSize, String sortBy, String username){
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<Opinion> pagedResult = opinionRepository.findByIsBannedTrue(paging);
        return pagedResult;
    }
}
