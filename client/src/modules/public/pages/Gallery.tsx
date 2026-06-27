export default function Gallery() {
  const photos = [
    { title: 'Main Campus Building', color: 'bg-blue-100' },
    { title: 'Central Library', color: 'bg-green-100' },
    { title: 'Research Laboratories', color: 'bg-purple-100' },
    { title: 'Student Hostel', color: 'bg-yellow-100' },
    { title: 'Sports Complex', color: 'bg-red-100' },
    { title: 'Auditorium', color: 'bg-indigo-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Campus Gallery</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className={`w-full h-64 ${photo.color} rounded-lg flex items-center justify-center transition-transform transform group-hover:scale-105 shadow-sm`}>
              <span className="text-gray-500 font-medium px-4 text-center">{photo.title}<br/>(Image Placeholder)</span>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900 text-center">{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
