package com.backend.backend.repositories

import com.backend.backend.domain.Characteristic
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux

interface CharacteristicRepository : ReactiveCrudRepository<Characteristic, Int> {
    fun findCharacteristicsByProductId(productId: Int): Flux<Characteristic>
}