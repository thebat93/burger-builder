import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Все Actions Creators, относящиеся к BurgerBuilder

// Action Creator: Добавление ингредиента

export const addIngredient = ingredientName => {
  return {
    type: actionTypes.ADD_INGRIDIENTS,
    ingredientName
  };
};

// Action Creator: Удаление ингредиента

export const removeIngredient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGRIDIENTS,
    ingredientName
  };
};

// асихнхронный Action Creator: инициализация ингредиентов

// экшен, который диспатчится после асинхронной операции
const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGRIDIENTS,
    ingredients
  };
};

// экшен, который диспатчится после асинхронной операции
const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGRIDIENTS_FAILED
  };
};

// не отображается в Redux DevTools
export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://react-burger-builder-98f3a.firebaseio.com/ingredients.json')
      .then(response => {
        // вызов экшена после асинхронной операции
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      }); // просто ловим ошибку чтобы отработал HOC обработчик ошибок
  };
};
