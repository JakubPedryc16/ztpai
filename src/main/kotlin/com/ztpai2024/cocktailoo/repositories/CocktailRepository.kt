package com.ztpai2024.cocktailoo.repositories

import com.ztpai2024.cocktailoo.dtos.CocktailDto
import com.ztpai2024.cocktailoo.entities.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.deleteWhere
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Repository

@Repository
class CocktailRepository  {
    fun findAll(): List<Cocktail> {
        return try {
            transaction {
                Cocktail.all().toList()
            }
        }
        catch (e: Exception) {
            println("Error findAll:CocktailRepository ${e.message}")
            return emptyList()
        }
    }



    fun findById(id: Int): Cocktail? {
        return transaction {
            Cocktail.findById(id)
        }
    }

    fun findByUserId(id: Int): List<Cocktail> {
        return try {
            transaction {
                Cocktail.find { Cocktails.userId eq id }.toList()
            }
        }
        catch (e: Exception) {
            println("Error findByUserId: ${e.message}")
            throw e;
        }
    }

    fun addCocktail(cocktailData: CocktailDto) {
        try {
            transaction {
                val authentication: Authentication = SecurityContextHolder.getContext().authentication

                val currentUser: User = authentication.principal as User

                val newCocktail = Cocktail.new {
                    this.user = currentUser
                    cocktailName = cocktailData.cocktailName
                    cocktailImage = cocktailData.cocktailImage
                }

                cocktailData.ingredients.forEach { ingredientData ->
                    CocktailsIngredients.insert {
                        it[cocktailId] = newCocktail.id
                        it[ingredientId] = ingredientData.id
                        it[amount] = ingredientData.ingredientAmount
                    }
                }

                cocktailData.tags.forEach { tagData ->
                    CocktailsTags.insert {
                        it[cocktailId] = newCocktail.id
                        it[tagId] = tagData.id
                    }
                }
            }
        } catch (e: Exception) {
            println("Error adding cocktail: ${e.message}")

            throw e
        }
    }

    fun deleteCocktail(id: Int) {
        try {
            transaction {
                CocktailsIngredients.deleteWhere { CocktailsIngredients.cocktailId eq id }
                CocktailsTags.deleteWhere { CocktailsTags.cocktailId eq id }

                val cocktail = Cocktail.findById(id)
                if (cocktail != null) {
                    cocktail.delete()
                } else {
                    println("Cocktail with id $id not found.")
                }
            }
        } catch (e: Exception) {
            println("Error deleting cocktail(REPOSITORY): ${e.message}")
            throw e
        }
    }

}
