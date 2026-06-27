import { AppShell } from '@/components/AppShell'
import { Tractor, MapPin, Star, Phone, ShieldCheck } from 'lucide-react'
import { ImageWithFallback } from '@/components/ImageWithFallback'

const equipmentList = [
  {
    id: 1,
    name: 'Mahindra 575 DI Tractor',
    image: 'https://images.unsplash.com/photo-1592982537447-6f296d9b3074?w=600&q=80',
    price: 800,
    unit: 'hour',
    owner: 'Ramesh Reddy',
    rating: 4.8,
    reviews: 24,
    distance: '3.2 km',
    verified: true,
  },
  {
    id: 2,
    name: 'John Deere Harvester',
    image: 'https://images.unsplash.com/photo-1605367175402-1ea32a3ea57d?w=600&q=80',
    price: 2500,
    unit: 'hour',
    owner: 'Suresh Kumar',
    rating: 4.9,
    reviews: 56,
    distance: '5.1 km',
    verified: true,
  },
  {
    id: 3,
    name: 'Rotavator Attachment',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&q=80',
    price: 300,
    unit: 'hour',
    owner: 'Venkatesh',
    rating: 4.5,
    reviews: 12,
    distance: '1.8 km',
    verified: false,
  }
]

export default function EquipmentRentalPage() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Tractor className="h-8 w-8 text-primary" /> Equipment Rental
            </h1>
            <p className="mt-2 text-slate-600">Find and rent tractors and machinery from trusted farmers nearby.</p>
          </div>
          <button className="bg-white border-2 border-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl flex items-center gap-2 hover:bg-slate-50">
            <MapPin className="h-5 w-5" /> Change Location
          </button>
        </div>

        {/* Filters/Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="bg-primary text-white font-semibold px-6 py-2 rounded-full whitespace-nowrap">All Equipment</button>
          <button className="bg-white text-slate-600 border border-slate-200 font-semibold px-6 py-2 rounded-full whitespace-nowrap hover:bg-slate-50">Tractors</button>
          <button className="bg-white text-slate-600 border border-slate-200 font-semibold px-6 py-2 rounded-full whitespace-nowrap hover:bg-slate-50">Harvesters</button>
          <button className="bg-white text-slate-600 border border-slate-200 font-semibold px-6 py-2 rounded-full whitespace-nowrap hover:bg-slate-50">Implements</button>
        </div>

        {/* Amazon-Style Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {equipmentList.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="relative h-48 w-full overflow-hidden">
                <ImageWithFallback 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.verified && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm border border-emerald-100">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-primary">Verified</span>
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 mb-1">{item.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-bold text-slate-700">{item.rating}</span>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer ml-1">({item.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-slate-900">₹{item.price}</span>
                  <span className="text-slate-500 text-sm"> / {item.unit}</span>
                </div>

                {/* Seller Info & Location */}
                <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-100 text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-500">Owner:</span>
                    <span className="font-semibold text-slate-800">{item.owner}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Distance:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1"><MapPin className="h-3 w-3 text-slate-400"/> {item.distance}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-emerald-50 text-primary font-bold py-3 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" /> Call
                  </button>
                  <button className="bg-accent text-slate-900 font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors shadow-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppShell>
  )
}
