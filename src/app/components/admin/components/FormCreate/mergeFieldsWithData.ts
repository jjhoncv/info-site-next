import { Field } from "./types/fileManagement";

export const mergeFieldsWithData = (fields: Field[], data: any): Field[] => {
  return fields.map((field) => {
    // Verificar si existe el valor en los datos
    if (data.hasOwnProperty(field.key)) {
      // Crear una copia del field para no mutar el original
      const updatedField = { ...field };

      // Asignar el valor según el tipo de campo
      if (field.type === "file") {
        // Para campos de tipo file, asignar la URL de la imagen

        if (data[field.key] !== "") {
          if (Array.isArray(data[field.key])) {
            updatedField.value = data[field.key];
          } else {
            updatedField.value = [data[field.key]];
          }
        }
      } else {
        // Para otros tipos de campos, asignar el valor directamente
        updatedField.value = data[field.key];
      }

      return updatedField;
    }

    // Si no existe el valor en los datos, devolver el field sin modificar
    return field;
  });
};
