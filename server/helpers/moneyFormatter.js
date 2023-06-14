class MoneyFormatter {
  static formatToEuro(number) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number);
  }
}

module.exports = MoneyFormatter;
