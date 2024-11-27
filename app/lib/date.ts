export const formatDate = () => {
  const today = new Date();
  return today.toLocaleDateString("en-GB").replace(/\//g, "").slice(0, 6);
};
