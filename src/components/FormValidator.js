/* Валидация форм */
export default class FormValidator {
  constructor(settings, formElement) {
    this.formElement = formElement;
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.inputErrorClass = settings.inputErrorClass;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.errorClass = settings.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this.submitButton = this.formElement.querySelector(
      this.submitButtonSelector
    );
  }


  enableValidation() {
    this.form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }
  
  // resetValidation
  resetFormValidation() {
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
  }
  
  _setEventListeners() {
    _toggleButtonState();
    
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
    
  }
  
  _toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  };


}