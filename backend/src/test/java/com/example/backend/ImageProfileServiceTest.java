package com.example.backend;

import com.example.backend.imageprofile.*;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ImageProfileServiceTest {

    ImageProfileRepository imageProfileRepository = mock(ImageProfileRepository.class);
    CloudinaryService cloudinaryService = mock(CloudinaryService.class);
    UuidService uuidService = mock(UuidService.class);
    ImageProfileService imageProfileService = new ImageProfileService(imageProfileRepository, uuidService, cloudinaryService);

    @Test
    void getAllProfiles() {
        //GIVEN
        ImageProfile imageProfile = new ImageProfile("1", "docker-image", "test-url.de");
        when(imageProfileRepository.findAll())
                .thenReturn(Collections.singletonList(imageProfile));
        //WHEN
        List<ImageProfile> actual = imageProfileService.getAllImages();

        //THEN
        assertThat(actual)
                .containsOnly(imageProfile);
    }

    @Test
    void postImageProfile() throws IOException {
        //GIVEN
        ImageProfileWithoutId imageProfileWithoutId = new ImageProfileWithoutId("docker-image");
        ImageProfile expected = new ImageProfile("1", "docker-image", "test-url.de");
        MockMultipartFile file = new MockMultipartFile("docker-image", "irgendwas".getBytes());

        when(cloudinaryService.uploadImage(file)).thenReturn("test-url.de");
        when(imageProfileRepository.save(expected)).thenReturn(expected);
        when(uuidService.getRandomId()).thenReturn("1");


        //WHEN
        ImageProfile actual = imageProfileService.addImage(imageProfileWithoutId, file);

        //THEN
        verify(cloudinaryService).uploadImage(file);
        verify(imageProfileRepository).save(expected);
        verify(uuidService).getRandomId();
        assertEquals(expected, actual);
    }
}
