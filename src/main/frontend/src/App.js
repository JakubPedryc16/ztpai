import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Views/LoginPage';
import RegisterPage from "./Views/RegisterPage";
import HomePage from "./Views/HomePage";
import SearchPage from "./Views/SearchPage";
import ProfilePage from "./Views/ProfilePage";
import AddCocktailPage from "./Views/AddCocktailPage";
import DeleteCocktailPage from "./Views/DeleteCocktailPage";
import AddIngredientPage from "./Views/AddIngredientPage";
import DeleteIngredientPage from "./Views/DeleteIngredientPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addcocktail" element={<AddCocktailPage />} />
                <Route path="/deletecocktail" element={<DeleteCocktailPage />} />
                <Route path="/addingredient" element={<AddIngredientPage />} />
                <Route path="/deleteingredient" element={<DeleteIngredientPage />} />
            </Routes>
        </Router>
    );
}

export default App;