export const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+[.][^\s@]+$/.test(email);
