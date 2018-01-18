import React from 'react';

import classes from './Input.css';

// компонент для инпута

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]; // применяемые классы

    if (props.invalid && props.shouldValidate && props.touched) { // если поле формы невалидно
        // и должно быть провалидировано
        // и было изменено,
        // то...
        inputClasses.push(classes.Invalid); // ...добавляем класс "Invalid"
    }

    switch ( props.elementType ) { // разные элементы в зависимости от типа
        case ('input'):
            inputElement = (<input 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
            );
            break;
        case ('textarea'):
            inputElement = (<textarea 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />
            );
            break;
        case ('select'):
            inputElement = (
                <select 
                    className={inputClasses.join(' ')}
                    value={props.value} onChange={props.changed} >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (<input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.changed} />);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            { inputElement }
        </div>
    );
};

export default input;