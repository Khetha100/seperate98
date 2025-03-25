package com.edumingle.backend.services;

import com.edumingle.backend.dtos.SearchDTO;
import com.edumingle.backend.models.Community;
import com.edumingle.backend.repositories.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService{
    @Autowired
    CommunityRepository communityRepository;


    public List<Community> searchCommunity(SearchDTO searchDTO){

        return communityRepository.findByNameContaining(searchDTO.getCommunityTitle());
    }
}
