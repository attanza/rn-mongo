export default {
  required: "{{ field }} is required",
  email: "{{ field }} should be a valid email",
  min: "{{ field }} should be more than {{ argument.0 }} characters",
  max: "{{ field }} should not greater than {{ argument.0 }} characters",
  string: "{{ field }} should be a valid string format",
  number: "{{ field }} should be a valid number",
  boolean: "{{ field }} should be a true or false"
};
