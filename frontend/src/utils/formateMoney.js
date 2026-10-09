export const formateMoney = (value) =>
  `৳ ${Number(value || 0).toLocaleString("en-US")}`;