import React from 'react';

import './FormInput.scss';

/**
 * FormInput component handles the user input section in the form.
 * It customises a form input based on its needed functionality.
 * It accepts a function (handleChange) which will be passed into the input as onChange,
 * and handles the logic when user types something. setState() will be called in SignIn component.
 * It accepts label which determines the type of the form input.
 * ...otherProps takes the rest of parameters, and will be destructured into the form input.
 * So the input can be determined by name, type, value and required
 */
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {
      // If a label is passed in, then generates the label tag.
      // if user is typing something and the value is not empty, then add the shrink into the label class.
      label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      ) : null
    }
  </div>
);

export default FormInput;
