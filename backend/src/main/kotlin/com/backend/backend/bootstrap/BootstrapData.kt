package com.backend.backend.bootstrap

import com.backend.backend.domain.*
import com.backend.backend.repositories.*
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class BootstrapData(
    val productRepository: ProductRepository,
    val quoteRepository: QuoteRepository,
    val characteristicRepository: CharacteristicRepository,
    val quoteItemCharacteristicRepository: QuoteItemCharacteristicRepository,
    val quoteItemRepository: QuoteItemRepository,
    val priceRepository: PriceRepository,
    val productPriceRepository: ProductPriceRepository
) : CommandLineRunner {
    override fun run(vararg args: String?) {
        loadProducts()
        loadQuotes()
    }

    fun loadProducts() {
        productRepository.count().subscribe { count ->
            if (count == 0L) {
                val products = listOf(
                    Product(name = "Mobile line"),
                    Product(name = "Internet"),
                    Product(name = "Iphone 14")
                )

                val productsSave = Flux.fromIterable(products)
                    .flatMap { productRepository.save(it) }
                    .collectList()

                productsSave.flatMap { savedProducts ->
                    saveCharacteristics(savedProducts)
                        .then(savePrices(savedProducts))
                }.subscribe()
            }
        }
    }

    private fun saveCharacteristics(products: List<Product>): Mono<Void> {
        val characteristics = listOf(
            Characteristic(name = "Phone Number", valueText = "+111111111", productId = products[0].id),
            Characteristic(name = "Type", valueText = "Fiber", productId = products[1].id),
            Characteristic(name = "Speed", valueText = "100 Mbps", productId = products[1].id),
            Characteristic(name = "Storage", valueText = "128 GB", productId = products[2].id),
            Characteristic(name = "Color", valueText = "Midnight", productId = products[2].id)
        )

        return characteristicRepository.saveAll(characteristics).then()
    }

    private fun savePrices(products: List<Product>): Mono<Void> {
        val prices = listOf(
            ProductPrice(
                productId = products[0].id,
                recurrent = 20,
                oneTime = 10,
                upfront = 0
            ),
            ProductPrice(
                productId = products[1].id,
                recurrent = 40,
                oneTime = 50,
                upfront = 0
            ),
            ProductPrice(
                productId = products[2].id,
                recurrent = 0,
                oneTime = 0,
                upfront = 999
            )
        )

        return productPriceRepository.saveAll(prices).then()
    }

    fun loadQuotes() {
        quoteRepository.count().flatMap { count ->
            if (count == 0L) {
                productRepository.findAll().collectList()
            } else {
                Mono.empty()
            }
        }.subscribe { products ->
            if (products.isNotEmpty()) {
                val quote1 = Quote(
                    name = "Quote #1",
                    type = QuoteType.SUBMIT
                )
                val quote2 = Quote(
                    name = "Quote #2",
                    type = QuoteType.SUBMIT
                )

                Mono.zip(
                    quoteRepository.save(quote1),
                    quoteRepository.save(quote2)
                ).flatMapMany { savedQuotes ->
                    val quoteItem1 =
                        QuoteItem(
                            name = "Phone Mobile Line",
                            type = QuoteItemType.ADD,
                            quoteId = savedQuotes.t1.id,
                            productId = 1
                        )

                    val quoteItem2 =
                        QuoteItem(
                            name = "Internet 100 Mbps",
                            type = QuoteItemType.ADD,
                            quoteId = savedQuotes.t2.id,
                            productId = 2
                        )

                    val quoteItem3 = QuoteItem(
                        name = "Iphone 14 128 GB Midnight",
                        type = QuoteItemType.ADD,
                        quoteId = savedQuotes.t2.id,
                        productId = 3
                    )

                    Mono.zip(
                        quoteItemRepository.save(quoteItem1),
                        quoteItemRepository.save(quoteItem2),
                        quoteItemRepository.save(quoteItem3),
                    ).flatMap { savedQuoteItems ->

                        val savedQuoteItemList = listOf(savedQuoteItems.t1, savedQuoteItems.t2, savedQuoteItems.t3)

                        saveQuoteItemCharacteristics(savedQuoteItemList)
                            .thenReturn(savedQuoteItemList)

                    }.flatMapMany { savedQuoteItemList ->
                        val prices = listOf(
                            QuoteItemPrice(
                                quoteItemId = savedQuoteItemList[0].id,
                                recurrent = 20,
                                oneTime = 10,
                                upfront = 0,
                                commitment = 50
                            ),
                            QuoteItemPrice(
                                quoteItemId = savedQuoteItemList[1].id,
                                recurrent = 40,
                                oneTime = 50,
                                upfront = 0,
                                commitment = 100
                            ),
                            QuoteItemPrice(
                                quoteItemId = savedQuoteItemList[2].id,
                                recurrent = 0,
                                oneTime = 0,
                                upfront = 999,
                                commitment = 100
                            )
                        )

                        priceRepository.saveAll(prices)
                    }
                }.subscribe()
            }
        }
    }

    private fun saveQuoteItemCharacteristics(quoteItems: List<QuoteItem>): Mono<Void> {
        val characteristics = listOf(
            QuoteItemCharacteristic(name = "Phone Number", valueText = "+111111111", quoteItemId = quoteItems[0].id),
            QuoteItemCharacteristic(name = "Type", valueText = "Fiber", quoteItemId = quoteItems[1].id),
            QuoteItemCharacteristic(name = "Speed", valueText = "100 Mbps", quoteItemId = quoteItems[1].id),
            QuoteItemCharacteristic(name = "Storage", valueText = "128 GB", quoteItemId = quoteItems[2].id),
            QuoteItemCharacteristic(name = "Color", valueText = "Midnight", quoteItemId = quoteItems[2].id)
        )

        return quoteItemCharacteristicRepository.saveAll(characteristics).then()
    }
}