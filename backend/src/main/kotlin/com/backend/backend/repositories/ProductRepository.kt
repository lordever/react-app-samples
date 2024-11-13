package com.backend.backend.repositories

import com.backend.backend.domain.Product
import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface ProductRepository : ReactiveCrudRepository<Product, Int> {
}