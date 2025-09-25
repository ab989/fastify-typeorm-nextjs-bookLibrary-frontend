import React, { useState, FormEvent, useEffect } from "react";
import { Author } from '@/types/Author'

export interface BookFormValues {
  title: string;
  authorId: string;
}

interface BookFormProps {
  /** Initial values for the form (useful for editing) */
  initialValues?: BookFormValues;
  /** Called when the form is submitted */
  onSubmit: (values: BookFormValues) => void;
  /** Optional label for the submit button */
  submitLabel?: string;
  /** Optional list of authors for dropdown */
  authors?: Author[];
}

const defaultBookValues: BookFormValues = { title: "", authorId: "" };

const BookForm: React.FC<BookFormProps> = ({
  initialValues = defaultBookValues,
  onSubmit,
  submitLabel = "Save",
  authors
}) => {
  const [values, setValues] = useState<BookFormValues>(initialValues);

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          { authors && authors.length > 0 && (
            <select
              id="author"
              name="authorId"
              value={values.authorId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          )}
        </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default BookForm;