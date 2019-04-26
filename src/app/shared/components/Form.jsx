import React, { useReducer } from "react";

const formValuesReducer = (formValues, action) => {
  switch (action.type) {
    case "inputChange":
      return action.payload;

    default:
      return formValues;
  }
};

const labelClassesReducer = (labelClasses, action) => {
  if (action.value !== "") {
    return { ...labelClasses, [action.name]: `input-not-empty` };
  } else {
    return { ...labelClasses, [action.name]: "" };
  }
};

export default ({ fields, dispatch }) => {
  const initialFormValues = fields.reduce((init, field) => {
    if (field.type === "text" || field.type === "password") {
      return { ...init, [field.name]: "" };
    } else if (field.type === "checkbox") {
      return { ...init, [field.name]: false };
    } else {
      return { ...init, [field.name]: true };
    }
  }, {});

  const [formValues, dispatchFormValues] = useReducer(
    formValuesReducer,
    initialFormValues
  );

  const handleInputChange = e => {
    switch (e.target.type) {
      case "text":
      case "password":
        dispatchFormValues({
          type: "inputChange",
          payload: { ...formValues, [e.target.name]: e.target.value }
        });
        break;

      default:
        break;
    }
  };

  //todo: try to refactor this by pure css;
  const initialLabelClasses = fields.reduce((init, field) => {
    return { ...init, [field.name]: "" };
  }, {});
  const [labelClasses, dispatchLabelClasses] = useReducer(
    labelClassesReducer,
    initialLabelClasses
  );

  const handleInputOnKeyUp = e => {
    dispatchLabelClasses({
      type: "checkInputBoxStatus",
      value: e.target.value,
      name: e.target.name
    });
  };

  const renderFormFields = () => {
    return fields.map(field => {
      return (
        <div key={`formField${field.name}`} className="form-field">
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name]}
            name={field.name}
            onChange={handleInputChange}
            onKeyUp={handleInputOnKeyUp}
          />
          <label htmlFor={field.name} className={labelClasses[field.name]}>
            {field.labelText}
          </label>
        </div>
      );
    });
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: "login", payload: formValues });
      }}
    >
      {renderFormFields()}
      <div className="button-container">
        <button>submit</button>
      </div>
    </form>
  );
};
