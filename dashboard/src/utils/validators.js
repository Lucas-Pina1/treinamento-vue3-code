export function validateEmptyAndLength3 (value) {
  if (!value) {
    return 'Esse campo é obrigatorio'
  }

  if (value.length < 3) {
    return 'Esse campo precisa de no minimo 3 caracteres'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  const isValidEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!value) {
    return 'Esse campo é obrigatorio'
  }

  if (!isValidEmail) {
    return '*Este campo precisa ser um e-mail'
  }

  return true
}
