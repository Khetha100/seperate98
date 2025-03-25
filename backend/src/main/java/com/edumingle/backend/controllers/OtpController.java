package com.edumingle.backend.controllers;

import com.edumingle.backend.dtos.ForgotPasswordDTO;
import com.edumingle.backend.dtos.OtpResponseDTO;
import com.edumingle.backend.dtos.PasswordResetDTO;
import com.edumingle.backend.dtos.RequestDetailsDTO;
import com.edumingle.backend.services.OtpService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
public class OtpController {

    @Autowired
    private OtpService otpService;


    @PostMapping("/number-verify")
    public  ResponseEntity<PasswordResetDTO> numberExist(@RequestBody ForgotPasswordDTO request){
        return ResponseEntity.ok(otpService.verifyNumber(request));

    }


    @PostMapping("/forgot-password")
    public ResponseEntity<PasswordResetDTO> forgotPassword(@RequestBody ForgotPasswordDTO request) throws InvalidKeySpecException, NoSuchAlgorithmException {
        return ResponseEntity.ok(otpService.changePassword(request));
    }

}