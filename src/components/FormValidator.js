/* Валидация форм */
export default class FormValidator {
  constructor(settings, formElement) {
    this.formElement = formElement;
    this.inputSelector = settings.inputSelector;
    this.errorClass = settings.errorClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.submitButtonSelector = settings.submitButtonSelector;
    this._inputList = Array.from(
      this.formElement.querySelectorAll(this.inputSelector)
    );
    this.submitButton = this.formElement.querySelector(
      this.submitButtonSelector
    );
  }

  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  // resetValidation
  resetFormValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
      console.log(errorElement)
    });

  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })

  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this.submitButton.classList.remove(this.inactiveButtonClass);
      this.submitButton.removeAttribute('disabled');
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      console.log(inputElement, inputElement.validationMessage)
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
    console.log('showinputerr')
  };

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "dsfsdfsdf";
  };

  _disableSubmitButton() {
    this.submitButton.classList.add(this.inactiveButtonClass);
    this.submitButton.setAttribute('disabled', '');
  }

}
