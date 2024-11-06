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
    // Expresión regular para validar que el teléfono tenga de 7 a 8 dígitos
    const regex = /^\d{7,8}$/;

    // Verificar que el teléfono cumple con la expresión regular
    return regex.test(telefono);
};


export const validateNombreServicio = (nombre: string): boolean => {
  // Permitir cualquier carácter, incluyendo letras y signos
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\S]+$/; // \s permite espacios y \S permite cualquier carácter no espacio

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
// src/Components/validations/Validations.ts

export const validateCodigoServicio = (codigo: string): boolean => {
  // Verificar que el código no contenga espacios
  const regex = /^\S+$/; // Asegura que no haya espacios en blanco
  return regex.test(codigo);
};

