export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(number);
};


export const formatDate = (dateString: string, language = "en-En"): string => {
  const dateObject = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  return new Intl.DateTimeFormat(language, options).format(dateObject);

}