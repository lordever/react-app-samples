package com.backend.backend.model

data class QuoteDTO(
    var id: Int,
    var name: String,
    var type: QuoteTypeEnumDTO,
    var quoteItems: List<QuoteItemDTO>,
    var totalPrice: QuoteTotalPriceDTO? = null
)