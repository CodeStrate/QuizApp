import "./RadioButton.css";

const RadioButton = ({ children, id, variant, ...rest }) => {
  return (
    <>
      <input
        type="radio"
        className={`radio-button ${variant ? variant : ""}`}
        id={id}
        {...rest}
      />
      <label htmlFor={id}>{children}</label>
    </>
  );
};

export default RadioButton;
