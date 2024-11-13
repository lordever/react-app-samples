package com.backend.backend.model

data class QuoteItemDTO(
    var id: Int,
    var name: String,
    var type: QuoteItemTypeDTO,
    var product: ProductDTO,
    var prices: List<QuoteItemPriceDTO>
)