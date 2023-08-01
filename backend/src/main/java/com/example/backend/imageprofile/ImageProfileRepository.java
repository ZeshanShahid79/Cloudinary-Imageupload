package com.example.backend.imageprofile;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProfileRepository extends MongoRepository<ImageProfile,String> {
}
