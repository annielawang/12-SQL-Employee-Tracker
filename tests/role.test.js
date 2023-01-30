const Role = require("../model/Role");

describe("Role class", () => {
  it("should generate an incidence object of Role class", () => {
    const title = "software engineer";
    const salary = 100000;
    const output = new Role(title, salary);
    const expectedEmployeeIncidence = {
      title,
      salary,
    };
    expect(output).toEqual(expectedEmployeeIncidence);
  });
});
