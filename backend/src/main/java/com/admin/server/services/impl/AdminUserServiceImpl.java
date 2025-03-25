package com.admin.server.services.impl;

import com.admin.server.dtos.AdminSignInResponseDTO;
import com.admin.server.dtos.UserDeleteDTO;
import com.admin.server.dtos.requests.AdminSignInRequest;
import com.admin.server.dtos.requests.AdminSignUpRequest;
import com.admin.server.models.AdminUser;
import com.admin.server.repositories.AdminProfileRepository;
import com.admin.server.repositories.AdminUserRepository;
import com.admin.server.services.AdminUserService;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.CommunityUserRoleRepository;
import com.edumingle.backend.repositories.DiscussionRepository;
import com.edumingle.backend.repositories.MessageRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AdminUserServiceImpl implements AdminUserService {
    private final AdminUserRepository adminUserRepository;
    private final AdminProfileRepository adminProfileRepository;
    private final UserInfoRepository userInfoRepository;
    private final CommunityUserRoleRepository communityUserRoleRepository;
    private final DiscussionRepository discussionRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public AdminUserServiceImpl(
            AdminUserRepository adminUserRepository,
            AdminProfileRepository adminProfileRepository,
            UserInfoRepository userInfoRepository, CommunityUserRoleRepository communityUserRoleRepository,
            DiscussionRepository discussionRepository, MessageRepository messageRepository) {
        this.adminUserRepository = adminUserRepository;
        this.adminProfileRepository = adminProfileRepository;
        this.userInfoRepository = userInfoRepository;
        this.communityUserRoleRepository = communityUserRoleRepository;
        this.discussionRepository = discussionRepository;
        this.messageRepository = messageRepository;
    }

    @Override
    public List<UserInfo> getAllUsers() throws NoSuchAlgorithmException {
        return userInfoRepository.findAll();
    }

    @Override
    public List<UserInfo> getAllRegularUsers() {
        return userInfoRepository.findAll();
    }

    @Override
    public AdminUser registerUser(AdminSignUpRequest adminSignUpRequest) throws Exception {
        if (adminUserRepository.existsByEmail(adminSignUpRequest.getEmail())) {
            throw new IllegalArgumentException("User already exists with this email address.");
        }

        // Create admin user and save
        AdminUser adminUser = new AdminUser();
        adminUser.setFirstName(adminSignUpRequest.getFirstName());
        adminUser.setLastName(adminSignUpRequest.getLastName());
        adminUser.setEmail(adminSignUpRequest.getEmail());

        // Hash the password
        String hashedPassword = BCrypt.hashpw(adminSignUpRequest.getPassword(), BCrypt.gensalt());
        adminUser.setPassword(hashedPassword);

        System.out.println(adminUser);

        return adminUserRepository.save(adminUser);
    }

    @Override
    public AdminUser authenticateUser(AdminSignInRequest adminSignInRequest) throws Exception {
        AdminUser adminUser = adminUserRepository.findByEmail(adminSignInRequest.getEmail());
        if (adminUser != null) {
            if (BCrypt.checkpw(adminSignInRequest.getPassword(), adminUser.getPassword())) {
                return adminUser;
            }
        }
        throw new RuntimeException("Invalid credentials");
    }

    @Override
    public AdminUser createUser(AdminUser adminUser) throws NoSuchAlgorithmException, InvalidKeySpecException {
        // Check if user already exists
        if (adminUserRepository.existsByEmail(adminUser.getEmail())) {
            throw new IllegalArgumentException("User already exists with this email address.");
        }

        // Hash the password
        adminUser.setPassword(BCrypt.hashpw(adminUser.getPassword(), BCrypt.gensalt()));
        return adminUserRepository.save(adminUser);
    }

    @Override
    public AdminSignInResponseDTO loadUserByUsername(String email, String password)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        AdminUser adminUser = adminUserRepository.findByEmail(email);
        System.out.println("Found admin user: " + adminUser);

        if (adminUser == null) {
            System.out.println("User not registered!!");
            return new AdminSignInResponseDTO("failure", null);
        }

        String hashedDatabasePassword = adminUser.getPassword();
        boolean isMatch = BCrypt.checkpw(password, hashedDatabasePassword);
        System.out.println("Password match: " + isMatch);

        if (!isMatch) {
            System.out.println("PASSWORDS DO NOT MATCH!!");
            return new AdminSignInResponseDTO("failure", null);
        }

        return new AdminSignInResponseDTO("success", adminUser, email, null);
    }

    @Override
    public AdminUser getAdminProfileById(int adminId) {
        return adminUserRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin user not found with id: " + adminId));
    }

    @Override
    public AdminUser updateAdminProfile(AdminUser adminUser) {
        // Check if admin exists
        Optional<AdminUser> existingAdmin = adminUserRepository.findById(adminUser.getId());
        if (existingAdmin.isEmpty()) {
            throw new RuntimeException("Admin user not found with id: " + adminUser.getId());
        }

        // Update admin user
        return adminUserRepository.save(adminUser);
    }

    @Override
    public void temporarilyDeleteUser(int userId) {
        // Implementation for temporarily deleting a user
        // This would typically involve setting a flag rather than actually deleting
        UserInfo user = userInfoRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Set a flag to indicate the user is temporarily deleted
        user.setTemporarilyDeleted(true);
         userInfoRepository.save(user);

        // For now, just log the action
        System.out.println("Temporarily deleted user with ID: " + userId);
    }

    public UserDeleteDTO permanentDelete(int userId){
        messageRepository.deleteBySenderId(userId);
        discussionRepository.deleteByUserInfoId(userId);
        communityUserRoleRepository.deleteByUserInfoId(userId);
        userInfoRepository.deleteById(userId);
        if(userInfoRepository.findById(userId).orElse(null) == null){
            return new UserDeleteDTO(HttpStatus.OK,"User deleted successfully");
        }
        return new UserDeleteDTO(HttpStatus.OK,"Failed to delete user");
    }

    @Override
    public long getTotalUserCount() {
        return userInfoRepository.count();
    }

    public void temporarilyDeleteUser(Integer userId) {
        Optional<UserInfo> optionalUser = userInfoRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserInfo user = optionalUser.get();
            user.setTemporarilyDeleted(true);
            userInfoRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}

