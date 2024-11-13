package com.backend.backend.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TestController {

    companion object {
        const val TEST_PATH = "/api/v1/test"
    }

    @GetMapping(TEST_PATH)
    fun getTestArr(): Array<String> {
        return arrayOf("Test", "Example", "Sample", "Content")
    }
}