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
  
  // let result;
  // if (name) {
  //   if (name.length >= 4) {
  //     if (!name.includes(' ')) {
  //       result = true;
  //     }
  //     else {
  //       result = false;
  //     }
  //   } else {
  //     result = false;
  //   }
  // } else {
  //   result = false;
  // }

  let result = name != null && name.length >= 4 && !name.includes(' ');

  return result;
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
