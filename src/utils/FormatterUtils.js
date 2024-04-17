import moment from "moment";

class FormatterUtils {
  static formatCpf(cpf) {
    if (!cpf) return "";

    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  static formatCnpj(cnpj) {
    if (!cnpj) return "";

    return cnpj
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  static formatDate(date, format = "DD/MM/YYYY") {
    if (!date) {
      return "";
    }

    return moment(date).format(format);
  }

  static formatPhone(phone) {
    if (!phone) {
      return "";
    }

    let phoneNumber = phone.replace(/\D/g, "");

    const match = phoneNumber.match(/^(\d{1,2})(\d{0,5})(\d{0,4})$/);

    if (match) {
      phoneNumber = `(${match[1]}${match[2] ? ") " : ""}${match[2]}${
        match[3] ? "-" : ""
      }${match[3]}`;
    }

    return phoneNumber;
  }

  static clearMask(value) {
    if (!value) {
      return value;
    }

    return value.replace(/\D/g, "");
  }

  static formatMoney(price) {
    if (!price) {
      return "";
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  }
}

export default FormatterUtils;
