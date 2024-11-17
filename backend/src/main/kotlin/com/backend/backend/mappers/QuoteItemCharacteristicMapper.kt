package com.backend.backend.mappers

import com.backend.backend.domain.QuoteItemCharacteristic
import com.backend.backend.model.QuoteItemCharacteristicDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface QuoteItemCharacteristicMapper {
    @Mapping(target = "value", source = "valueText")
    fun toDTO(characteristic: QuoteItemCharacteristic): QuoteItemCharacteristicDTO

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "quoteItemId", target = "quoteItemId")
    fun toCharacteristicByQuoteItemId(characteristicDTO: QuoteItemCharacteristicDTO, quoteItemId: Int): QuoteItemCharacteristic
}