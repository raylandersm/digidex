package com.example.digidex.service;

import com.example.digidex.dto.*;
import com.example.digidex.entity.*;
import com.example.digidex.repository.DigimonRepository;
import com.example.digidex.repository.MoveRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class DigimonService {

    private final DigimonRepository digimonRepository;
    private final MoveRepository moveRepository;
    private final StorageService storageService;

    public UUID create(CreateDigimonRequest request) {

        Digimon digimon = new Digimon();
        String imageUrl = storageService.upload(request.image());
        digimon.setName(request.name());
        digimon.setDescription(request.description());
        digimon.setLevel(request.level());
        digimon.setDigimonAttribute(request.digimonAttribute());
        digimon.setType(request.type());

        digimon.setImageUrl(imageUrl);
        digimon.setEvolutionCondition(request.evolutionCondition());

        if (request.previousEvolutionIds() != null) {

            List<Digimon> previous = digimonRepository
                    .findAllById(request.previousEvolutionIds());

            digimon.setPreviousEvolutions(previous);
        }


        DigimonStats baseStats = buildStats(request.stats());
        DigimonStats maxStats = buildStats(request.maxStats());

        digimon.setStats(baseStats);
        digimon.setMaxStats(maxStats);



        Digimon savedDigimon = digimonRepository.save(digimon);
        List<DigimonMove> digimonMoves = new ArrayList<>();

        if (request.moves() != null) {

            for (CreateDigimonMoveRequest moveRequest : request.moves()) {

                Move move;

                if (moveRequest.moveId() != null) {

                    move = moveRepository
                            .findById(moveRequest.moveId())
                            .orElseThrow();

                } else {

                    move = moveRepository
                            .findByNameIgnoreCase(
                                    moveRequest.moveName()
                            )
                            .orElse(null);

                    if (move == null) {

                        move = new Move();

                        move.setName(
                                moveRequest.moveName()
                        );

                        move.setDescription(
                                moveRequest.description()
                        );

                        move.setAccuracy(
                                moveRequest.accuracy()
                        );

                        move.setPower(
                                moveRequest.power()
                        );

                        move.setSpCost(
                                moveRequest.spCost()
                        );

                        move.setAttribute(
                                moveRequest.attribute()
                        );

                        move = moveRepository.save(move);
                    }
                }
                DigimonMove digimonMove =
                        new DigimonMove();

                digimonMove.setDigimon(
                        savedDigimon
                );

                digimonMove.setMove(
                        move
                );

                digimonMove.setType(
                        moveRequest.type()
                );

                digimonMove.setLevel(
                        moveRequest.level()
                );

                digimonMoves.add(
                        digimonMove
                );
            }
        }

        savedDigimon.setDigimonMoves(
                digimonMoves
        );

        digimonRepository.save(
                savedDigimon
        );
        return savedDigimon.getId();

    }

    private DigimonStats buildStats(
            DigimonStatsRequest request
    ) {

        if (request == null) {
            return null;
        }

        DigimonStats stats = new DigimonStats();

        stats.setHp(request.hp());
        stats.setSp(request.sp());
        stats.setAtk(request.atk());
        stats.setDef(request.def());
        stats.setIntel(request.intel());
        stats.setSpi(request.spi());
        stats.setSpd(request.spd());

        return stats;
    }


    public Digimon findById(UUID id) {
        return digimonRepository.findById(id)
                .orElseThrow();
    }

    public List<DigimonOptionResponse> findAll() {

        return digimonRepository
                .findAll()
                .stream()
                .map(digimon ->
                        new DigimonOptionResponse(
                                digimon.getId(),
                                digimon.getName()
                        )
                )
                .toList();
    }

    public List<DigimonListResponse>
    findAllForHome() {

        return digimonRepository
                .findAll()
                .stream()
                .map(digimon ->
                        new DigimonListResponse(

                                digimon.getId(),

                                digimon.getName(),

                                digimon.getDescription(),

                                digimon.getLevel(),

                                digimon.getDigimonAttribute(),

                                digimon.getType(),

                                digimon.getImageUrl()
                        )
                )
                .toList();
    }

    public DigimonDetailResponse findDetailById(
            UUID id
    ) {

        Digimon digimon =
                digimonRepository
                        .findById(id)
                        .orElseThrow();

        List<EvolutionResponse> previousEvolutions =
                digimon.getPreviousEvolutions()
                        .stream()
                        .map(this::toEvolutionResponse)
                        .toList();

        List<EvolutionResponse> nextEvolutions =
                digimonRepository
                        .findByPreviousEvolutionsContaining(
                                digimon
                        )
                        .stream()
                        .map(this::toEvolutionResponse)
                        .toList();

        List<DigimonMoveResponse> moves =
                digimon.getDigimonMoves()
                        .stream()
                        .map(digimonMove ->
                                new DigimonMoveResponse(
                                        digimonMove.getMove().getId(),
                                        digimonMove.getMove().getName(),
                                        digimonMove.getMove().getDescription(),
                                        digimonMove.getMove().getAccuracy(),
                                        digimonMove.getMove().getPower(),
                                        digimonMove.getMove().getSpCost(),
                                        digimonMove.getMove().getAttribute().name(),
                                        digimonMove.getType().name(),
                                        digimonMove.getLevel()
                                )
                        )
                        .toList();

        return new DigimonDetailResponse(

                digimon.getId(),

                digimon.getName(),

                digimon.getDescription(),

                digimon.getLevel(),

                digimon.getDigimonAttribute(),

                digimon.getType(),

                digimon.getImageUrl(),

                digimon.getEvolutionCondition(),

                toStatsResponse(
                        digimon.getStats()
                ),

                toStatsResponse(
                        digimon.getMaxStats()
                ),

                moves,

                previousEvolutions,

                nextEvolutions
        );
    }

    private EvolutionResponse toEvolutionResponse(
            Digimon digimon
    ) {

        return new EvolutionResponse(

                digimon.getId(),

                digimon.getName(),

                digimon.getImageUrl(),

                digimon.getEvolutionCondition()
        );
    }

    private DigimonStatsResponse toStatsResponse(
            DigimonStats stats
    ) {

        if (stats == null) {
            return null;
        }

        return new DigimonStatsResponse(

                stats.getHp(),

                stats.getSp(),

                stats.getAtk(),

                stats.getDef(),

                stats.getIntel(),

                stats.getSpi(),

                stats.getSpd()
        );
    }
}