package com.backend.backend.controller

import com.backend.backend.model.QuoteItemCharacteristicDTO
import com.backend.backend.services.QuoteItemService
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
class QuoteItemController(
    val quoteItemService: QuoteItemService
) {
    companion object {
        const val QUOTE_ITEM_PATH = "/api/v1/quote-item"
        const val QUOTE_ITEM_PATH_ID = "$QUOTE_ITEM_PATH/{quoteItemId}"
    }

    @PutMapping("${QUOTE_ITEM_PATH_ID}/update-characteristics")
    fun updateCharacteristics(
        @PathVariable quoteItemId: Int,
        @RequestBody characteristics: List<QuoteItemCharacteristicDTO>
    ): Flux<QuoteItemCharacteristicDTO> =
        quoteItemService.updateCharacteristics(quoteItemId, characteristics)
}