package com.backend.backend.repositories

import com.backend.backend.domain.Quote
import org.springframework.data.repository.reactive.ReactiveCrudRepository

interface QuoteRepository: ReactiveCrudRepository<Quote, Int>