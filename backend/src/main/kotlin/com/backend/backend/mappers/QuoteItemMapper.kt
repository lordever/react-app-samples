package com.backend.backend.mappers

import com.backend.backend.domain.QuoteItemPrice
import com.backend.backend.domain.QuoteItem
import com.backend.backend.model.ProductDTO
import com.backend.backend.model.QuoteItemDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring", uses = [PriceMapper::class, ProductMapper::class])
interface QuoteItemMapper {

    @Mapping(target = "id", source = "quoteItem.id")
    @Mapping(target = "name", source = "quoteItem.name")
    @Mapping(target = "prices", source = "prices")
    @Mapping(
        target = "product",
        source = "productDTO"
    ) //TODO: DTO has been passed because otherwise need to pass other internal fields together with product
    fun toDto(quoteItem: QuoteItem, prices: List<QuoteItemPrice>, productDTO: ProductDTO): QuoteItemDTO

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "quoteId", source = "quoteId")
    fun toQuoteItemByQuoteId(quoteItem: QuoteItemDTO, quoteId: Int): QuoteItem
}