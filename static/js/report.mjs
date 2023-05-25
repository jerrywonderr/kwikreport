$(document).ready(() => {
  let report = defaultReport;
  let addColumnModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addReportModal'));
  // let addRowModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('addNewReportRowModal'));

  setupColumnsDiv(report.columns);
  setupReportTable(report.columns, report.rows); // Setup table on load

  $('.modal-add-report-column').on('click', () => {
    const columnField = document.getElementById("report-column");
    if (!columnField.reportValidity()) {
      return;
    }
    const columnName = $(columnField).val();
    if (report.columns.includes(columnName)) {
      return;
    }
    report.columns.push(columnName);
    updateColumnsDiv(columnName);
    updateReportTableHeader(columnName);
    addColumnModal.hide(); // Hide the modal
    $(columnField).val(''); // Clear the field's content
  });

  $('.modal-add-report-row').on('click', () => {
    const form = document.querySelector('#addNewReportRowModal form');
    if (!form.reportValidity()) {
      return;
    }
    console.log($(form).serializeArray());
    const row = $(form).serializeArray();
    report.rows.push(row);
    updateReportTableRow(row, report.rows.length - 1, report.columns);
  });

  // Generate or regenrate form on button click
  $('.modal-generate-form').on('click', () => generateFormContent(report.columns));
});

const defaultReport = {
  title: '',
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
  div.append(`<p>${columnName}</p>`);
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

  columns = columns.map(value => value.replace(' ', '_'));

  Object.entries(row).map((value) => {
    let entry = '(nil)'
    if (columns.includes(value[0]) && value[1]) {
      entry = value[1]
    }
    htmlString += `<td>${entry}</td>`;
  });
  htmlString += '</tr>';

  body.append(htmlString);
}
