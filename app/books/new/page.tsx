'use client';

import { useState, useEffect } from 'react';
import { createBook } from '@/services/bookService';
import { getAuthors } from '@/services/authorService';
import { useRouter } from 'next/navigation';
import { Author } from '@/types/Author'

export default function NewBookPage() {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBook(title, authorId);
    router.push('/books');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <select
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
