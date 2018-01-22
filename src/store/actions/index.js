// здесь просто собираем все экшены из всех файлов

export { 
    addIngredient, 
    removeIngredient, 
    initIngredients 
} from './burgerBuilder';
export {
    purchaseBurger,
    purchaseBurgerSuccess,
    purchaseBurgerFail,
    purchaseInit
} from './order';