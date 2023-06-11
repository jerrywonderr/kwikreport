'use strict'

$(document).ready(() => {
  const currentNav = $('.current-nav')?.text();
  console.log(currentNav);
  if (currentNav) {
    // Remove active class from active nav
    $('.nav-content .nav-item.active').removeClass('active');
    // Add class to the current nav item
    $(`.nav-content .${currentNav}`).addClass('active')
  }
});
