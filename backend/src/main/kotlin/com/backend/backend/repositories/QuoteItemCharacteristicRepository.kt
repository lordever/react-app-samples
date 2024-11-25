package com.backend.backend.repositories

import com.backend.backend.domain.QuoteItemCharacteristic
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface QuoteItemCharacteristicRepository : ReactiveCrudRepository<QuoteItemCharacteristic, Int> {
    fun findCharacteristicsByQuoteItemId(quoteItemId: Int): Flux<QuoteItemCharacteristic>
    fun deleteByQuoteItemId(quoteItemId: Int): Mono<Void>
}