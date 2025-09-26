'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast"

import { Author } from '@/types/Author';
import { getAuthors, deleteAuthor } from '@/services/authorService';
import ConfirmDialog from '@/components/modal/ConfirmDialog';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAuthors();
      setAuthors(data);
    };
    fetchAuthors();
  }, []);

  const handleDelete = (author: Author) => {
    setSelectedAuthor(author);
    setOpen(true);
  };

  const confirmDelete = async () => {
    await deleteAuthor(selectedAuthor!.id);
    setAuthors(authors.filter((author) => author.id !== selectedAuthor!.id));

    setOpen(false);
    toast.success(`Author(${selectedAuthor?.name}) is deleted`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <Link href="/authors/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create Author
      </Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td className="border px-4 py-2 text-center">{author.name}</td>
              <td className="border px-4 py-2 text-center">
                <Link href={`/authors/edit/${author.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(author)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {
            !authors.length && (
              <tr>
                <td className="border py-4 text-center" colSpan={3}>No data</td>
              </tr>
            )
          }
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={open}
        handleClose={() => setOpen(false)}
        confirmMsg={`Are you sure to delete this author (${selectedAuthor?.name})`}
        confirmRef={confirmRef}
        handleConfirm={confirmDelete}
      />
    </div>
  );
}
