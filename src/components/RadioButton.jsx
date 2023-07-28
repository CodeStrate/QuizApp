import './RadioButton.css'


const RadioButton = ({children, id, onChange, variant, checked, ...rest}) => {

    return (
        <>
        <input type="radio"
        className={`radio-button ${variant ? variant : ""}`}
        id={id}
        {...rest}
        onChange={onChange}
        checked={checked}
        />

        <label
        htmlFor={id}>
            {children}
        </label>
        </>
    )
}

export default RadioButton