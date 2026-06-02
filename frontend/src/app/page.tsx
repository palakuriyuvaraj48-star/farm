import FarmerRegistrationForm from '@/components/FarmerRegistrationForm'
import OTPLoginForm from '@/components/OTPLoginForm'

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-6">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">KrishiAI Smart Farmer Platform</h1>
          <p className="mt-3 text-slate-600">Register as a farmer or login with mobile OTP to access crop recommendations, irrigation advice, and farm planning tools.</p>
        </section>
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <FarmerRegistrationForm />
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <OTPLoginForm />
          </div>
        </section>
      </div>
    </div>
  )
}
