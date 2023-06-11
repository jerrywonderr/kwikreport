export const updateTitle = (title) => {
  /**
   * Updates the report title in view
   */
  $('.add-report-container .report-title').text(title);
}

export const setUpTitleSection = (title) => {
  /**
   * Simply updates the title element with the report title
   * and sets the value of the input field for editing the title to the report title
   */
  $('.update-report-title-field').val(title);
  $('.update-report-title-field').hide(title);
  updateTitle(title);
}

export const toggleTitleSection = () => {
  /**
   * This function hides the title and shows the report title form instead
   */
  $('.report-title-container').toggle();
  $('.update-report-title-field').toggle();
}

export const showChangeTitleForm = () => {
  /**
   * This function toggles the form and title text
   * and also sets a timeout to toggle it back after
   */
  toggleTitleSection()
  updateTitleTimeout = setTimeout(toggleTitleSection, 3000);
}

export const updateColumnsDiv = (columnName) => {
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

export const setupColumnsDiv = (columns) => {
  /**
   * Sets up the column div i.e the div that shows the columns available in the report
   */
  columns.map(value => updateColumnsDiv(value));
}

export const generateFormContent = (columns) => {
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

export const setupReportTable = (columns, rows) => {
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

export const updateReportTableHeader = (columnName) => {
  /**
   * Simply adds columnName to the report table header
   */
  const head = $('.reports-view-container thead tr');
  head.append(`<th>${columnName}</th>`);
}

export const updateReportTableRow = (row, index, columns) => {
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
