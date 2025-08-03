export const setStorageItem = (key: string, value: any) => {
  let formattedVal = value;
  if (typeof value !== "string") {
    formattedVal = JSON.stringify(value);
  }
  localStorage.setItem(key, formattedVal);
};

export const getStorageItem = (key: string) => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value!);
  } catch (error) {
    return value;
  }
};

export const isValidMobileNumber = (number: string) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(number);
};
