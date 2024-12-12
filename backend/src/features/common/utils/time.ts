export const getIssueDate = () => new Date().toISOString();

export const getExpirationDate = (originalDate: string) => {
  const expirationDate = new Date(originalDate);
  expirationDate.setDate(expirationDate.getDate() + 30);

  return expirationDate.toISOString();
};
