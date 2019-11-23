package com.msi.CarsMechanic.CarsMechanic.Security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/users/**";
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 1800_000; //30min
}
