package com.backend.backend.controller

import com.backend.backend.model.ProductDTO
import com.backend.backend.model.QuoteDTO
import com.backend.backend.services.QuoteItemService
import com.backend.backend.services.QuoteService
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class QuotesController(
    val quoteService: QuoteService,
    val quoteItemService: QuoteItemService
) {
    companion object {
        const val QUOTES_PATH = "/api/v1/quotes"
        const val QUOTES_PATH_ID = "$QUOTES_PATH/{quoteId}"
    }

    @GetMapping(QUOTES_PATH)
    fun findAll(): Flux<QuoteDTO> =
        quoteService.findAll()

    @GetMapping(QUOTES_PATH_ID)
    fun findAll(@PathVariable quoteId: Int): Mono<QuoteDTO> =
        quoteService.findById(quoteId)

    @PostMapping(QUOTES_PATH)
    fun createQuote(@RequestBody quoteDTO: QuoteDTO) =
        quoteService.createQuote(quoteDTO)

    @PostMapping("$QUOTES_PATH_ID/add-quote-item")
    fun addQuoteItem(@PathVariable quoteId: Int, @RequestBody productDTO: ProductDTO) =
        quoteItemService.addOne(quoteId, productDTO)

    @DeleteMapping("$QUOTES_PATH/delete-quote-item/{quoteItemId}")
    fun deleteQuoteItem(@PathVariable quoteItemId: Int) =
        quoteItemService.delete(quoteItemId)
}