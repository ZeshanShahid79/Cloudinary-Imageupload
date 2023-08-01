package com.example.backend.imageprofile;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageProfileController {

    private final ImageProfileService imageProfileService;

    @GetMapping
    List<ImageProfile> getAllImages() {
        return imageProfileService.getAllImages();
    }
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
    ImageProfile addImageProfile(@RequestPart ImageProfileWithouthId imageProfileWithouthId, @RequestPart(required = false) MultipartFile image) throws IOException {
        return imageProfileService.addImage(imageProfileWithouthId,image);
    }
}
