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
    default:
      return userRestPassword;
  }
};
