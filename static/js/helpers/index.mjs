import { CONSTANTS } from "./constants.mjs";

export const getCookie = (cookieName) => {
  /**
   * Gets a cookie from the cookie header
   */
  let name = `${cookieName}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const parseResponse = (idealResponse) => {
  const details = JSON.parse(idealResponse.fields.data);
  return { ...details, id: idealResponse.pk }
}

export const getReport = async (id) => {
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
  let data;
  if (id) {
    const query =
      await fetch(`${CONSTANTS.urlMappings.getReport}?id=${id}`)
        .catch(() => {
          // Do nothing
          console.log(err);
        });
    if (!query.ok) {
      return null;
    }
    data = await query.json();
  } else {
    return saveReport(defaultReport);
  }
  return { response: parseResponse(data[0]) }
};

export const getAllReports = async () => {
  let data;
  const query =
    await fetch(CONSTANTS.urlMappings.getReports)
      .catch(() => {
        // Do nothing
        console.log(err);
      });
  if (!query.ok) {
    return null;
  }
  data = await query.json();
  data = data.map(value => parseResponse(value));
  return { response: data }
};


export const saveReport = async (report) => {
  let data;
  const query = await fetch(CONSTANTS.urlMappings.saveReport, {
    method: 'POST',
    body: JSON.stringify(report),
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
  }).catch(() => {
    // Do nothing
    console.log(err);
  });
  if (!query.ok) {
    return null;
  }
  data = await query.json();
  data = parseResponse(data[0]);
  return { response: data };
};

export const dropReport = async (id) => {
  const query = await fetch(`${CONSTANTS.urlMappings.deleteReport}${id}/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
  }).catch(() => {
    // Do nothing
    console.log(err);
  });

  return { response: query.ok };
};


export const displayToast = (message) => {
  CONSTANTS.TOAST_COUNT += 1;
  const uniqueClassID = `toast-${CONSTANTS.TOAST_COUNT}`;
  const toastContainer = $('.base-toast-container');
  const htmlString = `
  <div class="toast ${uniqueClassID}" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body" style="background-color: var(--kwik-primary)">
      <div>
        <p class="m-0" style="color: var(--kwik-primary-light)">${message}</p>
      </div>
    </div>
  </div>
  `;
  toastContainer.append(htmlString);

  // Display the toast
  const toast = bootstrap.Toast.getOrCreateInstance($(`.${uniqueClassID}`));
  toast.show();
}
