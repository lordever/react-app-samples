package com.backend.backend.mappers

import com.backend.backend.domain.Quote
import com.backend.backend.model.QuoteDTO
import com.backend.backend.model.QuoteItemDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring", uses = [QuoteItemMapper::class])
interface QuoteMapper {
    @Mapping(target = "quoteItems", source = "quoteItems")
    fun toDtoWithQuoteItems(quote: Quote, quoteItems: List<QuoteItemDTO>): QuoteDTO

    @Mapping(target = "id", ignore = true)
    fun toQuote(quote: QuoteDTO): Quote
}