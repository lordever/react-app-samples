package com.backend.backend.domain

import org.springframework.data.annotation.Id

data class QuoteItemPrice(
    @Id
    var id: Int? = null,
    var quoteItemId: Int? = null,
    var recurrent: Int,
    var oneTime: Int,
    var upfront: Int,
    var commitment: Int
)