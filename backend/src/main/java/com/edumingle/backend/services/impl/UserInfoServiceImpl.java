package com.edumingle.backend.services.impl;

import com.edumingle.backend.dtos.UserInfoLoginDTO;
import com.edumingle.backend.dtos.requests.SignInRequest;
import com.edumingle.backend.dtos.requests.SignUpRequest;
import com.edumingle.backend.dtos.signinResponseDTO;
import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.Roles;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.PostRepository;
import com.edumingle.backend.repositories.ProfileRepository;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.UserInfoService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.spec.InvalidKeySpecException;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.SequencedCollection;

@Service
public class UserInfoServiceImpl implements UserInfoService {
    private final UserInfoRepository userInfoRepository;
    private final ProfileRepository profileRepository;
    private final PostRepository postRepository;

    @Autowired
    public UserInfoServiceImpl(UserInfoRepository userInfoRepository, ProfileRepository profileRepository, PostRepository postRepository) {
        this.userInfoRepository = userInfoRepository;
        this.profileRepository = profileRepository;
        this.postRepository = postRepository;
    }

    @Override
    public SequencedCollection<UserInfo> getAllUsers() throws NoSuchAlgorithmException {
        return userInfoRepository.findAll();
    }

    @Override
    public List<Post> getAllPostsByUserId(Integer userId) {
        return profileRepository.getAllPostsById(userId);
    }

    @Override
    public UserInfo registerUser(SignUpRequest signUpRequest) throws NoSuchAlgorithmException {
        if (userInfoRepository.existsByPhone(signUpRequest.getPhone())) {
            throw new IllegalArgumentException("User already exists with this phone number.");
        }

        // Hash the password using BCrypt
//        String hashedPassword = HashProvider.hashPassword(signUpRequest.getPassword());
        String hashedPassword = BCrypt.hashpw(signUpRequest.getPassword(), BCrypt.gensalt());
        String saceNumber = null;

        if (signUpRequest.getRole() == Roles.TEACHER) {
            saceNumber = signUpRequest.getSaceNumber();

            if (saceNumber == null || saceNumber.isBlank()) {
                throw new IllegalArgumentException("Sace number cannot be empty for teachers.");
            }

            if (userInfoRepository.existsBySaceNumber(saceNumber)) {
                throw new IllegalArgumentException("Sace number must be unique for teachers.");
            }
        }

        // Create user info and save
        UserInfo userInfo = new UserInfo(
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getPhone(),
                saceNumber,
                hashedPassword,
                signUpRequest.getRole()
        );
//        System.out.println(userInfo);

        return userInfoRepository.save(userInfo);
    }

    @Override
    public UserInfo authenticateUser(SignInRequest signInRequest) throws Exception {
        UserInfo optionalUserInfo = userInfoRepository.findByPhone(signInRequest.getPhone());
        if (optionalUserInfo != null) {
            UserInfo userInfo = optionalUserInfo;

            if (BCrypt.checkpw(signInRequest.getPassword(), userInfo.getPassword())) {

                userInfoRepository.save(userInfo);
                return userInfo;
            }
        }
        throw new RuntimeException("Invalid credentials");
    }

    @Override
    public UserInfo createUser(UserInfo userInfo) throws NoSuchAlgorithmException, InvalidKeySpecException {
        userInfo.setPassword(BCrypt.hashpw(userInfo.getPassword(), BCrypt.gensalt()));
        return userInfoRepository.save(userInfo);
    }

    @Override
    public signinResponseDTO loadUserByUsername(UserInfoLoginDTO userLogin) throws NoSuchAlgorithmException, InvalidKeySpecException {
        UserInfo userInfo = userInfoRepository.findByPhone(userLogin.getPhone());
//        System.out.println(userInfo);
//        System.out.println(userInfo);
//        System.out.println();


        if (userInfo == null) {
            System.out.println("User not registered!!");
            return null;
        }

        String hashedDatabasePassword = userInfo.getPassword();
        boolean isMatch = BCrypt.checkpw(userLogin.getPassword(), userInfo.getPassword());
//        System.out.println(isMatch);

        if (!isMatch) {
//            System.out.println("PASSWORD DO NOT MATCH!!");
            return new signinResponseDTO("failure", null);
        }
        return new signinResponseDTO("success", userInfo);
    }

    @Override
    public UserInfo updateUserProfile(Integer id, UserInfo userInfo) throws NoSuchAlgorithmException {
//        System.out.println("Attempting to update profile for ID: " + id);
        UserInfo existingProfile = userInfoRepository.findById(id).orElse(null);

        if (existingProfile != null) {
            // Update only the fields that are used for profile editing
            existingProfile.setFirstName(userInfo.getFirstName());
            existingProfile.setLastName(userInfo.getLastName());
            existingProfile.setBio(userInfo.getBio());
            existingProfile.setPhone(userInfo.getPhone());
            existingProfile.setGrades(userInfo.getGrades());
            existingProfile.setImageUrl(userInfo.getImageUrl());

            return userInfoRepository.save(existingProfile);
        }
        return null;
    }

    //this method finds the user by its ID
    @Override
    public UserInfo getUserProfileById(int userId) {
        return profileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        }

    public boolean updateUserProfilePicture(Long id, String base64Image) {
        Optional<UserInfo> optionalUser = Optional.ofNullable(userInfoRepository.findById(id));

        if (optionalUser.isPresent()) {
            UserInfo user = optionalUser.get();
            user.setImageUrl(base64Image);
            userInfoRepository.save(user);
            return true;
        }
        return false;
    }
}
