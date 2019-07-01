export const headers = {
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("aupos_online_report_user")).access_token
    }`
  }
};
