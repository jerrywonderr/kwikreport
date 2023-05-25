import { CONSTANTS } from "./helpers/constants.mjs";

$(document).ready(() => {
  $('.dashboard-home .add-report-btn').on('click', () => {
    console.log("good");
    location.href = CONSTANTS.urlMappings.addReport;
  });
});
