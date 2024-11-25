package com.backend.backend.repositories

import com.backend.backend.domain.QuoteItemPrice
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface PriceRepository : ReactiveCrudRepository<QuoteItemPrice, Int> {
    fun findByQuoteItemId(quoteItemId: Int): Flux<QuoteItemPrice>
    fun deleteByQuoteItemId(quoteItemId: Int): Mono<Void>
}