'use strict';

import { displayToast, getReport, makeReportPrivate, makeReportPublic, saveReport } from "./helpers/index.mjs";
import {
  generateFormContent,
  setUpTitleSection,
  setupColumnsDiv,
  setupReportTable,
  showChangeTitleForm,
  toggleTitleSection,
  updateColumnsDiv,
  updateReportTableHeader,
  updateReportTableRow,
  updateTitle
} from "./helpers/reports.mjs";

let report;
let addColumnModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addReportModal'));
let addRowModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addNewReportRowModal'));
let updateTitleTimeout;

$(document).ready(async () => {
  const report_id = $('.active-report').text();
  const query = await getReport(report_id);

  if (!query) {
    displayToast('An error occured, please try again.')
    return ;
  }

  report = query.response;

  setUpTitleSection(report.title); // Update title on load
  setupColumnsDiv(report.columns);
  setupReportTable(report.columns, report.rows); // Setup table on load

  $('.modal-add-report-column').on('click', () => {
    const columnField = $("#report-column"); // This is in the modal for add report column
    if (!columnField[0].reportValidity()) {
      return;
    }
    const columnName = columnField.val();
    if (report.columns.includes(columnName)) {
      displayToast('An error occured, please try again.')
      return;
    }
    report.columns.push(columnName);
    updateColumnsDiv(columnName);
    updateReportTableHeader(columnName);
    addColumnModal.hide(); // Hide the modal
    columnField.val(''); // Clear the field's content
  });

  $('.modal-add-report-row').on('click', () => {
    const form = $('#addNewReportRowModal form');
    if (!form[0].reportValidity()) {
      return;
    }

    const row = form.serializeArray();
    report.rows.push(row);
    updateReportTableRow(row, report.rows.length - 1, report.columns);
    form[0].reset();
    addRowModal.hide(); // Hide the modal
  });

  // Generate or regenrate form on button click
  $('.modal-generate-form').on('click', () => generateFormContent(report.columns));

  /* HANDLE CHANGING THE TITLE */
  $(".change-report-title-btn").on('click', showChangeTitleForm);

  $(".update-report-title-field").on('input', () => {
    const title = $('.update-report-title-field').val();
    if (title) {
      report.title = title;
      if (updateTitleTimeout) {
        clearTimeout(updateTitleTimeout);
      }
      updateTitleTimeout = setTimeout(() => {
        updateTitle(report.title);
        toggleTitleSection();
      }, 1500);
    }
  });
  /* END OF HANDLE CHANGING THE TITLE */

  /* SAVE THE REPORT */
  $('.save-report-btn').on('click', async () => {
    const query= await saveReport(report);
    if (query) {
      displayToast('Report saved successfully!');
    }
  });

  /* MAKE REPORT PUBLIC */
  $('.make-report-public').on('click', async () => {
    console.log("making public");
    const query= await makeReportPublic(report_id);
    if (query) {
      displayToast('Report status updated!');
    }
  });

  /* MAKE REPORT PRIVATE */
  $('.make-report-private').on('click', async () => {
    console.log("making private");
    const query= await makeReportPrivate(report_id);
    if (query) {
      displayToast('Report status updated!');
    }
  });
});
