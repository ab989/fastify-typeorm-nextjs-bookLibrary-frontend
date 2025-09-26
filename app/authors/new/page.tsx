'use client';

import toast from "react-hot-toast"

import { createAuthor } from '@/services/authorService';
import { useRouter } from 'next/navigation';
import AuthorForm, { AuthorFormValues } from '@/components/forms/AuthorForm';

export default function NewAuthorPage() {
  const router = useRouter();

  const handleSubmit = async (values: AuthorFormValues) => {
    await createAuthor(values.name);
    router.push('/authors');

    toast.success(`Author(${values.name}) is created`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Author</h1>
      <AuthorForm
        onSubmit={handleSubmit}
        submitLabel='Create'
      />
    </div>
  );
}
