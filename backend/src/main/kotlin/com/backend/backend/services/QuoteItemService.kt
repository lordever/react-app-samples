package com.backend.backend.services

import com.backend.backend.domain.QuoteItem
import com.backend.backend.model.ProductDTO
import com.backend.backend.model.QuoteItemDTO
import reactor.core.publisher.Mono

interface QuoteItemService {
    fun addOne(quoteId: Int, product: ProductDTO): Mono<QuoteItem>
    fun addAll(quoteId: Int, quoteItems: List<QuoteItemDTO>): Mono<List<QuoteItem>>
}