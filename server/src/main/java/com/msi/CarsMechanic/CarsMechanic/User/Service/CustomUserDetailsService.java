package com.msi.CarsMechanic.CarsMechanic.User.Service;

import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findUserByUsername(username)
                .map(u -> new User(
                        u.getUsername(),
                        u.getPassword(),
                        AuthorityUtils.createAuthorityList(
                                u.getRoles().stream()
                                        .map(r -> "ROLE_"+r.getName().toUpperCase())
                                        .collect(Collectors.toList()).toArray(new String[]{}))))
                .orElseThrow(() -> new UsernameNotFoundException("user n ot found"));
    }

    @Transactional
    public Optional loadUserById(Long id){
        return userRepository.getUserById(id);

    }
}
