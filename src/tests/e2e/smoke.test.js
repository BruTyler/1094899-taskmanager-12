/* eslint-disable no-undef */
/* eslint-disable new-cap */
Feature(`Smoke Test`);

const END_POINT = `http://localhost:8082`;

Scenario(`Just open taskmanager `, (I) => {
  I.amOnPage(END_POINT);
  I.waitForText(`TASKMANAGER`, 2);
});
