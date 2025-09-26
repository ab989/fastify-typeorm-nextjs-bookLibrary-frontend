'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast"

import { Book } from '@/types/Book'
import { getBooks, deleteBook } from '@/services/bookService';
import ConfirmDialog from '@/components/modal/ConfirmDialog';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>();
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleDelete = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const confirmDelete = async () => {
    await deleteBook(selectedBook!.id);
    setBooks(books.filter((book) => book.id !== selectedBook!.id));

    setOpen(false);
    toast.success(`Book(${selectedBook?.title}) is deleted`);
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
              <td className="border px-4 py-2 text-center">{book.title}</td>
              <td className="border px-4 py-2 text-center">{book.author.name}</td>
              <td className="border px-4 py-2 text-center">
                <Link href={`/books/edit/${book.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </Link>
                <button onClick={() => handleDelete(book)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {
            !books.length && (
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
        confirmMsg={`Are you sure to delete this book (${selectedBook?.title})`}
        confirmRef={confirmRef}
        handleConfirm={confirmDelete}
      />
    </div>
  );
}
