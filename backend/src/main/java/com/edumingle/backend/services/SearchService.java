package com.edumingle.backend.services;

import com.edumingle.backend.dtos.SearchDTO;
import com.edumingle.backend.models.Community;

import java.util.List;


public interface SearchService {

    public List<Community> searchCommunity(SearchDTO searchDTO);
}
