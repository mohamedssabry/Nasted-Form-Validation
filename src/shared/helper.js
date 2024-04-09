export function appendToFormData(formData, data, parentKey = null) {
  if (data instanceof File) {
    formData.append(`${parentKey}`, data);
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const key = `${parentKey}[${index}]`;
      appendToFormData(formData, item, key);
    });
  } else if (typeof data === "object" && data !== null) {
    Object.keys(data).forEach((key) => {
      const nestedKey = parentKey ? `${parentKey}[${key}]` : key;
      appendToFormData(formData, data[key], nestedKey);
    });
  } else {
    formData.append(`${parentKey}`, data);
  }
}
