package com.backend.backend.controller

import com.backend.backend.model.ProductDTO
import com.backend.backend.services.ProductService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class ProductsController(val productService: ProductService) {
    companion object {
        const val PRODUCTS_PATH = "/api/v1/products"
        const val PRODUCTS_PATH_ID = "$PRODUCTS_PATH/{productId}"
    }

    @GetMapping(PRODUCTS_PATH)
    fun listProducts(): Flux<ProductDTO> =
        productService
            .listProducts()
            .switchIfEmpty(Flux.error(ResponseStatusException(HttpStatus.NOT_FOUND)))

    @GetMapping(PRODUCTS_PATH_ID)
    fun getProductById(@PathVariable productId: Int): Mono<ProductDTO> =
        productService
            .getProductById(productId)
            .switchIfEmpty(Mono.error(ResponseStatusException(HttpStatus.NOT_FOUND)))
}