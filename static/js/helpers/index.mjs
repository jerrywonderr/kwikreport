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
  const data = { response: defaultReport }
  if (id) {
    const query = await fetch('/report');
    if (!query.ok) {
      return null;
    }

    data.response = await query.json();
  }
  return data;
};

export const saveReport = async (report) => {
  const query = await fetch('/report/', {
    method: 'POST',
    body: JSON.stringify(report),
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
    },
  });
  if (!query.ok) {
    return null;
  }
  return { response: await query.json() };
};


export const displayToast = (message) => {
  CONSTANTS.TOAST_COUNT += 1;
  const uniqueClassID = `toast-${CONSTANTS.TOAST_COUNT}`;
  const toastContainer = $('.base-toast-container');
  const htmlString = `
  <div class="toast ${uniqueClassID}" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">
      <div>
        <p>${message}</p>
      </div>
    </div>
  </div>
  `;
  toastContainer.append(htmlString);

  // Display the toast
  const toast = bootstrap.Toast.getOrCreateInstance($(`.${uniqueClassID}`));
  toast.show();
}
