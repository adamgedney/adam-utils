import { expect } from 'chai';
import * as adam from 'Src/index.js';
//import * as adam from 'Lib/index.min.js';

describe('The array_toCSV fn', () => it('should return a csv string', () =>
  expect(adam.array_toCSV(["hello", "world"])).to.equal("hello, world")
));

describe('The async_waitForVar fn', () => it('should callback when the input variable has a valid value', () => {
  let waitingForVar = undefined;

  setTimeout(function () { waitingForVar = "hello world" }, 1000);

  adam.async_waitForVar(() => waitingForVar, () => {
    expect(waitingForVar).to.equal("hello world");
  }, 1500, 250)
}));

describe('The date_humanToUTC fn', () => it('should return a utc timestamp from a human readable date', () =>
  expect(adam.date_humanToUTC("12/12/2018")).to.equal(1544590800000)
));

describe('The date_MMddYYYY fn', () => it('should return a human readable date from a timestamp', () =>
  expect(adam.date_MMddYYYY(1544590800000, "/")).to.equal("12/12/2018")
));

describe('The date_yyyymmdd fn', () => it('should return a human readable date from a timestamp', () =>
  expect(adam.date_yyyymmdd(1544590800000, "/")).to.equal("2018/12/12")
));

describe('The date_ddMonthyyTime fn', () => it('should return a human readable date from a timestamp', () =>
  expect(adam.date_ddMonthyyTime(1544590800)).to.equal("12 Dec 2018 0:0:0")
));