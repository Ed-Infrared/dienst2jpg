function validateServiceNumber(serviceNumber) {
  if (typeof serviceNumber !== 'string' || serviceNumber.length === 0) {
    return false;
  }
  // Pattern: exactly one of V, D, D2, G, P, X followed by exactly 4 digits
  const pattern = /^(V|D|D2|G|P|X)[0-9]{4}$/;
  return pattern.test(serviceNumber);
}

module.exports = { validateServiceNumber };