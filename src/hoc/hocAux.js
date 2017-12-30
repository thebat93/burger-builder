// компонент высшего порядка: обертка для других компонентов (чтобы не нужно было оборачивать в div)
const aux = ( props ) => props.children;

export default aux;