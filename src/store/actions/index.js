// здесь просто собираем все экшены из всех файлов

export {
  addIngredient,
  removeIngredient,
  initIngredients
} from './burgerBuilder';

export { purchaseBurger, purchaseInit, fetchOrders } from './order';

export { auth, logout, setAuthRedirectPath, authCheckState } from './auth';
