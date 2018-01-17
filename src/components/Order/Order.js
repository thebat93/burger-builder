import React from 'react';

import classes from './Order.css';

// заказ

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) { // формируем массив из объектов
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => // формируем JSX из ингредиентов
        <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px' 
            }}
            key={ingredient.name}>
            {ingredient.name} ({ingredient.amount})
        </span>
    );
    return (
        <div className={classes.Order}>
            <p>Ingredients: { ingredientOutput }</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;