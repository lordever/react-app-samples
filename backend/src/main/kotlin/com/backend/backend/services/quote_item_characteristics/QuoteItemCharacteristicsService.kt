package com.backend.backend.services.quote_item_characteristics

import com.backend.backend.model.QuoteItemCharacteristicDTO
import reactor.core.publisher.Flux

interface QuoteItemCharacteristicsService {
    fun updateCharacteristicsByQuoteItemId(quoteItemId: Int, characteristics: List<QuoteItemCharacteristicDTO>): Flux<QuoteItemCharacteristicDTO>
}