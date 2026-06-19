package com.example.digidex.service;

import com.example.digidex.entity.Digimon;
import com.example.digidex.repository.DigimonRepository;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public class StorageService {

    private final MinioClient minioClient;
    private final DigimonRepository digimonRepository;

    @Value("${minio.bucket}")
    private String bucket;

    public StorageService(MinioClient minioClient, DigimonRepository digimonRepository) {
        this.minioClient = minioClient;
        this.digimonRepository = digimonRepository;
    }

    public void delete(String nomeArquivo) {

        try {

            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(nomeArquivo)
                            .build());

        } catch (Exception e) {

            throw new RuntimeException(
                    "Erro ao remover imagem",
                    e);
        }
    }
    public String upload(MultipartFile arquivo) {
        System.out.println("Bucket: " + bucket);
        System.out.println("Arquivo: " + arquivo.getOriginalFilename());

        try {

            String nomeArquivo =
                    UUID.randomUUID() + "-" + arquivo.getOriginalFilename();

            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(nomeArquivo)
                            .stream(
                                    arquivo.getInputStream(),
                                    arquivo.getSize(),
                                    -1
                            )
                            .contentType(arquivo.getContentType())
                            .build()
            );

            return nomeArquivo;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar arquivo para o MinIO", e);
        }
    }


}