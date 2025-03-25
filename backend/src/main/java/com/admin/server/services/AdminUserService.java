package com.admin.server.services;

import com.admin.server.dtos.AdminLoginDTO;
import com.admin.server.dtos.AdminSignInResponseDTO;
import com.admin.server.dtos.requests.AdminSignInRequest;
import com.admin.server.dtos.requests.AdminSignUpRequest;
import com.admin.server.models.AdminUser;
import com.edumingle.backend.models.UserInfo;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

public interface AdminUserService {
    // Get all admin users
    List<UserInfo> getAllUsers() throws NoSuchAlgorithmException;

    // Get all regular users
    List<UserInfo> getAllRegularUsers();

    // Register a new admin user
    AdminUser registerUser(AdminSignUpRequest adminSignUpRequest) throws Exception;

    // Authenticate an admin user
    AdminUser authenticateUser(AdminSignInRequest adminSignInRequest) throws Exception;

    // Create a new admin user
    AdminUser createUser(AdminUser adminUser) throws NoSuchAlgorithmException, InvalidKeySpecException;

    // Load user by username and password
    AdminSignInResponseDTO loadUserByUsername(String email, String password) throws NoSuchAlgorithmException, InvalidKeySpecException;

    // Get admin profile by ID
    AdminUser getAdminProfileById(int adminId);

    // Update admin profile
    AdminUser updateAdminProfile(AdminUser adminUser);

    // Temporarily delete a user
    void temporarilyDeleteUser(int userId);

    // Get total user count
    long getTotalUserCount();
}

