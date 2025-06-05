const form = document.querySelector("form");

// clear the error
const clearError = (input) => {
  const errorMessage = document.querySelector(`.${input.name}_error`);
  if (errorMessage) {
    errorMessage.style.display = "none";
    input.classList.remove("error-border");
  }
};

// render the error
const renderError = (input) => {
  const errorMessage = document.querySelector(`.${input.name}_error`);
  if (errorMessage) {
    errorMessage.style.display = "";
    input.classList.add("error-border");
  }
};

// Validation rules
const validations = {
  first_name: (value) => !!value.trim(),
  last_name: (value) => !!value.trim(),
  email: (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
  query_type: () =>
    document.querySelector("input[name='query_type']:checked") !== null,
  message: (value) => !!value.trim(),
  consent: () => document.querySelector("input[name='consent']").checked,
};

const dataIsValid = (name, value) => {
  return validations[name] ? validations[name](value) : true;
};

const handleChange = (e) => {
  clearError(e.target);
};

const handleSubmit = (e) => {
  e.preventDefault();

  let isValid = true;
  const data = Object.fromEntries(new FormData(e.target));

  ["first_name", "last_name", "email", "message"].forEach((name) => {
    const input = document.querySelector(`[name='${name}']`);
    if (!dataIsValid(name, data[name])) {
      isValid = false;
      renderError(input);
    }
  });

  const queryError = document.querySelector(".query_type_error");
  if (!dataIsValid("query_type")) {
    isValid = false;
    queryError.style.display = "";
  } else {
    queryError.style.display = "none";
  }

  const checkboxError = document.querySelector(".checkbox_error");
  if (!dataIsValid("consent")) {
    isValid = false;
    checkboxError.style.display = "";
  } else {
    checkboxError.style.display = "none";
  }
  if (isValid) {
    console.log("Name validation passed successfully!");
  }
};

form.addEventListener("submit", handleSubmit);
