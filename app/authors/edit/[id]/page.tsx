'use client';

import { useEffect, useState } from 'react';
import toast from "react-hot-toast"

import { getAuthor, updateAuthor } from '@/services/authorService';
import { useRouter, useParams } from 'next/navigation';
import AuthorForm, { AuthorFormValues } from '@/components/forms/AuthorForm';

export default function EditAuthorPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchAuthor = async () => {
      const author = await getAuthor(id);
      setName(author.name);
    };
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const handleSubmit = async (values: AuthorFormValues) => {
    await updateAuthor(id, values.name);
    router.push('/authors');

    toast.success(`Author(${values.name}) is updated`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Author</h1>
      <AuthorForm
        initialValues={{ name }}
        onSubmit={handleSubmit}
        submitLabel='Update'
      />
    </div>
  );
}
