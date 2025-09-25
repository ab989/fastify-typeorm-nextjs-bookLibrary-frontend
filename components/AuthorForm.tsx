import React, { useState, FormEvent, useEffect } from "react";

export interface AuthorFormValues {
  name: string;
}

interface AuthorFormProps {
  /** Initial values for the form (useful for editing) */
  initialValues?: AuthorFormValues;
  /** Called when the form is submitted */
  onSubmit: (values: AuthorFormValues) => void;
  /** Optional label for the submit button */
  submitLabel?: string;
}

const defaultAuthorValues: AuthorFormValues = { name: "" };

const AuthorForm: React.FC<AuthorFormProps> = ({
  initialValues = defaultAuthorValues,
  onSubmit,
  submitLabel = "Save",
}) => {
  const [values, setValues] = useState<AuthorFormValues>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {submitLabel}
      </button>
    </form>
  );
};

export default AuthorForm;