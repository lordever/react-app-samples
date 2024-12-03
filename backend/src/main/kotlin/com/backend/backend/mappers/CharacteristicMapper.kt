package com.backend.backend.mappers

import com.backend.backend.domain.Characteristic
import com.backend.backend.model.CharacteristicDTO
import org.mapstruct.Mapper

@Mapper(componentModel = "spring")
interface CharacteristicMapper {
    fun toDTO(characteristic: Characteristic): CharacteristicDTO
}