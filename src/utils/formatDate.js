const dateTimeLocale = (date) =>
  new Date(date).toLocaleString('pt-BR').replace(' ', ' às ').substring(0, 19)

export { dateTimeLocale as formatDateLocaleDateTime }
