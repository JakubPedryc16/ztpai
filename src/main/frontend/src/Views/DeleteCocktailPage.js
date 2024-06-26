import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cocktail from '../components/Complex/Cocktail';
import Navbar from "../components/Complex/Navbar";
import Ingredient from '../components/Complex/Ingredient';
import {
    CardsSection, CardTitle, CocktailsPageContainer,
    MultipleCardsContainer
} from "../components/StyledComponents/RegularComponents";
import {DeleteButton} from "../components/StyledComponents/SpecialComponents";
import {deleteDataWithToken, fetchDataWithToken} from "../utils/ApiUtils";


function DeleteCocktailPage() {
    const [cocktails, setCocktails] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedCocktail, setSelectedCocktail] = useState(null);


    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const cocktailData = await fetchDataWithToken('http://localhost:8080/users/cocktails/me');
                if (Array.isArray(cocktailData)) {
                    setCocktails(cocktailData);
                } else {
                    console.error('Cocktails data is not an array:', cocktailData);
                }
            } catch (e) {
                console.error('Error fetching cocktails:', e);
            }
        };

        fetchCocktails();
    }, []);

    const fetchIngredients = async (cocktailId) => {
        try {
            const ingredientsData = await fetchDataWithToken(`http://localhost:8080/users/ingredients/${cocktailId}`);

            if (Array.isArray(ingredientsData)) {
                setIngredients(ingredientsData);
            } else {
                console.error('Ingredients data is not an array:', ingredientsData);
            }
        } catch (e) {
            console.error('Error fetching ingredients:', e);
        }
    };

    const handleCocktailClick = (cocktail) => {
        setSelectedCocktail(cocktail);
        fetchIngredients(cocktail.id);
    };

    const handleDeleteCocktail = async () => {
        if (selectedCocktail) {
            const isConfirmed = window.confirm('Are you sure you want to delete this cocktail?');
            if (!isConfirmed) return;

            try {

                const response = await deleteDataWithToken(`http://localhost:8080/users/cocktails/${selectedCocktail.id}`)

                if (response.status === 200) {
                    setCocktails(cocktails.filter(cocktail => cocktail.id !== selectedCocktail.id));
                    setSelectedCocktail(null); // Clear selection after deletion
                    console.log('Cocktail deleted successfully');
                } else {
                    console.error('Failed to delete cocktail:', response.data);
                }
            } catch (e) {
                console.error('Error deleting cocktail:', e);
            }
        } else {
            console.error('No cocktail selected for deletion');
        }
    };

    return (
        <>
            <Navbar />
            <CocktailsPageContainer>
                <CardsSection>
                    <CardTitle>Cocktails</CardTitle>
                    <MultipleCardsContainer>
                        {cocktails.map(cocktail => (
                            <Cocktail
                                key={cocktail.id}
                                imageSrc={cocktail.cocktailImage}
                                text={cocktail.cocktailName}
                                tags={cocktail.tags} // Pass the tags here
                                onClick={() => handleCocktailClick(cocktail)}
                            />
                        ))}
                    </MultipleCardsContainer>
                </CardsSection>
                <CardsSection>
                    <CardTitle>Ingredients</CardTitle>
                    <MultipleCardsContainer>
                        {ingredients.map(ingredient => (
                            <Ingredient
                                key={ingredient.id}
                                ingredientName={ingredient.ingredientName}
                                ingredientImage={ingredient.ingredientImage}
                                ingredientAmount={ingredient.ingredientAmount}
                            />
                        ))}
                        <DeleteButton onClick={handleDeleteCocktail}>Delete</DeleteButton>
                    </MultipleCardsContainer>
                </CardsSection>
            </CocktailsPageContainer>
        </>
    );
}

export default DeleteCocktailPage;

