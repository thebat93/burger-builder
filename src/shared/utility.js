// Вспомогательная функция для упрощения чтения редьюсеров

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};