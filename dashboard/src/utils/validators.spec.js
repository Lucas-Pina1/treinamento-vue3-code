import { validateEmptyAndEmail, validateEmptyAndLength3 } from "./validators";

describe("Validators util", () => {
  // validateEmptyAndLength3
  it("should give an error with empty payload", () => {
    expect(validateEmptyAndLength3()).toBe("Esse campo é obrigatorio");
  });

  it("should give an error with less then 3 character payload", () => {
    expect(
      validateEmptyAndLength3("12").toBe(
        "Esse campo precisa de no minimo 3 caracteres"
      )
    );
  });

  it("should returns true when input pass a correcr param", () => {
    expect(validateEmptyAndLength3("1234")).toBe(true);
  });

  // validateEmptyAndEmail
  it("should give an error with empty payload", () => {
    expect(validateEmptyAndEmail()).toBe("Esse campo é obrigatorio");
  });

  it("should give an error a invalid param(email)", () => {
    expect(validateEmptyAndEmail("myemail@")).toBe(
      "*Este campo precisa ser um e-mail"
    );
  });

  it("should returns true when input be a correct param(email)", () => {
    expect(validateEmptyAndEmail("myemail@gmail.com")).toBe(true);
  });
});
