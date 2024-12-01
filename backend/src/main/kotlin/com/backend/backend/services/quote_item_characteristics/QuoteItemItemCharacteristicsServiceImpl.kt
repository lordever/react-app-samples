package com.backend.backend.services.quote_item_characteristics

import com.backend.backend.domain.ProductType
import com.backend.backend.model.CharacteristicDTO
import com.backend.backend.model.QuoteItemCharacteristicDTO
import com.backend.backend.repositories.ProductRepository
import com.backend.backend.repositories.QuoteItemCharacteristicRepository
import com.backend.backend.repositories.QuoteItemRepository
import com.backend.backend.services.quote_item_characteristics.update.UpdateCharacteristicStrategy
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class QuoteItemItemCharacteristicsServiceImpl(
    val quoteItemRepository: QuoteItemRepository,
    val productRepository: ProductRepository,
    val quoteItemCharacteristicRepository: QuoteItemCharacteristicRepository
) : QuoteItemCharacteristicsService {

    companion object {
        private val updateCharacteristicStrategyMap: MutableMap<ProductType, UpdateCharacteristicStrategy> =
            mutableMapOf()

        fun addUpdateCharacteristicStrategy(productType: ProductType, strategy: UpdateCharacteristicStrategy) {
            updateCharacteristicStrategyMap[productType] = strategy;
        }
    }

    override fun updateCharacteristicsByQuoteItemId(
        quoteItemId: Int,
        characteristics: List<QuoteItemCharacteristicDTO>
    ): Flux<QuoteItemCharacteristicDTO> {
        return quoteItemRepository.findById(quoteItemId)
            .switchIfEmpty(Mono.error(IllegalArgumentException("Quote item with id $quoteItemId not found")))
            .flatMap { quoteItem ->
                val productId = quoteItem.productId
                    ?: throw IllegalArgumentException("Product ID for quote item $quoteItemId is null")
                productRepository.findById(productId)
                    .switchIfEmpty(Mono.error(IllegalArgumentException("Product with id $productId not found")))
                    .map { product ->
                        updateCharacteristicStrategyMap[product.type]
                            ?: throw IllegalArgumentException("No strategy found for product type: ${product.type}")
                    }
            }
            .flatMapMany { updateCharacteristicStrategy ->
                quoteItemCharacteristicRepository.findCharacteristicsByQuoteItemId(quoteItemId)
                    .collectList()
                    .flatMapMany { existingCharacteristics ->
                        val updatedCharacteristics = characteristics.map { incoming ->
                            val existing = existingCharacteristics.find { it.id == incoming.id }
                            if (existing != null) {
                                incoming
                            } else {
                                throw IllegalArgumentException("Characteristic with id ${incoming.id} not found")
                            }
                        }
                        updateCharacteristicStrategy.updateAll(updatedCharacteristics)
                    }
            }
    }
}