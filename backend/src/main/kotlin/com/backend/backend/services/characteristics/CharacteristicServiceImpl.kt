package com.backend.backend.services.characteristics

import com.backend.backend.domain.Characteristic
import com.backend.backend.repositories.CharacteristicRepository
import com.backend.backend.services.CharacteristicService
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

@Service
class CharacteristicServiceImpl(
    var characteristicRepository: CharacteristicRepository
) : CharacteristicService {

    override fun findAllEntities(): Flux<Characteristic> {
        return characteristicRepository.findAll()
    }
}