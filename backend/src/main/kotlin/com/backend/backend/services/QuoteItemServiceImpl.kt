package com.backend.backend.services

import com.backend.backend.domain.QuoteItem
import com.backend.backend.domain.QuoteItemCharacteristic
import com.backend.backend.domain.QuoteItemPrice
import com.backend.backend.domain.QuoteItemType
import com.backend.backend.model.CharacteristicDTO
import com.backend.backend.model.ProductDTO
import com.backend.backend.model.ProductPriceDTO
import com.backend.backend.repositories.PriceRepository
import com.backend.backend.repositories.QuoteItemCharacteristicRepository
import com.backend.backend.repositories.QuoteItemRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono

@Service
class QuoteItemServiceImpl(
    val quoteItemRepository: QuoteItemRepository,
    val quoteItemCharacteristicRepository: QuoteItemCharacteristicRepository,
    val quoteItemPriceRepository: PriceRepository,
) : QuoteItemService {
    override fun addOne(quoteId: Int, product: ProductDTO): Mono<QuoteItem> {
        val quoteItem = QuoteItem(
            quoteId = quoteId,
            type = QuoteItemType.ADD,
            name = product.name,
            productId = product.id
        )

        return quoteItemRepository.save(quoteItem)
            .flatMap { newQuoteItem ->
                val characteristics =
                    transformProductCharToQuoteItemChar(quoteItem.id!!, product.characteristics)

                quoteItemCharacteristicRepository.saveAll(characteristics)
                    .then()
                    .thenReturn(newQuoteItem)
            }.flatMap { newQuoteItem ->
                val prices = transformProductPriceToQuoteItemPrice(newQuoteItem.id!!, product.prices)
                quoteItemPriceRepository.saveAll(prices)
                    .then()
                    .thenReturn(newQuoteItem)
            }
    }

    private fun transformProductCharToQuoteItemChar(
        quoteItemId: Int,
        productCharacteristics: List<CharacteristicDTO>
    ): List<QuoteItemCharacteristic> {
        return productCharacteristics.map { productChar ->
            QuoteItemCharacteristic(
                quoteItemId = quoteItemId,
                name = productChar.name,
                valueText = productChar.value
            )
        }
    }

    private fun transformProductPriceToQuoteItemPrice(
        quoteItemId: Int,
        productPrices: List<ProductPriceDTO>
    ): List<QuoteItemPrice> {
        return productPrices.map { productPrice ->
            QuoteItemPrice(
                quoteItemId = quoteItemId,
                upfront = productPrice.upfront,
                oneTime = productPrice.oneTime,
                recurrent = productPrice.recurrent,
                commitment = 0
            )
        }
    }
}