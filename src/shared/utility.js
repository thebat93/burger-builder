// Вспомогательная функция для упрощения чтения редьюсеров

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => { // проверка валидности
    let isValid = true;

    if (rules.required) { // если поле должно быть required
        isValid = value.trim() !== '' && isValid; // устанавливаем новое значение валидности
    }
    if (rules.minLength) { // если поле имеет ограничение на количество символов
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) { // если поле имеет ограничение на количество символов
        isValid = value.length <= rules.maxLength && isValid;
    }
    // вернет true только если все проверки успешно прошли
    return isValid; // вернули boolean
}