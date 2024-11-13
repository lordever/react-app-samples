package com.backend.backend.mappers

import com.backend.backend.domain.Characteristic
import com.backend.backend.domain.Product
import com.backend.backend.domain.ProductPrice
import com.backend.backend.model.ProductDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring", uses = [CharacteristicMapper::class, ProductPriceMapper::class])
interface ProductMapper {
    @Mapping(target = "characteristics", source = "characteristics")
    @Mapping(target = "prices", source = "prices")
    fun toDto(product: Product, characteristics: List<Characteristic>, prices: List<ProductPrice>): ProductDTO
}