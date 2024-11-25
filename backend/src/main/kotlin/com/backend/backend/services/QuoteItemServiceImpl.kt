package com.backend.backend.services

import com.backend.backend.domain.QuoteItem
import com.backend.backend.domain.QuoteItemCharacteristic
import com.backend.backend.domain.QuoteItemPrice
import com.backend.backend.domain.QuoteItemType
import com.backend.backend.mappers.PriceMapper
import com.backend.backend.mappers.QuoteItemCharacteristicMapper
import com.backend.backend.mappers.QuoteItemMapper
import com.backend.backend.model.CharacteristicDTO
import com.backend.backend.model.ProductDTO
import com.backend.backend.model.ProductPriceDTO
import com.backend.backend.model.QuoteItemDTO
import com.backend.backend.repositories.PriceRepository
import com.backend.backend.repositories.QuoteItemCharacteristicRepository
import com.backend.backend.repositories.QuoteItemRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class QuoteItemServiceImpl(
    val repository: QuoteItemRepository,
    val characteristicRepository: QuoteItemCharacteristicRepository,
    val priceRepository: PriceRepository,
    val quoteItemMapper: QuoteItemMapper,
    val quoteItemCharacteristicMapper: QuoteItemCharacteristicMapper,
    val priceMapper: PriceMapper,
) : QuoteItemService {
    override fun addOne(quoteId: Int, product: ProductDTO): Mono<QuoteItem> {
        val quoteItem = QuoteItem(
            quoteId = quoteId,
            type = QuoteItemType.ADD,
            name = product.name,
            productId = product.id
        )

        return repository.save(quoteItem)
            .flatMap { newQuoteItem ->
                val characteristics =
                    transformProductCharToQuoteItemChar(quoteItem.id!!, product.characteristics)

                characteristicRepository.saveAll(characteristics)
                    .then()
                    .thenReturn(newQuoteItem)
            }.flatMap { newQuoteItem ->
                val prices = transformProductPriceToQuoteItemPrice(newQuoteItem.id!!, product.prices)
                priceRepository.saveAll(prices)
                    .then()
                    .thenReturn(newQuoteItem)
            }
    }

    override fun addAll(quoteId: Int, quoteItems: List<QuoteItemDTO>): Mono<List<QuoteItem>> {
        return Flux.fromIterable(quoteItems)
            .flatMap { quoteItem: QuoteItemDTO ->
                val updatedQuoteItem = quoteItemMapper.toQuoteItemByQuoteId(quoteItem, quoteId = quoteId)
                repository.save(updatedQuoteItem)
                    .flatMap { savedQuoteItem: QuoteItem ->
                        val characteristics = quoteItem.characteristic.map { characteristic ->
                            quoteItemCharacteristicMapper.toCharacteristicByQuoteItemId(
                                characteristic,
                                savedQuoteItem.id!!
                            )
                        }
                        val savedCharacteristics =
                            characteristicRepository.saveAll(characteristics).collectList()

                        val prices = quoteItem.prices.map { price ->
                            priceMapper.toPriceByQuoteItemId(price, savedQuoteItem.id!!)
                        }
                        val savedPrices = priceRepository.saveAll(prices).collectList()

                        Mono.zip(savedCharacteristics, savedPrices) { _, _ -> savedQuoteItem }
                    }
            }
            .collectList()
    }

    override fun delete(quoteItemId: Int): Mono<Void> =
        characteristicRepository
            .deleteByQuoteItemId(quoteItemId)
            .then(priceRepository.deleteByQuoteItemId(quoteItemId))
            .then(repository.deleteById(quoteItemId))

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