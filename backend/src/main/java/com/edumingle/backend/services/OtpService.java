package com.edumingle.backend.services;

import com.edumingle.backend.dtos.ForgotPasswordDTO;
import com.edumingle.backend.dtos.PasswordResetDTO;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;


@Service
public class OtpService {

    @Autowired
    UserInfoRepository userInfoRepository;



//    private static final String FIREBASE_SEND_OTP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=AIzaSyDch2cKuU8I5WN9-t35QXmOB-Eb-ImrMpI";

    public PasswordResetDTO verifyNumber(ForgotPasswordDTO forgotPasswordDTO){
        UserInfo userInfo = userInfoRepository.findByPhone(forgotPasswordDTO.getPhone());

        if(userInfo == null){
            return  new PasswordResetDTO("failure");
        }
        return  new PasswordResetDTO("success");
    }

    public PasswordResetDTO changePassword(ForgotPasswordDTO forgotPasswordDTO) throws InvalidKeySpecException, NoSuchAlgorithmException {
        UserInfo userInfo = userInfoRepository.findByPhone(forgotPasswordDTO.getPhone());

        if(userInfo != null) {
            userInfo.setPassword(BCrypt.hashpw(forgotPasswordDTO.getPassword(), BCrypt.gensalt()));

            userInfoRepository.save(userInfo);
            return new PasswordResetDTO("success");
        }
        return new PasswordResetDTO("failure");
    }
}