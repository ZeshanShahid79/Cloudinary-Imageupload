package com.example.backend.imageprofile;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageProfileService {

    private final ImageProfileRepository imageProfileRepository;
    private final UuidService uuidService;
    private final CloudinaryService cloudinaryService;
    public List<ImageProfile> getAllImages() {
        return imageProfileRepository.findAll();
    }

    public ImageProfile addImage(ImageProfileWithoutId imageProfileWithoutId, MultipartFile image) throws IOException {
        String id = uuidService.getRandomId();
        String url = null;

        if (image!= null) {
            url = cloudinaryService.uploadImage(image);
        }
        ImageProfile imageToSave = new ImageProfile(id, imageProfileWithoutId.name(),url);
        return imageProfileRepository.save(imageToSave);
    }
}
