/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно.
 * Имя не пустое, без пробелов, минимум 4 символа.
 */
function isValid(name) {

  if (name && !name.includes(' ') && name.length >= 4) {
    return true;
  } else {
    return false;
  }

}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
