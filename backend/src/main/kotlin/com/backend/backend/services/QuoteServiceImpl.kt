package com.backend.backend.services

import com.backend.backend.domain.*
import com.backend.backend.mappers.*
import com.backend.backend.model.ProductDTO
import com.backend.backend.model.QuoteDTO
import com.backend.backend.model.QuoteTotalPriceDTO
import com.backend.backend.repositories.*
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
    val quoteItemCharacteristicMapper: QuoteItemCharacteristicMapper,
    val quoteItemCharacteristicRepository: QuoteItemCharacteristicRepository,
    val productService: ProductService,
    val quoteItemService: QuoteItemService
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
        val savedQuoteMono: Mono<Quote> = quoteRepository.save(quoteEntity).cache()

        val savedQuoteItems = savedQuoteMono.flatMap { savedQuote ->
            Flux.fromIterable(quoteDTO.quoteItems)
                .flatMap { quoteItem ->
                    val updatedQuoteItem = quoteItemMapper.toQuoteItemByQuoteId(quoteItem, quoteId = savedQuote.id!!)
                    quoteItemRepository.save(updatedQuoteItem)
                        .flatMap { savedQuoteItem ->
                            val characteristics = quoteItem.characteristic.map { characteristic ->
                                quoteItemCharacteristicMapper.toCharacteristicByQuoteItemId(
                                    characteristic,
                                    savedQuoteItem.id!!
                                )
                            }
                            val savedCharacteristics =
                                quoteItemCharacteristicRepository.saveAll(characteristics).collectList()

                            val prices = quoteItem.prices.map { price ->
                                priceMapper.toPriceByQuoteItemId(price, savedQuoteItem.id!!)
                            }
                            val savedPrices = priceRepository.saveAll(prices).collectList()

                            Mono.zip(savedCharacteristics, savedPrices) { _, _ -> savedQuoteItem }
                        }
                }
                .collectList()
        }

        return savedQuoteItems.flatMap {
            savedQuoteMono.flatMap { savedQuote ->
                mapQuoteToDTO(savedQuote)
            }
        }
    }

    override fun addQuoteItem(quoteId: Int, productDTO: ProductDTO): Mono<QuoteDTO> {
        return quoteItemService.addOne(quoteId, productDTO).flatMap {
            findById(quoteId)
        }
    }

    private fun mapQuoteToDTO(quote: Quote): Mono<QuoteDTO> {
        val quoteId = quote.id

        val monoQuoteDTO = if (quoteId != null) {
            quoteItemRepository.findByQuoteId(quoteId)
                .flatMap { quoteItem ->
                    val quoteItemId = quoteItem.id
                    val productId = quoteItem.productId
                    if (quoteItemId != null && productId != null) {
                        Mono.zip(
                            getPriceList(quoteItemId),
                            findProductById(productId),
                            getCharacteristicList(quoteItemId)
                        )
                            .flatMap { tuple ->
                                val prices: List<QuoteItemPrice> = tuple.t1
                                val product: Product = tuple.t2
                                val characteristic: List<QuoteItemCharacteristic> = tuple.t3

                                productService.mapProductToProductDTO(product)
                                    .map { productDTO ->
                                        quoteItemMapper.toDto(quoteItem, prices, characteristic, productDTO)
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

    private fun getCharacteristicList(quoteItemId: Int): Mono<List<QuoteItemCharacteristic>> =
        quoteItemCharacteristicRepository.findCharacteristicsByQuoteItemId(quoteItemId).collectList()

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