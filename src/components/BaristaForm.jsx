import React, { useEffect, useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";

const BaristaForm = () => {
    const [currentDrink, setCurrentDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState({});
    const [inputs, setInputs] = useState({
        temperature: '',
        milk: '',
        syrup: '',
        blended: ''
    });
    
    const [feedback, setFeedback] = useState({
        temperature: '',
        syrup: '',
        milk: '',
        blended: ''
    });

    const ingredients = {
        temperature: ['hot', 'lukewarm', 'cold'],
        syrup: ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        milk: ['cow', 'oat', 'goat', 'almond', 'none'],
        blended: ['yes', 'turbo', 'no']
    };

    useEffect(() => {
        getNextDrink();
    }, []); // Call getNextDrink on component mount

    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
        setInputs({
            temperature: '',
            milk: '',
            syrup: '',
            blended: ''
        });
        setFeedback({
            temperature: '',
            syrup: '',
            milk: '',
            blended: ''
        });
    };

    const onCheckAnswer = () => {
        const newFeedback = { ...feedback }; // Create a copy of feedback

        // Check temperature
        newFeedback.temperature = trueRecipe.temp === inputs.temperature ? "correct" : "wrong";

        // Check syrup
        newFeedback.syrup = trueRecipe.syrup === inputs.syrup ? "correct" : "wrong";

        // Check milk
        newFeedback.milk = trueRecipe.milk === inputs.milk ? "correct" : "wrong";

        // Check blended
        newFeedback.blended = trueRecipe.blended === inputs.blended ? "correct" : "wrong";

        setFeedback(newFeedback);
    };

    return (
        <div>
            <h2>Hi, I'd like to order a:</h2>
            <div className="drink-container">
                <h2 className="mini-header">{currentDrink}</h2>
                <button
                    type="button"
                    className="button newdrink"
                    onClick={getNextDrink}
                >
                    🔄
                </button>
            </div>

            <h3>Temperature</h3>
            <div className="answer-space" id={feedback.temperature}>
                {inputs.temperature}
            </div>
            <RecipeChoices
                handleChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                label="temperature"
                choices={ingredients.temperature}
                checked={inputs.temperature}
            />

            <h3>Syrup</h3>
            <div className="answer-space" id={feedback.syrup}>
                {inputs.syrup}
            </div>
            <RecipeChoices
                handleChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                label="syrup"
                choices={ingredients.syrup}
                checked={inputs.syrup}
            />

            <h3>Milk</h3>
            <div className="answer-space" id={feedback.milk}>
                {inputs.milk}
            </div>
            <RecipeChoices
                handleChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                label="milk"
                choices={ingredients.milk}
                checked={inputs.milk}
            />

            <h3>Blended</h3>
            <div className="answer-space" id={feedback.blended}>
                {inputs.blended}
            </div>
            <RecipeChoices
                handleChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                label="blended"
                choices={ingredients.blended}
                checked={inputs.blended}
            />

            <button type="button" className="button submit" onClick={onCheckAnswer}>Check Answer</button>
            <button type="button" className="button submit" onClick={getNextDrink}>New Drink</button>
        </div>
    );
};

export default BaristaForm;