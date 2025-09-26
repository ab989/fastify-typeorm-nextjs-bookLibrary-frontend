'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Book } from '@/types/Book'
import { getBooks, deleteBook } from '@/services/bookService';
import ConfirmDialog from '@/components/modal/ConfirmDialog';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState('');
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleDelete = (id: string) => {
    setSelectedBookId(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    await deleteBook(selectedBookId);
    setBooks(books.filter((book) => book.id !== selectedBookId));

    setOpen(false);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link href="/books/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create Book
      </Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.author.name}</td>
              <td className="border px-4 py-2">
                <Link href={`/books/edit/${book.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        isOpen={open}
        handleClose={() => setOpen(false)}
        confirmMsg="Are you sure to delete this Book"
        confirmRef={confirmRef}
        handleConfirm={confirmDelete}
      />
    </div>
  );
}
