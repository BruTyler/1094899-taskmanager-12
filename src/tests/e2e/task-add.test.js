/* eslint-disable no-undef */
/* eslint-disable new-cap */
Feature(`Task creation`);

const END_POINT = `http://localhost:8082`;

Scenario(`Add task`, (I) => {
  I.amOnPage(END_POINT);
  I.see(`+ ADD NEW TASK`);
  I.dontSee(`hello e2e add`, `.card__text`);

  I.click(`+ ADD NEW TASK`);
  I.fillField(`text`, `hello e2e add`);
  I.click(`save`);
  I.see(`hello e2e add`, `.card__text`);
});

// Scenario(`Delete task`, (I) => {
//   I.amOnPage(END_POINT);
//   I.see(`hello e2e add`, `.card__text`);

//   I.click(`edit`);
//   I.click(`delete`);
//   I.dontSee(`hello e2e add`, `.card__text`);
// });

