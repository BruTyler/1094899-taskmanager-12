/* eslint-disable no-undef */
/* eslint-disable new-cap */
Feature(`Task edit`);

const END_POINT = `http://localhost:8082`;

Scenario(`Edit description`, (I) => {
  I.amOnPage(END_POINT);
  I.seeElement(`.card`);
  I.click(`edit`);
  I.fillField(`text`, `hello e2e`);
  I.click(`save`);
  I.see(`hello e2e`, `.card__text`);
  I.click(`edit`);
  I.fillField(`text`, `bye e2e`);
  I.click(`save`);
  I.see(`bye e2e`, `.card__text`);
});

