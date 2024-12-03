package com.backend.backend.domain

import org.springframework.data.annotation.Id

data class QuoteItemCharacteristic(
    @Id
    var id: Int? = null,
    var quoteItemId: Int? = null,
    var name: String,
    var valueText: String? = null
)
