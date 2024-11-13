package com.backend.backend.services

import com.backend.backend.domain.Product
import com.backend.backend.mappers.ProductMapper
import com.backend.backend.model.ProductDTO
import com.backend.backend.repositories.CharacteristicRepository
import com.backend.backend.repositories.ProductPriceRepository
import com.backend.backend.repositories.ProductRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ProductServiceImpl(
    var productRepository: ProductRepository,
    var characteristicRepository: CharacteristicRepository,
    var productPriceRepository: ProductPriceRepository,
    var productMapper: ProductMapper,
) : ProductService {
    override fun listProducts(): Flux<ProductDTO> = productRepository.findAll().flatMap(this::mapProductToProductDTO)

    override fun getProductById(id: Int): Mono<ProductDTO> =
        productRepository.findById(id).flatMap(this::mapProductToProductDTO)


    override fun mapProductToProductDTO(product: Product): Mono<ProductDTO> {
        val productId = product.id
        return if (productId != null) {
            characteristicRepository.findCharacteristicsByProductId(productId).collectList()
                .flatMap { characteristics ->
                    productPriceRepository.findByProductId(productId).collectList()
                        .map { productPrices -> productMapper.toDto(product, characteristics, productPrices) }
                }
        } else {
            Mono.empty()
        }
    }
}