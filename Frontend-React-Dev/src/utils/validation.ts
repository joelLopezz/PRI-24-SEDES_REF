// utils/validation.ts

// Validación para campos requeridos
export const isRequired = (value: string): string | null => {
    return value.trim() === '' ? 'Este campo es obligatorio' : null;
  };
  
  // Validación para solo letras (permitiendo espacios)
  export const isAlphabetic = (value: string): string | null => {
    const alphabeticRegex = /^[A-Za-z\s]+$/;
    return !alphabeticRegex.test(value) ? 'Este campo solo debe contener letras' : null;
  };
  
  // Validación para correos electrónicos
  export const isEmailValid = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email) ? 'El correo electrónico no es válido' : null;
  };
  
  // Validación para contraseñas
  export const isPasswordValid = (password: string): string | null => {
    return password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : null;
  };
  
  // Validación para números
  export const isNumber = (value: string): string | null => {
    return isNaN(Number(value)) ? 'Este campo debe ser un número' : null;
  };
  
  // Validación para longitud mínima
  export const minLength = (value: string, length: number): string | null => {
    return value.length < length ? `Debe tener al menos ${length} caracteres` : null;
  };
  
  // Validación para un rango de números
  export const isNumberInRange = (value: string, min: number, max: number): string | null => {
    const num = Number(value);
    if (isNaN(num)) return 'Este campo debe ser un número';
    if (num < min || num > max) return `Debe estar entre ${min} y ${max}`;
    return null;
  };
  
  // Validación para números romanos
  export const isRomanNumeral = (value: string): string | null => {
    const romanRegex = /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/i;
    return !romanRegex.test(value) ? 'Este campo debe contener un número romano válido' : null;
  };
  
  // Validación para evitar espacios al inicio
  export const removeLeadingSpaces = (value: string): string => {
    return value.replace(/^\s+/, ''); // Elimina todos los espacios al inicio
  };
  export const hasLeadingSpaces = (value: string) => {
    return /^\s/.test(value);
  };
  
  // Exporta todas las funciones de validación en un solo objeto
  export default {
    isRequired,
    isAlphabetic,
    isEmailValid,
    isPasswordValid,
    isNumber,
    minLength,
    isNumberInRange,
    isRomanNumeral,
    removeLeadingSpaces,
    hasLeadingSpaces,
  };
  