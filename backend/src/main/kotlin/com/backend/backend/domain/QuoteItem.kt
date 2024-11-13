package com.backend.backend.domain

import org.springframework.data.annotation.Id

data class QuoteItem(
    @Id
    var id: Int? = null,
    var quoteId: Int? = null,
    var productId: Int? = null,
    var name: String,
    var type: QuoteItemType
)