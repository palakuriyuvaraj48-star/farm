'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { toast } from 'react-toastify'

const otpRequestSchema = z.object({
  phoneNumber: z.string().min(10, 'Enter phone number'),
})

const otpVerifySchema = z.object({
  phoneNumber: z.string().min(10, 'Enter phone number'),
  otpCode: z.string().length(6, 'Enter 6 digit OTP'),
})

type OtpRequestForm = z.infer<typeof otpRequestSchema>
type OtpVerifyForm = z.infer<typeof otpVerifySchema>

export default function OTPLoginForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpPhone, setOtpPhone] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<OtpRequestForm>({ resolver: zodResolver(otpRequestSchema) })
  const { register: registerOtp, handleSubmit: handleSubmitOtp, formState: { errors: otpErrors } } = useForm<OtpVerifyForm>({ resolver: zodResolver(otpVerifySchema) })

  const sendOtp = async (data: OtpRequestForm) => {
    setLoading(true)
    try {
      await axios.post('/api/v1/auth/send-otp', data)
      toast.success('OTP sent to your phone. Use it to login.')
      setOtpPhone(data.phoneNumber)
      setSent(true)
    } catch (error) {
      toast.error('Unable to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (data: OtpVerifyForm) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/v1/auth/verify-otp', data)
      localStorage.setItem('krishiai_token', response.data.token)
      toast.success('Login successful. Token saved locally.')
    } catch (error) {
      toast.error('OTP verification failed. Enter the code again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Mobile OTP Login</h2>
      {!sent ? (
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(sendOtp)}>
          <div>
            <label className="block text-sm font-medium text-slate-700">Phone</label>
            <input {...register('phoneNumber')} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-amber-600 px-4 py-3 text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-400">
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form className="mt-5 space-y-4" onSubmit={handleSubmitOtp(verifyOtp)}>
          <div>
            <p className="text-sm text-slate-600">OTP sent to {otpPhone}.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">OTP Code</label>
            <input {...registerOtp('otpCode')} className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2" />
            {otpErrors.otpCode && <p className="mt-1 text-sm text-red-600">{otpErrors.otpCode.message}</p>}
          </div>
          <input type="hidden" value={otpPhone} {...registerOtp('phoneNumber')} />
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">
            {loading ? 'Verifying...' : 'Verify OTP & Login'}
          </button>
        </form>
      )}
    </div>
  )
}
