package com.backend.backend.domain

import org.springframework.data.annotation.Id

data class Characteristic(
    @Id
    var id: Int? = null,
    var productId: Int? = null,
    var name: String,
    var valueText: String
)