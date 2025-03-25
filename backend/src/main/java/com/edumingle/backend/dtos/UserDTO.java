package com.edumingle.backend.dtos;

import com.edumingle.backend.models.Roles;
import com.edumingle.backend.models.UserInfo;

import java.util.stream.Collectors;
import java.util.List;

public class UserDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String bio;
    private String imageUrl;
    private String phone;
    private String saceNumber;
    private Roles role;

    public UserDTO() {}

    public UserDTO(UserInfo userInfo) {
        this.id = userInfo.getId();
        this.firstName = userInfo.getFirstName();
        this.lastName = userInfo.getLastName();
        this.bio = userInfo.getBio();
        this.imageUrl = userInfo.getImageUrl();
        this.phone = userInfo.getPhone();
        this.saceNumber = userInfo.getSaceNumber();
        this.role = userInfo.getRole();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSaceNumber() {
        return saceNumber;
    }

    public void setSaceNumber(String saceNumber) {
        this.saceNumber = saceNumber;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }
}