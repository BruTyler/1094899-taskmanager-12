import {convertRepeatingToMask, convertRepeatingToDays, reduceDaysToMask} from '../../utils/bitmap';
import {RepeatingDaysMap} from '../../const';

describe(`convertRepeatingToMask suit`, () => {
  it(`convertRepeatingToMask should return zero mask-value to non-repeating days`, () => {
    const repeatingDays = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

    const repeatingDaysMask = convertRepeatingToMask(repeatingDays);

    expect(repeatingDaysMask).toEqual(0);
  });

  it(`convertRepeatingToMask should return MAX mask-value to every repeating day`, () => {
    const repeatingDays = {
      mo: true,
      tu: true,
      we: true,
      th: true,
      fr: true,
      sa: true,
      su: true
    };

    const repeatingDaysMask = convertRepeatingToMask(repeatingDays);
    const expectedDaysMask = 1 + 2 + 4 + 8 + 16 + 32 + 64;

    expect(repeatingDaysMask).toEqual(expectedDaysMask);
  });
});


describe(`convertRepeatingToDays suit`, () => {
  it(`convertRepeatingToDays should return non-repeating days to zero mask-value`, () => {
    const repeatingMask = 0;
    const originalRepeatingDays = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

    const calculatedRepeatingDays = convertRepeatingToDays(repeatingMask);

    expect(calculatedRepeatingDays).toEqual(originalRepeatingDays);
  });

  it(`convertRepeatingDaysToMask should return every repeating day to MAX mask-value`, () => {
    const repeatingMask = 1 + 2 + 4 + 8 + 16 + 32 + 64;
    const originalRepeatingDays = {
      mo: true,
      tu: true,
      we: true,
      th: true,
      fr: true,
      sa: true,
      su: true
    };

    const calculatedRepeatingDays = convertRepeatingToDays(repeatingMask);

    expect(calculatedRepeatingDays).toEqual(originalRepeatingDays);
  });
});

describe(`reduceDaysToMask suit`, () => {
  it(`reduceDaysToMask should convert array of selected days to mask-value`, () => {
    const selectedDays = [`mo`, `su`];
    const correctMask = RepeatingDaysMap.mo + RepeatingDaysMap.su;

    const mask = reduceDaysToMask(selectedDays);

    expect(mask).toEqual(correctMask);
  });
});

