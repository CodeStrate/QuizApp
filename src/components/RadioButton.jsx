import "./RadioButton.css";

const RadioButton = ({ children, id, ...rest }) => {
  return (
    <>
      <input
        type="radio"
        className={`radio-button`}
        id={id}
        {...rest}
      />
      <label htmlFor={id}>{children}</label>
    </>
  );
};

export default RadioButton;
