import { ActionButton } from '@/components/shared/ActionButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useToast } from '@/store/useToast';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  program: z.string().min(1, 'Please select a program'),
});

type FormData = z.infer<typeof formSchema>;

export default function Admissions() {
  const { addToast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('success', `Information requested successfully for ${data.fullName}! Check your email.`);
    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Admissions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admission Process</h2>
          <ol className="list-decimal pl-5 space-y-4 text-gray-600">
            <li><strong>Online Application:</strong> Fill out the online application form with personal and academic details.</li>
            <li><strong>Entrance Examination:</strong> Appear for the university-level or national-level entrance exam.</li>
            <li><strong>Counseling:</strong> Shortlisted candidates will be called for counseling and document verification.</li>
            <li><strong>Fee Payment:</strong> Pay the admission fee to secure your seat.</li>
          </ol>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Important Dates</h3>
            <ul className="space-y-2 text-gray-600 bg-gray-50 p-4 rounded-md border border-gray-200">
              <li className="flex justify-between"><span>Applications Open:</span> <strong>Jan 15, 2027</strong></li>
              <li className="flex justify-between"><span>Last Date to Apply:</span> <strong>Mar 30, 2027</strong></li>
              <li className="flex justify-between"><span>Entrance Exam:</span> <strong>Apr 15, 2027</strong></li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Information</h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                {...register('fullName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" 
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                {...register('email')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program of Interest</label>
              <select 
                {...register('program')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              >
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Ph.D.">Ph.D.</option>
              </select>
              {errors.program && <p className="text-red-500 text-xs mt-1">{errors.program.message}</p>}
            </div>
            <ActionButton type="submit" isLoading={isSubmitting} className="w-full">Submit Request</ActionButton>
          </form>
        </div>
      </div>
    </div>
  );
}
