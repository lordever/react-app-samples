package com.backend.backend.controller

import com.backend.backend.model.ProductDTO
import com.backend.backend.services.ProductService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class ProductsController(var productService: ProductService) {
    companion object {
        const val PRODUCTS_PATH = "/api/v1/products"
        const val PRODUCTS_PATH_ID = "$PRODUCTS_PATH/{productId}"
    }

    @GetMapping(PRODUCTS_PATH)
    fun listProducts(): Flux<ProductDTO> {
        return productService.listProducts()
    }

    @GetMapping(PRODUCTS_PATH_ID)
    fun getProductById(@PathVariable productId: Int): Mono<ProductDTO> {
        return productService.getProductById(productId)
    }
}