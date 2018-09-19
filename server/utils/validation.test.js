const expect = require("expect");

const { isRealString } = require("./validation");

//const { app } = require("./../server");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    let res = isRealString(98);
    expect(res).toBe(false);
  });

  it("should reject non-string values", () => {
    let res = isRealString("           ");
    expect(res).toBe(false);
  });
  it("should reject non-string values", () => {
    let res = isRealString(" TEstRoom ");
    expect(res).toBe(true);
  });
});
