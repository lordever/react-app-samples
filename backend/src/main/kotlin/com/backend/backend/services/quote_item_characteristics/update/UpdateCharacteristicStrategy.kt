package com.backend.backend.services.quote_item_characteristics.update

import com.backend.backend.model.QuoteItemCharacteristicDTO
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

interface UpdateCharacteristicStrategy {
    fun register()
    fun update(characteristic: QuoteItemCharacteristicDTO): Mono<QuoteItemCharacteristicDTO>
    fun updateAll(characteristics: List<QuoteItemCharacteristicDTO>): Flux<QuoteItemCharacteristicDTO>
}