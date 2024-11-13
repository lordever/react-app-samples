package com.backend.backend.services

import com.backend.backend.domain.Characteristic
import reactor.core.publisher.Flux

interface CharacteristicService {
    fun findAllEntities(): Flux<Characteristic>
}