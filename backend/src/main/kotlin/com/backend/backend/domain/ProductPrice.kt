package com.backend.backend.domain

import org.springframework.data.annotation.Id

data class ProductPrice(
    @Id
    var id: Int? = null,
    var productId: Int? = null,
    var recurrent: Int,
    var oneTime: Int,
    var upfront: Int
)