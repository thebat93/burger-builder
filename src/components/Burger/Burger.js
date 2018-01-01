import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

// компонент бургера

const burger = (props) => {
    // динамически формируем JSX из компонентов <BurgerIngredient>, который будет находится между нижней и верхей булочкой
    // преобразуем переданный в props объект в массив
    const transformedIngredients = Object.keys(props.ingredients)
        // для каждого типа ингредиента создаем соответствующий компонент <BurgerIngredient> в JSX
        .map(ingredientKey => {
            // создаем массив с количеством ячеек, равным количеству ингредиентов определенного типа
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                // проходим по каждому из низ и возвращаем JSX
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
            });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;