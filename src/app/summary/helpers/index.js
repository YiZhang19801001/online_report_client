export const getColor = paymentType => {
  switch (paymentType.toLowerCase()) {
    case "wechat":
      return `#56B849`;
    case "cash":
      return `#ffba2d`;
    case "eftpos offline":
      return `#00AAEE`;
    case "redpayments":
      return `#E50112`;
    case "eftpos":
      return `#56B849`;
    case "amex":
      return `#56B0EC`;
    case "visa/master":
    case "visa":
    case "master":
      return `#016272`;
    default:
      return `#a5a5a5`;
  }
};
