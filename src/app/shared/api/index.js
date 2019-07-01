export const headers = () => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
  if (user) {
    return {
      headers: {
        Authorization: `Bearer ${user.access_token}`
      }
    };
  } else {
    return {};
  }
};
