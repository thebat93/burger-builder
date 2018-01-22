// здесь просто собираем все экшены из всех файлов

export { 
    addIngredient, 
    removeIngredient, 
    initIngredients 
} from './burgerBuilder';
export { 
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    purchaseBurgerFail
} from './order';