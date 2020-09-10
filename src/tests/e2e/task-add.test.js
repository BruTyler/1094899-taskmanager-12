/* eslint-disable no-undef */
/* eslint-disable new-cap */
Feature(`Task creation`);

const END_POINT = `http://localhost:8082`;

Scenario(`Add task`, (I) => {
  I.amOnPage(END_POINT);
  I.waitForText(`+ ADD NEW TASK`, 5);
  I.dontSee(`hello e2e add`, `.card__text`);

  I.click(`+ ADD NEW TASK`);
  I.fillField(`text`, `hello e2e add`);
  I.click(`save`);
  I.waitForText(`hello e2e add`, 5, `.card__text`);
});

Scenario(`Delete task`, (I) => {
  I.amOnPage(END_POINT);
  I.waitForText(`hello e2e add`, 5, `.card__text`);

  I.click(`edit`);
  I.click(`delete`);
  I.wait(2);
  I.dontSee(`hello e2e add`, `.card__text`);
});

