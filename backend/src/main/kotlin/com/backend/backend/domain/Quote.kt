package com.backend.backend.domain

import org.springframework.data.annotation.Id

data class Quote(
    @Id
    var id: Int? = null,
    var name: String,
    var type: QuoteType
)