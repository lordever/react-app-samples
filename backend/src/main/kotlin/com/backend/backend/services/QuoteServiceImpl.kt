package com.backend.backend.services

import com.backend.backend.domain.QuoteItemPrice
import com.backend.backend.domain.Product
import com.backend.backend.domain.Quote
import com.backend.backend.mappers.PriceMapper
import com.backend.backend.mappers.QuoteItemMapper
import com.backend.backend.mappers.QuoteMapper
import com.backend.backend.model.QuoteDTO
import com.backend.backend.model.QuoteTotalPriceDTO
import com.backend.backend.repositories.PriceRepository
import com.backend.backend.repositories.ProductRepository
import com.backend.backend.repositories.QuoteItemRepository
import com.backend.backend.repositories.QuoteRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class QuoteServiceImpl(
    val quoteRepository: QuoteRepository,
    val quoteItemRepository: QuoteItemRepository,
    val productRepository: ProductRepository,
    val quoteMapper: QuoteMapper,
    val quoteItemMapper: QuoteItemMapper,
    val priceMapper: PriceMapper,
    val priceRepository: PriceRepository,
    val productService: ProductService
) : QuoteService {
    override fun findAll(): Flux<QuoteDTO> =
        quoteRepository
            .findAll()
            .flatMap(this::mapQuoteToDTO)

    override fun findById(quoteId: Int): Mono<QuoteDTO> =
        quoteRepository
            .findById(quoteId)
            .flatMap(this::mapQuoteToDTO)

    override fun createQuote(quoteDTO: QuoteDTO): Mono<QuoteDTO> {
        val quoteEntity = quoteMapper.toQuote(quoteDTO)
        val savedQuoteMono = quoteRepository.save(quoteEntity).cache()

        val savedQuoteItems = savedQuoteMono.flatMap { savedQuote ->
            Flux.fromIterable(quoteDTO.quoteItems)
                .flatMap { quoteItem ->
                    val updatedQuoteItem = quoteItemMapper.toQuoteItemByQuoteId(quoteItem, quoteId = savedQuote.id!!)
                    quoteItemRepository.save(updatedQuoteItem)
                }.collectList()
        }

        val savedPrices = savedQuoteItems.flatMap { savedQuoteItemsList ->
            Flux.fromIterable(quoteDTO.quoteItems.zip(savedQuoteItemsList))
                .flatMap { (quoteItem, savedQuoteItem) ->
                    val prices = quoteItem.prices.map { price ->
                        priceMapper.toPriceByQuoteItemId(price, savedQuoteItem.id!!)
                    }
                    priceRepository.saveAll(prices).collectList()
                }.collectList()
        }

        return savedPrices.flatMap {
            savedQuoteMono.flatMap { savedQuote ->
                mapQuoteToDTO(savedQuote)
            }
        }
    }

    fun mapQuoteToDTO(quote: Quote): Mono<QuoteDTO> {
        val quoteId = quote.id

        val monoQuoteDTO = if (quoteId != null) {
            quoteItemRepository.findByQuoteId(quoteId)
                .flatMap { quoteItem ->
                    val quoteItemId = quoteItem.id
                    val productId = quoteItem.productId
                    if (quoteItemId != null && productId != null) {
                        Mono.zip(getPriceList(quoteItemId), findProductById(productId))
                            .flatMap { tuple ->
                                val prices: List<QuoteItemPrice> = tuple.t1
                                val product: Product = tuple.t2

                                productService.mapProductToProductDTO(product)
                                    .map { productDTO ->
                                        quoteItemMapper.toDto(quoteItem, prices, productDTO)
                                    }
                            }
                    } else {
                        Flux.empty()
                    }
                }
                .collectList()
                .flatMap { quoteItems ->
                    val quoteDTO = quoteMapper.toDtoWithQuoteItems(quote, quoteItems)
                    Mono.just(buildQuoteTotalPrice(quoteDTO))
                }
        } else {
            Mono.empty()
        }

        return monoQuoteDTO
    }

    private fun getPriceList(quoteItemId: Int): Mono<List<QuoteItemPrice>> =
        priceRepository.findByQuoteItemId(quoteItemId).collectList()

    private fun findProductById(productId: Int): Mono<Product> =
        productRepository.findById(productId)

    private fun buildQuoteTotalPrice(quote: QuoteDTO): QuoteDTO {
        var totalRecurrent = 0
        var totalOneTime = 0
        var totalUpfront = 0

        quote.quoteItems.forEach { quoteItem ->
            quoteItem.prices.forEach { price ->
                totalRecurrent += price.recurrent
                totalOneTime += price.oneTime
                totalUpfront += price.upfront
            }
        }

        val totalPrice = QuoteTotalPriceDTO(
            recurrent = totalRecurrent,
            oneTime = totalOneTime,
            upfront = totalUpfront
        )

        quote.totalPrice = totalPrice

        return quote
    }
}