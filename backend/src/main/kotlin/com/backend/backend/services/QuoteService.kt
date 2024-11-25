package com.backend.backend.services

import com.backend.backend.model.QuoteDTO
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface QuoteService {
    fun findAll(): Flux<QuoteDTO>
    fun findById(quoteId: Int): Mono<QuoteDTO>
    fun createQuote(quoteDTO: QuoteDTO): Mono<QuoteDTO>
    fun delete(quoteId: Int): Mono<Void>
}