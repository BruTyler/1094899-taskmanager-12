/* eslint-disable no-undef */
/* eslint-disable new-cap */
Feature(`Smoke Test`);

const END_POINT = `http://localhost:8082`;

Scenario(`Just open taskmanager `, (I) => {
  I.wait(1);
  I.amOnPage(END_POINT);
  I.see(`TASKMANAGER`);
});
