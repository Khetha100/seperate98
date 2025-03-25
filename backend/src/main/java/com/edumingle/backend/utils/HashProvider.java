package com.edumingle.backend.utils;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class HashProvider {

    private static final int REQUIRED_COST = 12; // The cost factor you want to enforce

    // Method to check if the password hash needs to be rehashed
    public static boolean requiresRehash(String currentHash) {
        // Extract the cost factor from the current hash
        String storedHash = currentHash.substring(0, 4);  // Extract the "$2a$" part
        String cost = currentHash.substring(4, 6);  // Extract the cost factor part (e.g., "12")

        // Compare the stored cost factor with the required cost factor
        return Integer.parseInt(cost) < REQUIRED_COST;
    }

    // Hash password before storing it in the database
    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(REQUIRED_COST));
    }

    // Verify password during authentication
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

}
