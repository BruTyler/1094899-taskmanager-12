/* eslint-disable no-undef */
/* eslint-disable new-cap */
Feature(`Task edit`);

const END_POINT = `http://localhost:8082`;

Scenario(`Edit description`, (I) => {
  I.amOnPage(END_POINT);
  I.waitForElement(`.card`, 5);
  I.click(`edit`);
  I.fillField(`text`, `hello e2e`);
  I.click(`save`);
  I.waitForText(`hello e2e`, 5, `.card__text`);
  I.click(`edit`);
  I.fillField(`text`, `bye e2e`);
  I.click(`save`);
  I.waitForText(`bye e2e`, 5, `.card__text`);
});

