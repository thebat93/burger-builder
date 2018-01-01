import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

// компонент бургера

const burger = (props) => {
    // динамически формируем JSX из компонентов <BurgerIngredient>, который будет находится между нижней и верхей булочкой
    // преобразуем переданный в props объект в массив
    let transformedIngredients = Object.keys(props.ingredients)
        // для каждого типа ингредиента создаем соответствующий компонент <BurgerIngredient> в JSX
        .map(ingredientKey => {
            // создаем массив с количеством ячеек, равным количеству ингредиентов определенного типа
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                // проходим по каждому из низ и возвращаем JSX
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />;
            })
        })
        // на выходе имеем массив [Array(...), Array(...), Array(...), Array(...)]
        // засовываем все в один массив
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;