export const normalizeCapitalization = (reference: string[], value: string) => {
  for (const reference_value of reference) {
    if (reference_value.toLowerCase() === value.toLowerCase())
      return reference_value;
  }
};
