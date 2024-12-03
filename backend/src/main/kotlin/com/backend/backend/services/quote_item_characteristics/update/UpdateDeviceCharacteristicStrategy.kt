package com.backend.backend.services.quote_item_characteristics.update

import com.backend.backend.domain.ProductType
import com.backend.backend.domain.QuoteItemCharacteristic
import com.backend.backend.mappers.QuoteItemCharacteristicMapper
import com.backend.backend.model.QuoteItemCharacteristicDTO
import com.backend.backend.repositories.QuoteItemCharacteristicRepository
import com.backend.backend.services.quote_item_characteristics.QuoteItemItemCharacteristicsServiceImpl.Companion.addUpdateCharacteristicStrategy
import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Component
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Component
class UpdateDeviceCharacteristicStrategy(
    val repository: QuoteItemCharacteristicRepository,
    val mapper: QuoteItemCharacteristicMapper
): UpdateCharacteristicStrategy {

    @PostConstruct
    override fun register() {
        addUpdateCharacteristicStrategy(ProductType.DEVICE, this)
    }

    override fun update(characteristic: QuoteItemCharacteristicDTO): Mono<QuoteItemCharacteristicDTO> =
        findAndUpdateCharacteristic(characteristic).map(mapper::toDTO)

    override fun updateAll(characteristics: List<QuoteItemCharacteristicDTO>): Flux<QuoteItemCharacteristicDTO> {
        return Flux.fromIterable(characteristics)
            .flatMap { characteristic ->
                findAndUpdateCharacteristic(characteristic)
            }.map(mapper::toDTO)
    }

    private fun findAndUpdateCharacteristic(characteristic: QuoteItemCharacteristicDTO): Mono<QuoteItemCharacteristic> {
        return repository.findById(characteristic.id)
            .switchIfEmpty(Mono.error(IllegalArgumentException("Characteristic with id ${characteristic.id} not found")))
            .flatMap { foundChar ->
                updateFields(foundChar, characteristic)
                repository.save(foundChar)
            }
    }

    private fun updateFields(foundChar: QuoteItemCharacteristic, characteristic: QuoteItemCharacteristicDTO) {
        foundChar.name = characteristic.name
        foundChar.valueText = characteristic.value
    }
}