'use client';

import { useState, useEffect } from 'react';
import { createBook } from '@/services/bookService';
import { getAuthors } from '@/services/authorService';
import { useRouter } from 'next/navigation';
import { Author } from '@/types/Author';
import BookForm, { BookFormValues } from '@/components/forms/BookForm';

export default function NewBookPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (values: BookFormValues) => {
    await createBook(values.title, values.authorId);
    router.push('/books');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Book</h1>
      <BookForm
        onSubmit={handleSubmit}
        authors={authors}
        submitLabel='Create'
      />
    </div>
  );
}
