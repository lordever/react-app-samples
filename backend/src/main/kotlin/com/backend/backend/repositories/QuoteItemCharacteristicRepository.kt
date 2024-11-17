package com.backend.backend.repositories

import com.backend.backend.domain.QuoteItemCharacteristic
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux

interface QuoteItemCharacteristicRepository : ReactiveCrudRepository<QuoteItemCharacteristic, Int> {
    fun findCharacteristicsByQuoteItemId(quoteItemId: Int): Flux<QuoteItemCharacteristic>
}