package com.edumingle.backend.controllers;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.billingportal.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}, allowCredentials = "true")
public class PaymentController {
    public PaymentController() {
        Stripe.apiKey = "sk_test_51QrDW5QvnqWgELKLuW9ZkUYcaTyzxqnEPoL55N4pD8j5BhWDpP14pZmeQo1Vpp6cnqXtk3t3xTmv5QFlNvlCSr1v00NtIA8PSc";
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> checkoutSession(
            @RequestBody Map<String, String> request, HttpServletResponse httpServletResponse
    ) throws StripeException, IOException {
        try {
            String YOUR_DOMAIN = "http://localhost:4000/";
            String amount = request.get("amount");

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(YOUR_DOMAIN + "success")
                    .setCancelUrl(YOUR_DOMAIN + "cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("ZAR")
                                                    .setUnitAmount(Long.parseLong(amount) * 100) // Convert dollars to cents
                                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName("Donation")
                                                            .build())
                                                    .build())
                                    .build())
                    .build();

            Session session = Session.create((Map<String, Object>) params);

            Map<String, String> map = new HashMap<>();
            map.put("sessionUrl", session.getUrl());



            return ResponseEntity.ok(map);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Stripe session creation failed"));
        }
    }


}