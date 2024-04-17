import moment from "moment";

class ValidatorUtils {
  static isValidCpf(cpf) {
    if (!cpf) return false;

    let sum = 0;
    let rest;

    if (
      [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
      ].includes(cpf)
    ) {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) {
      rest = 0;
    }

    if (rest !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  static isValidEmail(email) {
    if (!email) return false;

    const regexp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexp.test(email.toLowerCase());
  }
}

export default ValidatorUtils;
