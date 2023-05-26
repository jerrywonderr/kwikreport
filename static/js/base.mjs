import { CONSTANTS } from "./helpers/constants.mjs";

$(document).ready(() => {
  $('.dashboard-home .add-report-btn').on('click', () => {
    location.href = CONSTANTS.urlMappings.addReport;
  });
});
