const Employee = require("../model/Employee");

describe("Employee class", () => {
  it("should generate an incidence object of Employee class", () => {
    const first_name = "annie";
    const last_name = "la";
    const output = new Employee(first_name, last_name);
    const expectedEmployeeIncidence = {
      first_name,
      last_name,
    };
    expect(output).toEqual(expectedEmployeeIncidence);
  });
});
