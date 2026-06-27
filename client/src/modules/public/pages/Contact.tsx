import { ActionButton } from '@/components/shared/ActionButton';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
            </div>
            <ActionButton type="submit" className="w-full">Send Message</ActionButton>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="font-bold text-gray-900">Address</h3>
              <p>123 University Avenue, Tech City, TC 12345, Country</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Phone</h3>
              <p>General Inquiries: +1 (555) 123-4567</p>
              <p>Admissions: +1 (555) 987-6543</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email</h3>
              <p>info@eduplatform.edu</p>
              <p>admissions@eduplatform.edu</p>
            </div>
            
            <div className="mt-8">
              <h3 className="font-bold text-gray-900 mb-2">Location Map</h3>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Map Embed Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
