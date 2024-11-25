package com.backend.backend.controller

import com.backend.backend.domain.Characteristic
import com.backend.backend.services.CharacteristicService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
class CharacteristicController(
    var characteristicService: CharacteristicService
) {
    companion object {
        const val CHARACTERISTICS_PATH = "/api/v1/characteristics"
    }

    @GetMapping(CHARACTERISTICS_PATH)
    fun listCharacteristic(): Flux<Characteristic> {
        return characteristicService.findAllEntities()
    }
}