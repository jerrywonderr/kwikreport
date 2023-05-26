'use strict';

const defaultReport = {
  title: 'New Report',
  columns: [
    'project name',
    'report number',
    'drawing number',
    'spool number',
    'joint number',
    'part description',
    'thickness',
    'welder ID',
    'WPS Number',
    'visual inspection status',
    'NDE required'
  ],
  rows: [],
};

let report = defaultReport;
let addColumnModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addReportModal'));
let addRowModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addNewReportRowModal'));
let updateTitleTimeout;

$(document).ready(() => {

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
});

const updateTitle = (title) => {
  /**
   * Updates the report title in view
   */
  $('.add-report-container .report-title').text(title);
}

const setUpTitleSection = (title) => {
  /**
   * Simply updates the title element with the report title
   * and sets the value of the input field for editing the title to the report title
   */
  $('.update-report-title-field').val(title);
  $('.update-report-title-field').hide(title);
  updateTitle(title);
}

const toggleTitleSection = () => {
  /**
   * This function hides the title and shows the report title form instead
   */
  $('.report-title-container').toggle();
  $('.update-report-title-field').toggle();
}

const showChangeTitleForm = () => {
  /**
   * This function toggles the form and title text
   * and also sets a timeout to toggle it back after
   */
  toggleTitleSection()
  updateTitleTimeout = setTimeout(toggleTitleSection, 3000);
}

const getReport = async (id) => {
  const query = await fetch('/report');
  if (!query.ok) {
    return defaultReport;
  }
  return await query.json();
};

const updateColumnsDiv = (columnName) => {
  /**
   * Updates the column div i.e the div that shows the columns available in the report
   */
  const div = $('.add-report-container .columns-container');
  div.append(`<p class="d-flex align-items-center gap-3 report-name">${columnName}<button
  type="button"
  class="btn-close"
  data-bs-dismiss="modal"
  aria-label="Close"
></button</p>`);
}

const setupColumnsDiv = (columns) => {
  /**
   * Sets up the column div i.e the div that shows the columns available in the report
   */
  columns.map(value => updateColumnsDiv(value));
}

const generateFormContent = (columns) => {
  /**
   * Regenerates the form for adding reports
   */
  const form = $('#addNewReportRowModal form');
  let htmlString = '';
  columns.map((value) => {
    const parsedName = value.replace(' ', '_')
    htmlString += `
    <div class="form-group mb-3">
      <label for="id-${parsedName}">${value}</label>
      <input
        type="text"
        name="${parsedName}"
        id="id-${parsedName}"
        class="form-control"
      />
    </div>
    `
  });
  form.html(htmlString);
}

const setupReportTable = (columns, rows) => {
  /**
   * Sets up the table that shows the rows in the report
   */
  updateReportTableHeader('#');
  columns.map((value) => {
    updateReportTableHeader(value);
  });

  rows.map((row, index) => {
    updateReportTableRow(row, index, columns);
  });
}

const updateReportTableHeader = (columnName) => {
  /**
   * Simply adds columnName to the report table header
   */
  const head = $('.reports-view-container thead tr');
  head.append(`<th>${columnName}</th>`);
}

const updateReportTableRow = (row, index, columns) => {
  /**
   * Updates the row table row, adds 'row' to it
   */
  const body = $('.reports-view-container tbody');
  let htmlString = `<tr><td>${index}</td>`;

  // columns = columns.map(value => value.replace(' ', '_'));

  row.map((field) => {
    let entry = field.value ? field.value : '(nil)';
    htmlString += `<td>${entry}</td>`;
  });
  htmlString += '</tr>';

  body.append(htmlString);
}
