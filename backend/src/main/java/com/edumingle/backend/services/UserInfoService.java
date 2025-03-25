package com.edumingle.backend.services;

import com.edumingle.backend.dtos.UserInfoLoginDTO;
import com.edumingle.backend.dtos.requests.SignInRequest;
import com.edumingle.backend.dtos.requests.SignUpRequest;
import com.edumingle.backend.dtos.signinResponseDTO;
import com.edumingle.backend.models.Post;
import com.edumingle.backend.models.UserInfo;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.SequencedCollection;

@Service
public interface UserInfoService {

    List<Post> getAllPostsByUserId(Integer userId);


    UserInfo registerUser(SignUpRequest signUpRequest) throws Exception;

    UserInfo authenticateUser(SignInRequest signInRequest) throws Exception;

    UserInfo updateUserProfile(Integer id, UserInfo userInfo) throws NoSuchAlgorithmException;

    SequencedCollection<UserInfo> getAllUsers() throws NoSuchAlgorithmException;

    UserInfo createUser(UserInfo userInfo) throws NoSuchAlgorithmException, InvalidKeySpecException;

    signinResponseDTO loadUserByUsername(UserInfoLoginDTO userLogin) throws NoSuchAlgorithmException, InvalidKeySpecException;

    UserInfo getUserProfileById(int userId);



}
