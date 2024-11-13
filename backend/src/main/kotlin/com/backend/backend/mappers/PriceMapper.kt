package com.backend.backend.mappers

import com.backend.backend.domain.QuoteItemPrice
import com.backend.backend.model.QuoteItemPriceDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface PriceMapper {
    fun toDto(price: QuoteItemPrice): QuoteItemPriceDTO

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "quoteItemId", target = "quoteItemId")
    fun toPriceByQuoteItemId(priceDTO: QuoteItemPriceDTO, quoteItemId: Int): QuoteItemPrice
}
