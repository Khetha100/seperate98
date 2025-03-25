package com.edumingle.backend.controllers;

import com.edumingle.backend.dtos.CommunitySearchResponse;
import com.edumingle.backend.dtos.CommunityUserRoleDTO;
import com.edumingle.backend.dtos.DeleteCommunityDTO;
import com.edumingle.backend.dtos.SearchDTO;
import com.edumingle.backend.models.CommunityUserRole;
import com.edumingle.backend.models.UserInfo;
import com.edumingle.backend.repositories.UserInfoRepository;
import com.edumingle.backend.services.SearchServiceImpl;
import com.edumingle.backend.services.impl.CommunityServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import com.edumingle.backend.models.Community;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4000", maxAge = 3600, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowCredentials = "true")
@RequestMapping("/api/v1/communities")
public class CommunityController {

    private final CommunityServiceImpl communityService;

    @Autowired
    UserInfoRepository userInfoRepository;

    @Autowired
    SearchServiceImpl searchService;

    @Autowired
    public CommunityController(CommunityServiceImpl communityService) {
        this.communityService = communityService;
    }

    // @GetMapping("/community")
    // public ResponseEntity<List<Community>> getAllCommunities(){

    //     return  ResponseEntity.ok(Community);
    // }
    // CommunityService communityService;

    @GetMapping("/")
    public ResponseEntity<List<Community>> getAllCommunities(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = session.getAttribute("USER_ID").toString();

        }

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return  ResponseEntity.ok(communityService.getAllCommunities());
    }

    @PostMapping
    public ResponseEntity<Community> addCommunity(
            @RequestBody Community community,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
//        System.out.println(community);

        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID").toString();

        }
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.addACommunity(community));
    }

    @PutMapping("/community")
    public ResponseEntity<Community> editCommunity(
            @RequestBody Community community,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID");

        }
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.editACommunity(community));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Community> getSingleCommunity(
            @PathVariable Long id,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID");

        }

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.getOneCommunity(id));
    }


    @GetMapping("/members/{communityId}")
    public ResponseEntity<List<UserInfo>> getAllCommunityUsers(
            @PathVariable Integer communityId,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID").toString();

        }

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.getAllCommunityUsers(communityId));
    }

    @PostMapping("/members")
    public ResponseEntity<CommunityUserRole> addCommunityMember(
            @RequestBody CommunityUserRoleDTO communityUserRole,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID").toString();

        }

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.addMemberToCommunity(communityUserRole));
    }

    @GetMapping("/members")
    public ResponseEntity<List<CommunityUserRole>> getCommunityUserRoles(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = session.getAttribute("USER_ID").toString();

        }
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.getAllCommunityUserRole());
    }

    @DeleteMapping("/members/{communityUserRoleId}")
    public ResponseEntity<String> deleteCommunityMember(
            @PathVariable Integer communityUserRoleId,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        HttpSession session = request.getSession(false);
        if (session != null) {
            String userId = (String) session.getAttribute("USER_ID ");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
        }
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        return ResponseEntity.ok(communityService.deleteCommunityMember(communityUserRoleId));
    }

    // search functionality
//    @GetMapping("/search")
//    public ResponseEntity<List<Community>> searchCommunity(
//            @RequestParam String keyword,
//            HttpServletRequest request
//    ) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            String userId = (String) session.getAttribute("USER_ID");
//            System.out.println("Session ID: " + session.getId());
//            System.out.println("User ID: " + userId);
//        }
//
//        List<Community> community = communityService.searchCommunity(keyword);
//        return new ResponseEntity<>(community, HttpStatus.OK);
//    }

    @PostMapping("search/community")
    public ResponseEntity<List<Community>> searcCommunity(@RequestBody SearchDTO searchDTO, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return ResponseEntity.ok(searchService.searchCommunity(searchDTO));
    }

    @GetMapping("/community/members/remove/{communityUserRoleId}")
    public ResponseEntity<CommunitySearchResponse> deleteCommunityMember(@PathVariable Integer communityUserRoleId, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return  ResponseEntity.ok(new CommunitySearchResponse(HttpStatus.OK,communityService.deleteCommunityMember(communityUserRoleId)));
    }


    @GetMapping("/community/members/added/{communityUserId}")
    public ResponseEntity<UserInfo> getAddedUser(@PathVariable Integer communityUserId, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return ResponseEntity.ok(userInfoRepository.findById(communityUserId).orElse(null));
    }

    @DeleteMapping("/community/{id}")
    public ResponseEntity<DeleteCommunityDTO> deleteCommunity(@PathVariable Long id, HttpServletResponse response){
//        System.out.println("INSIDE THE DELETE MAPPING");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return ResponseEntity.ok(communityService.deleteCommunity(id));
    }

    @PostMapping("/search/people")
    public ResponseEntity<List<UserInfo>> searchUser(@RequestBody SearchDTO searchDTO, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return  ResponseEntity.ok(userInfoRepository.findByFirstNameContain(searchDTO.getUser()));
    }
}
