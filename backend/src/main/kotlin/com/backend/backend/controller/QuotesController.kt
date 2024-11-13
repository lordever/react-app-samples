package com.backend.backend.controller

import com.backend.backend.model.QuoteDTO
import com.backend.backend.services.QuoteService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class QuotesController(var quoteService: QuoteService) {
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
}