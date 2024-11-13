package com.backend.backend.model

data class ProductPriceDTO(
    var id: Int,
    var recurrent: Int,
    var oneTime: Int,
    var upfront: Int
)
