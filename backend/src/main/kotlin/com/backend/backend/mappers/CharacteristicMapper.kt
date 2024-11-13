package com.backend.backend.mappers

import com.backend.backend.domain.Characteristic
import com.backend.backend.model.CharacteristicDTO
import org.mapstruct.Mapper
import org.mapstruct.Mapping

@Mapper(componentModel = "spring")
interface CharacteristicMapper {
    @Mapping(target = "value", source = "valueText")
    fun toDTO(characteristic: Characteristic): CharacteristicDTO
}