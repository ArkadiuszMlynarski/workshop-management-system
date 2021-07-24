package com.msi.CarsMechanic.CarsMechanic.Security;

import com.msi.CarsMechanic.CarsMechanic.User.Entity.User;
import com.msi.CarsMechanic.CarsMechanic.User.Repository.UserRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.msi.CarsMechanic.CarsMechanic.Security.SecurityConstants.EXPIRATION_TIME;
import static com.msi.CarsMechanic.CarsMechanic.Security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    @Autowired
    private UserRepository userRepository;

    //Generate the token

    public String generateToken(Authentication authentication){
        UserDetails user = (UserDetails) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expiryDate = new Date(now.getTime()+EXPIRATION_TIME);

        User userToLoadId = userRepository.findByUsername(user.getUsername());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userToLoadId.getId());
        claims.put("username", user.getUsername());
        claims.put("fullName", userToLoadId.getFullName());
        claims.put("roles", user.getAuthorities());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }


    //Validate the token

    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex){
            System.out.println("Invalid JWT Signature");
        } catch (MalformedJwtException ex){
            System.out.println("Invalid JWT Token");
        } catch (ExpiredJwtException ex){
            System.out.println("Expired JWT Token");
        } catch (UnsupportedJwtException ex){
            System.out.println("Unsupported JWT Token");
        } catch (IllegalArgumentException ex){
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

    //Get user id from token

    public Long getUserIdFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.parseLong(id);
    }

    public String getUsernameFromJWT(String token){
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String) claims.get("username");
        return id;
    }}