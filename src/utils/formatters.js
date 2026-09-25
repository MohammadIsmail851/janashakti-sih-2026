export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const maskAadhaar = (aadhaar) => {
  if (!aadhaar) return "•••• •••• ••••";
  return `•••• •••• ${aadhaar.slice(-4)}`;
};

export const maskAccount = (accountNo) => {
  if (!accountNo) return "••••••••••••";
  return `••••••••${accountNo.slice(-4)}`;
};
