export default function reverseFormat(lang, currency, money) {
  const separatorDecimal = new Intl.NumberFormat(lang, {
    style: "decimal",
  })
    .format(11.11)
    .replace(/\d/g, "");

  const separatorThousands = new Intl.NumberFormat(lang, {
    style: "decimal",
  })
    .format(1111)
    .replace(/\d/g, "");

  const symbolOnLeft = new Intl.NumberFormat(lang, {
    style: "currency",
    currency,
  })
    .format(1)
    .replace(
      new RegExp(`\\d|[${separatorDecimal}${separatorThousands}]*`, "g"),
      ""
    );

  const stringNumber = money
    .replace(new RegExp(`[${separatorThousands}]`, "g"), "")
    .replace(separatorDecimal, ".")
    .replace(new RegExp(`[${symbolOnLeft}]`, "g"), "");

  return parseFloat(stringNumber);
}
