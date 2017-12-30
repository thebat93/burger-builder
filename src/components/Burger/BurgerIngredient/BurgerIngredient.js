import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

// ингредиент для бургера
// не является контейнером, класс используется только потому что нужна проверка типов props

class BurgerBuilder extends Component {
    render () {
        let ingredient = null;
    
        // определяем тип ингредиента
        switch (this.props.type) {
            case ('bread-bottom'):
                // нижняя булочка
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                // верхняя булочка с кунжутом
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                    );
                break;
            case ('meat'):
                // МЯСО
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                // сыр
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('bacon'):
                // бекон
                ingredient = <div className={classes.Bacon}></div>;
                break;
            case ('salad'):
                // салат
                ingredient = <div className={classes.Salad}></div>;
                break;
            default:
                ingredient = null;
        }
    
        return ingredient;
    }
}

// валидация типов props
BurgerBuilder.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerBuilder;