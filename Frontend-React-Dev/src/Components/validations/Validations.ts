// src/Components/validations/Validations.ts

export const validateNombre = (nombre: string): boolean => {
    // Verificar que no contenga números ni signos
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)* ?$/;
  
    // Verificar que no empiece con espacios
    if (nombre.trimStart() !== nombre) {
      return false;
    }
  
    // Verificar que no haya más de un espacio entre palabras
    if (/\s{2,}/.test(nombre)) {
      return false;
    }
  
    // Verificar que el nombre cumple con las condiciones
    return regex.test(nombre);
  };
  
  export const validateTelefono = (telefono: string): boolean => {
    // Verificar que el teléfono no comience con espacios y solo contenga números
    const regex = /^[0-9]*$/; // Permite solo dígitos
    return regex.test(telefono) && telefono.trimStart() === telefono;
  };
// src/Components/validations/Validations.ts

export const validateCodigoServicio = (codigo: string): boolean => {
  // Verificar que el código no contenga espacios
  const regex = /^\S+$/; // Asegura que no haya espacios en blanco
  return regex.test(codigo);
};

export const validateNoStartingSpace = (input: string): boolean => {
  return input.trimStart() === input;
};

// Validación para el campo "codigo"
export const validateCodigo = (codigo: string): boolean => {
  const regex = /^[A-Za-z0-9]+$/; // Solo letras y números
  return regex.test(codigo) && codigo.trim() === codigo; // Sin espacios al inicio ni al final
};

// Validación para el campo "nombre"
export const validateNombreServicio = (nombre: string): boolean => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ(),.?!\s]+$/; // Permite letras, acentos, paréntesis y signos de puntuación
  return regex.test(nombre) && nombre.trimStart() === nombre && !/\s{2,}/.test(nombre); // Sin espacios al inicio y no más de uno entre palabras
};

// Validación para el campo "numeracion" (solo números, sin espacios al inicio ni al final)
export const validateNumeracion = (numeracion: string): boolean => {
  const regex = /^[0-9]+$/; // Solo números
  return regex.test(numeracion) && numeracion.trim() === numeracion;
};

// Conversión de números arábigos a romanos
export const toRoman = (num: number): string => {
  const romanNumerals: { [key: number]: string } = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I",
  };
  let roman = "";
  for (const value of Object.keys(romanNumerals).map(Number).sort((a, b) => b - a)) {
    while (num >= value) {
      roman += romanNumerals[value];
      num -= value;
    }
  }
  return roman;
};