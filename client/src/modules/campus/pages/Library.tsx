import { useState } from 'react';
import { ActionButton } from '@/components/shared/ActionButton';

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262033848', status: 'Available' },
    { id: '2', title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', status: 'Issued' },
    { id: '3', title: 'Design Patterns', author: 'Erich Gamma', isbn: '9780201633610', status: 'Available' },
    { id: '4', title: 'Operating System Concepts', author: 'Abraham Silberschatz', isbn: '9781118063330', status: 'Issued' },
  ];

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Library Catalog Search</h2>
        <div className="flex space-x-4 mb-8">
          <input 
            type="text" 
            placeholder="Search books by title or author..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
          <ActionButton>Search</ActionButton>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {book.status === 'Available' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Issued</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {book.status === 'Available' ? (
                      <button className="text-primary hover:text-blue-900">Request Issue</button>
                    ) : (
                      <button className="text-gray-400 cursor-not-allowed" disabled>Notify Return</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">My Issued Books</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-bold text-gray-900">Clean Code</p>
              <p className="text-sm text-gray-500">Issued on: 2026-08-01</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-red-600">Due: 2026-08-15</p>
              <button className="text-sm text-primary hover:underline mt-1">Renew</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
