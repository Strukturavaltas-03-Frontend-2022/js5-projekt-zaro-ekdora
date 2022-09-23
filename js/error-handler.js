const nameInput = document.querySelector('.form__input_name');
const emailInput = document.querySelector('.form__input_email');
const addressInput = document.querySelector('.form__input_address');
const formInfo = document.querySelector('.form-info');
const nameInputInfo = document.querySelector('.name-input-info');
const emailInputInfo = document.querySelector('.email-input-info');
const addressInputInfo = document.querySelector('.address-input-info');
const formSubmitBtn = document.querySelector('.submit-btn');

const hints = {
    form: "Leading and trailing spaces will be truncated",
    name: "Minimum 3 characters, letters, spaces and hyphens",
    email: "Simple e-mail format, lowercase letters, numbers",
    address: "Minimum 3 characters",
};

const errors = {
    requiredError: "This field is mandatory",
    onlySpaceError: "This field cannot contain only spaces",
    min3CharsError: "This field must be at least 3 characters long",
    nameError: "Invalid full name format",
    emailError: "Invalid email format",
};

const errorPriority = {
    requiredError: false,
    onlySpaceError: false,
    min3CharsError: false,
    nameError: false,
    emailError: false
};

const formError = {
    name: false,
    email: false,
    address: false
};

const validatorFns = {
    requiredError: (text) => !text,
    onlySpaceError: (text) => /^\s+$/.test(text),
    min3CharsError: (text) => text.toString().length < 3,
    nameError: (text) => !(/^\s*([A-ZÁÉÚŐÓÜÖÍ]([a-záéúőóüöí]+-?\s?)){1,}\s*$/.test(text)),
    emailError: (text) => !(/^([a-z0-9]+)(\.?[a-z0-9]+)@([a-z0-9.]+)\.([a-z]){2,3}$/.test(text))
};

const clearErrors = () => {
    Object.keys(errorPriority).forEach(errorPriorityKey => errorPriority[errorPriorityKey] = false);
};

const checkErrors = (validatorKeys, text) => {
    validatorKeys.forEach(validatorKey => errorPriority[validatorKey] = validatorFns[validatorKey](text));
};

const changeInfoColor = (inputEl, inputInfoEl, isHint) => {
    inputEl.classList?.[isHint ? 'add' : 'remove']('input-border-hint');
    inputEl.classList?.[isHint ? 'remove' : 'add']('input-border-error');
    inputInfoEl.classList?.[isHint ? 'add' : 'remove']('input-hint');
    inputInfoEl.classList?.[isHint ? 'remove' : 'add']('input-error');
};

const setSubmitBtn = () => {
    const disabled = !!Object.keys(formError).filter(formErrorKey => formError[formErrorKey]).length;
    formSubmitBtn.disabled = disabled;
    formSubmitBtn.classList?.[disabled ? 'add' : 'remove']('modal-btn-disabled');
};

const setFormHints = () => {
    nameInputInfo.innerHTML = hints.name;
    emailInputInfo.innerHTML = hints.email;
    addressInputInfo.innerHTML = hints.address;
    changeInfoColor(nameInput, nameInputInfo, true);
    changeInfoColor(emailInput, emailInputInfo, true);
    changeInfoColor(addressInput, addressInputInfo, true);
    setSubmitBtn();
};

const validateField = (validatorKeys, inputEl, inputInfoEl, value, inputName) => {
    const text = value;
    checkErrors(validatorKeys, text);
    const hasError = Object.keys(errorPriority).filter(errorPriorityKey => errorPriority[errorPriorityKey]);
    inputInfoEl.innerHTML = hasError.length ? errors[hasError[0]] : hints[inputName];
    changeInfoColor(inputEl, inputInfoEl, !hasError.length);
    formError[inputName] = hasError.length;
    setSubmitBtn();
    clearErrors();
}

const formValidator = {
    name: (value) => validateField(
        ['requiredError', 'onlySpaceError', 'min3CharsError', 'nameError'],
        nameInput,
        nameInputInfo,
        value,
        'name'
    ),
    email: (value) => validateField(
        ['requiredError', 'onlySpaceError', 'emailError'],
        emailInput,
        emailInputInfo,
        value,
        'email'
    ),
    address: (value) => validateField(
        ['requiredError', 'onlySpaceError', 'min3CharsError'],
        addressInput,
        addressInputInfo,
        value,
        'address'
    )
}

nameInput.addEventListener('input', event => formValidator.name(event.target.value));
emailInput.addEventListener('input', event => formValidator.email(event.target.value));
addressInput.addEventListener('input', event => formValidator.address(event.target.value));

formInfo.innerHTML = hints.form;
setFormHints();

export { formError, setFormHints, setSubmitBtn };