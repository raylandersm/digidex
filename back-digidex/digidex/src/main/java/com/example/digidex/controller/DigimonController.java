package com.example.digidex.controller;

import com.example.digidex.dto.CreateDigimonRequest;
import com.example.digidex.dto.DigimonDetailResponse;
import com.example.digidex.dto.DigimonListResponse;
import com.example.digidex.dto.DigimonOptionResponse;
import com.example.digidex.entity.Digimon;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.example.digidex.service.DigimonService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/digimons")
@RequiredArgsConstructor
public class DigimonController {
    @GetMapping("/teste")
    public String teste() {
        return "API OK";
    }

    private final DigimonService service;

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public UUID create(
            @RequestPart("data")
            CreateDigimonRequest request,

            @RequestPart("image")
            MultipartFile image
    ) {
        System.out.println("CONTROLLER STATS = " + request.stats());
        System.out.println("CONTROLLER MAX STATS = " + request.maxStats());

        CreateDigimonRequest dto =
                new CreateDigimonRequest(
                        request.name(),
                        request.description(),
                        request.level(),
                        request.digimonAttribute(),
                        request.type(),
                        request.evolutionCondition(),
                        request.previousEvolutionIds(),
                        request.moves(),
                        request.stats(),
                        request.maxStats(),
                        image
                );

        return service.create(dto);
    }

    @GetMapping
    public List<DigimonOptionResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public DigimonDetailResponse findById(
            @PathVariable UUID id
    ) {

        return service.findDetailById(id);
    }

    @GetMapping("/buscar-listaDigimon")
    public List<DigimonListResponse> findAllForHome() {

        return service.findAllForHome();
    }
}