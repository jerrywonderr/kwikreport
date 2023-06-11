'use strict';

import { displayToast, getReport } from "./helpers/index.mjs";
import { setupReportTable } from "./helpers/reports.mjs";

$(document).ready(async () => {
  let report;
  const report_id = $('.active-report').text();
  const query = await getReport(report_id);

  if (!query) {
    displayToast('An error occured, please try again.')
    return ;
  }

  report = query.response;

  setupReportTable(report.columns, report.rows); // Setup table on load
});
