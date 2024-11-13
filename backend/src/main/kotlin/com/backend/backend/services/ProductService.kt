package com.backend.backend.services

import com.backend.backend.domain.Product
import com.backend.backend.model.ProductDTO
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface ProductService {
    fun listProducts(): Flux<ProductDTO>
    fun getProductById(id: Int): Mono<ProductDTO>
    fun mapProductToProductDTO(product: Product): Mono<ProductDTO>
}