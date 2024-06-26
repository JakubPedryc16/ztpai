package com.ztpai2024.cocktailoo.controllers

import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.dtos.IngredientDto
import com.ztpai2024.cocktailoo.dtos.toDto
import com.ztpai2024.cocktailoo.entities.Cocktail
import com.ztpai2024.cocktailoo.entities.User
import com.ztpai2024.cocktailoo.repositories.IngredientRepository

import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

@RestController
@RequestMapping("/users")
class IngredientController(
    private val ingredientRepository: IngredientRepository
) {

    @GetMapping("/ingredients")
    @Transactional(readOnly = true)
    fun getAllIngredients(): ResponseEntity<List<IngredientDto>> {
        return try {
            val ingredients = ingredientRepository.findAll()
            val ingredientDtos = ingredients.map { it.toDto() }
            ResponseEntity.ok(ingredientDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania składników: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }

    @GetMapping("/ingredients/{cocktailId}")
    @Transactional(readOnly = true)
    fun getCocktailIngredients(@PathVariable cocktailId: Int): ResponseEntity<List<IngredientDto>> {
        return try {
            val cocktailIngredients = ingredientRepository.findByCocktailId(cocktailId)
            val ingredientDtos = cocktailIngredients.map { it.toDto() }
            ResponseEntity.ok(ingredientDtos)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas pobierania składników koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(emptyList())
        }
    }
    @PostMapping("/admin/upload")
    fun handleFileUpload(@RequestParam("file") file: MultipartFile): ResponseEntity<Map<String, String>> {
        return try {

            val uploadDir = "uploads/ingredients"
            val filename = "${UUID.randomUUID()}_${file.originalFilename}"
            val filepath: Path = Paths.get(uploadDir, filename)
            Files.copy(file.inputStream, filepath)

            ResponseEntity.ok(mapOf("fileName" to filename))

        } catch (e: Exception) {
            println("Wystąpił błąd podczas przesyłania pliku: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(mapOf("error" to "File upload failed"))
        }
    }

    @PostMapping("/admin/add")
    fun addIngredient(@RequestBody ingredientData: IngredientDto): ResponseEntity<IngredientDto> {
        return try {
            ingredientRepository.addIngredient(ingredientData)
            ResponseEntity.ok(ingredientData)
        } catch (e: Exception) {
            println("Wystąpił błąd podczas dodawania koktajlu: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ingredientData)
        }
    }
    @DeleteMapping("/admin/ingredients/{id}")
    fun deleteIngredient(@PathVariable id: Int): ResponseEntity<String> {
        return try {
            val authentication: Authentication = SecurityContextHolder.getContext().authentication
            val currentUser = authentication.principal as User

            val ingredient = transaction { ingredientRepository.findById(id) }

            if (ingredient == null) {
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ingredient not found")
            } else if (currentUser.userRole != "ADMIN") {
                ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this ingredient")
            } else {
                transaction { ingredientRepository.deleteIngredient(id) }
                ResponseEntity.ok("Ingredient deleted successfully")
            }
        } catch (e: Exception) {
            println("Error deleting ingredient: ${e.message}")
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting ingredient")
        }
    }
}
