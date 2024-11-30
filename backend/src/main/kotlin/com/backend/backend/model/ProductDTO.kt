package com.backend.backend.model

data class ProductDTO(
    var id: Int,
    var name: String,
    var characteristics: List<CharacteristicDTO>,
    var type: ProductTypeEnumDTO,
    var prices: List<ProductPriceDTO>
)