package com.backend.backend.repositories

import com.backend.backend.domain.ProductPrice
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux

@Repository
interface ProductPriceRepository: ReactiveCrudRepository<ProductPrice, Int> {
    fun findByProductId(productId: Int): Flux<ProductPrice>
}