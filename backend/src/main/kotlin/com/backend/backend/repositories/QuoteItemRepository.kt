package com.backend.backend.repositories

import com.backend.backend.domain.QuoteItem
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux

interface QuoteItemRepository : ReactiveCrudRepository<QuoteItem, Int> {
    fun findByQuoteId(quoteId: Int): Flux<QuoteItem>
}