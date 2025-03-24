export const formatCurrency = (value: number | string | bigint) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(Number(value));
};
