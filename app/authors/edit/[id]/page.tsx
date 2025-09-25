'use client';

import { useEffect, useState } from 'react';
import { getAuthor, updateAuthor } from '@/services/authorService';
import { useRouter, useParams } from 'next/navigation';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAuthor(id, name);
    router.push('/authors');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Author</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
