/**
 *
 * @param str
 * @returns
 */
export const capitalizeString = (str: string): string => {
  if (!str) return "";

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
/**
 *
 * @param mark
 * @returns
 */
export const getMarkColor = (mark: number): string => {
  if (mark >= 8) return "green";
  if (mark >= 4) return "goldenrod";
  return "red";
};
/**
 * Convert Object To FormData
 * @param object source
 * @param formData default value
 * @param namespace key
 * @returns formData
 */
export const ConvertObjectToFormData = (
  object: any,
  formData = new FormData(),
  namespace: string | undefined = undefined
): FormData => {
  for (let property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    const formKey = namespace ? `${namespace}[${property}]` : property;
    if (object[property] instanceof Date) {
      formData.append(formKey, object[property].toISOString());
    } else if (
      typeof object[property] === "object" &&
      !(object[property] instanceof File)
    ) {
      ConvertObjectToFormData(object[property], formData, formKey);
    } else {
      formData.append(formKey, object[property]);
    }
  }
  return formData;
};
export function ToFormData(
  object: any,
  formData = new FormData(),
  namespace: string | undefined = undefined
): FormData {
  for (let property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }
    const formKey = namespace ? `${namespace}[${property}]` : property;
    if (object[property] instanceof Date) {
      formData.append(formKey, object[property].toISOString());
    } else if (
      typeof object[property] === "object" &&
      !(object[property] instanceof File)
    ) {
      ToFormData(object[property], formData, formKey);
    } else {
      formData.append(formKey, object[property]);
    }
  }
  return formData;
}
