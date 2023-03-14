export function validateEmptyAddLength3(value) {
  if (!value) {
    return "Esse campo é obrigatorio";
  }

  if (value.length < 3) {
    return "Esse campo precisa de no minimo 3 caracteres";
  }

  return true;
}
