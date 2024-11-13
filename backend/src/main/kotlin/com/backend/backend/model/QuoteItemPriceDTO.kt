package com.backend.backend.model

data class QuoteItemPriceDTO(
    var id: Int,
    var recurrent: Int,
    var oneTime: Int,
    var upfront: Int,
    var commitment: Int,
)
