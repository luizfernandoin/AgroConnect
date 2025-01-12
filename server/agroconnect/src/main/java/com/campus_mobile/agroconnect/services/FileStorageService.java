package com.campus_mobile.agroconnect.services;

import com.campus_mobile.agroconnect.config.FileStorageProperties;
import com.campus_mobile.agroconnect.model.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;
    private final Map<String, String> defaultFiles = Map.of(
            "USER", "uploads/user/profile.png"
    );


    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Path.of(fileStorageProperties.getUploadDir())
                .toAbsolutePath()
                .normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, EntityType entityType) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        Path entityDirectory = this.fileStorageLocation.resolve(entityType.name().toLowerCase());
        try {
            Files.createDirectories(entityDirectory);

            Path targetLocation = entityDirectory.resolve(fileName);

            file.transferTo(targetLocation);

            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/files/")
                    .path(entityType.name().toLowerCase() + "/")
                    .path(fileName)
                    .toUriString();
        } catch (Exception ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String getAbsolutePath(String fileName, EntityType entityType) {
        if (fileName == null || fileName.isEmpty()) {
            throw new IllegalArgumentException("File name cannot be null or empty");
        }

        Path entityDirectory = this.fileStorageLocation.resolve(entityType.name().toLowerCase());
        Path filePath = entityDirectory.resolve(fileName).toAbsolutePath();

        return filePath.toString();
    }

    public String getDefaultFileUri(EntityType entityType) {
        String defaultFileName = defaultFiles.get(entityType.name());
        Path defaultFilePath = this.fileStorageLocation.resolve(defaultFileName);
        System.out.println(defaultFilePath.toAbsolutePath().toString());

        return defaultFilePath.toAbsolutePath().toString();
    }
}
