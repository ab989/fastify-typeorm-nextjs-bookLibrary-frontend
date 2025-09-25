'use client';

import { useEffect, useState } from 'react';
import { getBook, updateBook } from '@/services/bookService';
import { getAuthors } from '@/services/authorService';
import { useRouter, useParams } from 'next/navigation';
import { Author } from '@/types/Author';
import BookForm, { BookFormValues } from '@/components/BookForm';

export default function EditBookPage() {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBook(id);
      setTitle(book.title);
      setAuthorId(book.author.id);
    };

    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
    };

    if (id) {
      fetchBook();
      fetchAuthors();
    }
  }, [id]);

  const handleSubmit = async (values: BookFormValues) => {
    await updateBook(id, values.title, values.authorId);
    router.push('/books');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <BookForm
        initialValues={{ title, authorId }}
        onSubmit={handleSubmit}
        authors={authors}
        submitLabel='Update'
      />
    </div>
  );
}
