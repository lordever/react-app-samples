package com.backend.backend.model

data class QuoteTotalPriceDTO(
    var recurrent: Int,
    var oneTime: Int,
    var upfront: Int,
)