package com.backend.backend.mappers

import com.backend.backend.domain.ProductPrice
import com.backend.backend.model.ProductPriceDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface ProductPriceMapper {
    fun toDto(price: ProductPrice): ProductPriceDTO

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "productId", target = "productId")
    fun toPriceByProductId(priceDTO: ProductPriceDTO, productId: Int): ProductPrice
}