package com.backend.backend.services

import com.backend.backend.domain.QuoteItem
import com.backend.backend.model.ProductDTO
import reactor.core.publisher.Mono

interface QuoteItemService {
    fun addOne(quoteId: Int, product: ProductDTO): Mono<QuoteItem>
}