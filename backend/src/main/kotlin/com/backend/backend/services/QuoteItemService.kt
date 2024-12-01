package com.backend.backend.services

import com.backend.backend.domain.QuoteItem
import com.backend.backend.model.ProductDTO
import com.backend.backend.model.QuoteItemCharacteristicDTO
import com.backend.backend.model.QuoteItemDTO
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface QuoteItemService {
    fun addOne(quoteId: Int, product: ProductDTO): Mono<QuoteItem>
    fun addAll(quoteId: Int, quoteItems: List<QuoteItemDTO>): Mono<List<QuoteItem>>
    fun updateCharacteristics(
        quoteItemId: Int,
        characteristics: List<QuoteItemCharacteristicDTO>
    ): Flux<QuoteItemCharacteristicDTO>

    fun delete(quoteItemId: Int): Mono<Void>
}