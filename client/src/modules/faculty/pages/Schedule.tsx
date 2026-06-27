export default function Schedule() {
  const schedule = [
    { day: 'Monday', classes: [{ time: '10:00 AM - 11:00 AM', course: 'CS101', room: 'Room 304' }, { time: '02:00 PM - 04:00 PM', course: 'CS305 Lab', room: 'Lab 1' }] },
    { day: 'Tuesday', classes: [{ time: '09:00 AM - 10:00 AM', course: 'CS101', room: 'Room 304' }] },
    { day: 'Wednesday', classes: [{ time: '11:00 AM - 12:00 PM', course: 'CS305', room: 'Room 305' }, { time: '02:00 PM - 04:00 PM', course: 'CS101 Lab', room: 'Lab 2' }] },
    { day: 'Thursday', classes: [{ time: '10:00 AM - 11:00 AM', course: 'CS101', room: 'Room 304' }] },
    { day: 'Friday', classes: [{ time: '09:00 AM - 11:00 AM', course: 'Research Mentoring', room: 'Cabin A' }] },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Schedule</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {schedule.map((dayPlan, idx) => (
          <div key={idx} className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-slate-800 text-white text-center py-2 font-bold">
              {dayPlan.day}
            </div>
            <div className="p-4 space-y-4 bg-gray-50 h-full min-h-[300px]">
              {dayPlan.classes.length > 0 ? (
                dayPlan.classes.map((cls, cidx) => (
                  <div key={cidx} className="bg-white border border-l-4 border-l-primary border-gray-200 p-3 rounded shadow-sm">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{cls.time}</p>
                    <p className="text-sm font-bold text-gray-900">{cls.course}</p>
                    <p className="text-xs text-gray-600 mt-1">{cls.room}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center mt-4">No Classes</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
