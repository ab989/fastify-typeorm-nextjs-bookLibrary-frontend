import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold">Moneturn</Link>
        <div>
          <Link href="/authors" className="text-gray-300 hover:text-white mr-4">Authors</Link>
          <Link href="/books" className="text-gray-300 hover:text-white">Books</Link>
        </div>
      </div>
    </nav>
  )
}