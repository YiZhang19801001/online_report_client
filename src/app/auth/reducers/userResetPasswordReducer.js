export default (
  userRestPassword = {
    valid: true,
    formValues: { password: "", repeatPW: "" },
    errs: { password: "", repeatPW: "" }
  },
  action
) => {
  switch (action.type) {
    case "setUserRestPasswordFormValues":
      return {
        ...userRestPassword,
        formValues: { ...userRestPassword.formValues, ...action.payload }
      };
    case "setUserRestPasswordValidation":
      return { ...userRestPassword, ...action.payload };
    case "setUserRestPasswordErrs":
      return {
        ...userRestPassword,
        errs: { ...userRestPassword.errs, ...action.payload }
      };

    case "resetUserRestPassword":
      return {
        ...userRestPassword,
        formValues: { password: "", repeatPW: "" },
        errs: { password: "", repeatPW: "" }
      };
    default:
      return userRestPassword;
  }
};
