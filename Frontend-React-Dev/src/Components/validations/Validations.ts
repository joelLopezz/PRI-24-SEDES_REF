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

export const validateNombreServicio = (nombre: string): string | null => {
  
  // Permitir cualquier carácter, incluyendo letras y signos
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\S]+$/; // \s permite espacios y \S permite cualquier carácter no espacio

  // Verificar que no empiece con espacios
  if (nombre.trimStart() !== nombre) {
      return null;
  }

  // Verificar que no haya más de un espacio entre palabras
  if (/\s{2,}/.test(nombre)) {
      return null;
  }
  if (!regex.test(nombre)) {
    return null; // Retorna null si el nombre no es válido
}
  // Capitalizar solo la primera letra y poner el resto en minúsculas
  const nombreCapitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

  // Verificar que el nombre cumple con las condiciones
  return nombreCapitalizado;
};

export const validateCodigoServicio = (codigo: string): string | null => {
  // Convertir a mayúsculas
  const codigoMayusculas = codigo.toUpperCase();

  // Expresión regular para permitir solo letras y números sin espacios ni caracteres especiales
  const regex = /^[A-Z0-9]+$/;

  // Verificar que el código cumple con las condiciones
  return regex.test(codigoMayusculas) ? codigoMayusculas : null;
};