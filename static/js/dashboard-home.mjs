import { CONSTANTS } from "./helpers/constants.mjs";
import { displayToast, dropReport, getAllReports, getReport } from "./helpers/index.mjs";

let reports;

$(document).ready(async () => {
  // Load all report into container on page load
  ({ response: reports } = await getAllReports());

  loadReportCardContainer(reports);

  $('.report-cards-container .report-card .delete-icon').on('click', (ev) => deleteHandler(ev));

  $('.dashboard-home .add-report-btn').on('click', async () => {
    // location.href = CONSTANTS.urlMappings.addReport;
    const query = await getReport();
    if (!query) {
      displayToast('An error occured, please try again.')
      return;
    }
    reports.push(query.response);
    appendReportCard(query.response, reports.length);
  });
});

const loadReportCardContainer = (reports) => {
  /**
   * Simply loads all report into the report card container
   */
  reports.forEach((report, index) => appendReportCard(report, index));
}

const appendReportCard = (report, index) => {
  /**
   * Creates the report card and appends it to the report card container
   */
  const htmlString = `
  <div class="card report-card report-card-${index}">
          <div class="row g-0">
            <div class="col-4">
              <img
                src="/static/images/report-placeholder.png"
                class="img-fluid rounded-start"
                alt="${report.title} report on kwikreport"
              />
            </div>
            <div class="col-8">
              <div class="card-body h-100 d-flex flex-column">
                <div >
                  <h5 class="text-truncate card-title">${report.title}</h5>
                </div>
                <div class="mt-auto d-flex align-items-center gap-3">
                  <a href="${CONSTANTS.urlMappings.editReport}${report.id}/" class="report-edit-link">Edit</a>
                  <img class="delete-icon" data-report-id="${report.id}" data-report-index="${index}" src="/static/images/trash.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
  `
  $('.report-cards-container').append(htmlString);
}

const deleteHandler = async (ev) => {
  const btn = $(ev.target);
  const reportID = btn.attr('data-report-id');
  const reportIndex = Number(btn.attr('data-report-index'));
  const { response } = await dropReport(reportID);
  if (response) {
    displayToast('Report deleted successfully!');
    reports.splice(reportIndex, 1);
    $(`.report-card-${reportIndex}`).remove();

  }
}
