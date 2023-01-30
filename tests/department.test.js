const Department = require("../model/Department");

describe("Department class", () => {
  it("should generate an incidence object of Department class", () => {
    const name = "IT";
    const output = new Department(name);
    const expectedEmployeeIncidence = {
      name,
    };
    expect(output).toEqual(expectedEmployeeIncidence);
  });
});
