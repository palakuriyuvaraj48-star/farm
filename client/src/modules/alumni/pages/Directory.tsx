import { useState } from 'react';
import { ActionButton } from '@/components/shared/ActionButton';

export default function Directory() {
  const [search, setSearch] = useState('');

  const alumniList = [
    { id: 1, name: 'Alice Walker', batch: '2020', branch: 'Computer Science', company: 'Google', role: 'Senior Engineer' },
    { id: 2, name: 'Bob Smith', batch: '2018', branch: 'Mechanical Eng.', company: 'Tesla', role: 'Design Lead' },
    { id: 3, name: 'Charlie Davis', batch: '2022', branch: 'Electrical Eng.', company: 'Intel', role: 'Hardware Engineer' },
  ];

  const filtered = alumniList.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Alumni Directory</h2>
      <div className="flex space-x-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by name or company..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
        />
        <ActionButton className="bg-amber-600 hover:bg-amber-700 border-none">Search</ActionButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(alumni => (
          <div key={alumni.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              {alumni.name.charAt(0)}
            </div>
            <h3 className="font-bold text-lg text-gray-900">{alumni.name}</h3>
            <p className="text-gray-500 text-sm mb-2">Class of {alumni.batch} • {alumni.branch}</p>
            <div className="bg-gray-50 p-3 rounded text-sm mb-4">
              <p className="font-semibold text-gray-800">{alumni.role}</p>
              <p className="text-gray-600">@ {alumni.company}</p>
            </div>
            <ActionButton variant="outline" className="w-full">Connect</ActionButton>
          </div>
        ))}
      </div>
    </div>
  );
}
