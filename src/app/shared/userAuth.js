export default () => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));

  let result = {
    cups_report: false,
    tables_report: false,
    customer_report: false,
    export_report: false,
  };

  if (user) {
    result = {
      cups_report: parseInt(user.cups_report) === 0,
      tables_report: parseInt(user.tables_report) === 0,
      customer_report: parseInt(user.customer_report) === 0,
      export_report: parseInt(user.export_report) === 0,
      user_type: user.user_type,
    };
  }
  return result;
};
