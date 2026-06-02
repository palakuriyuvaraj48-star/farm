'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { toast } from 'react-toastify'

const farmerRegistrationSchema = z.object({
  name: z.string().min(3, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  phoneNumber: z.string().min(10, 'Enter phone number'),
  password: z.string().min(6, 'Enter password'),
  defaultLandAreaHectares: z.number().positive('Enter land area'),
})

type FormData = z.infer<typeof farmerRegistrationSchema>

export default function FarmerRegistrationForm() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(farmerRegistrationSchema),
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await axios.post('/api/v1/farmers/register', data)
      toast.success('Registration successful. You can now login with OTP.')
    } catch (error) {
      toast.error('Unable to register. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Farmer Registration</h2>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input {...register('name')} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input {...register('email')} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input {...register('phoneNumber')} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" {...register('password')} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Land area (hectares)</label>
          <input type="number" step="0.01" {...register('defaultLandAreaHectares', { valueAsNumber: true })} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
          {errors.defaultLandAreaHectares && <p className="mt-1 text-sm text-red-600">{errors.defaultLandAreaHectares.message}</p>}
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400">
          {loading ? 'Registering...' : 'Register Farmer'}
        </button>
      </form>
    </div>
  )
}
