/* Валидация форм */

//Получаем все формы в массив, затем перебираем его, отлавливаем событие сабмит дефолтное и отключаем.
//Далее в setEventListeners передаём аргумент форму formElement, которую перебрали циклом.
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));



  //Функция, которая получает в аргументе форму.
  //Далее мы находим инпуты в этой форме, записав их массив в константу. Так же, находим кнопку отправки форм.
  //Затем нужно сразу определить статус кнопки отправки
  //Для этого передадим в функцию  toggleButtonState константу с массивом кнопок и константу с самой кнопкой.
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        //В момент ввода в инпут текста, мы вызываем каждый раз 2 функции.
        //Сначала checkInputValidity с 2 аргументами
        checkInputValidity(formElement, inputElement);

        //Вторая функция это опять toggleButtonState с 2 аргументами.
        toggleButtonState(inputList, buttonElement);
      })
    })

  }

  //Эта функция принимает массив инпутов формы и кнопку отправки формы
  //Далее она внутри в условие if вызывает функцию hasInvalidInput,
  //Функция hasInvalidInput перебирает методом some все инпуты на валидность, если все заполнены, отдаст true, а если хоть один инпут
  //является невалидным, то отдаст false.  И если все инпуты заполнены правильно, то мы уберём класс или обратное.
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //Функция hasInvalidInput перебирает методом some все инпуты на валидность, если все заполнены, отдаст true, а если хоть один инпут
  //является невалидным, то отдаст false.  И если все инпуты заполнены правильно, то мы уберём класс или обратное.

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //Функция checkInputValidity получает 2 аргумента, это форму и инпут в котором происходит событие Input.
  //Каждый раз, когда мы что-нибудь вводим в инпут в функции setEventListeners, мы вызываем эту функцию,
  //где проверяем инпут на валидность. Если инпут после ввода символа не прошёл валидацию, то мы вызываем функцию
  //showInputError с 3 аргументами, это форма, элемент инпута где не прошла валидация и ошибку этого инпута.
  //Если же инпут прошёл валидацию, то мы вызываем функцию hideInputError с 2 аргументами, это форма и инпут.
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  //Функция получает форму, инпут и ошибку инпута в аргумент
  //Дальше внутри формы находим span с ошибкой по айди нашего инпута и записывает этот айди с приставкой -error в константу.
  //Дальше на сам инпут навешивается класс с ошибкой
  //Затем в тег ошибки вставляем текстовой узел с ошибкой и навешиваем класс активной ошибки.
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }


  //Функция получает форму, инпут и ошибку инпута в аргумент
  //Дальше внутри формы находим span с ошибкой по айди нашего инпута и записывает этот айди с приставкой -error в константу.
  //Дальше убираем класс с ошибкой с инпута
  //Затем очищаем текстовой узел ошибки в теге и убираем класс ошибки.
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };


  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })

    setEventListeners(formElement);
  })

}

export { enableValidation }
