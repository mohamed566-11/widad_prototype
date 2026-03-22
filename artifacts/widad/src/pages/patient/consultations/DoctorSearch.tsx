import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Star, Clock, Video, FileText, ChevronLeft } from 'lucide-react'
import { MOCK_DOCTORS } from '@/mock/data/doctors'
import { doctorMatchesStage, STAGE_META, type StageKey } from '@/mock/data/stage-mapping'

export default function DoctorSearch() {
  const location = useLocation()
  const isPublicRoute = location.pathname.startsWith('/doctors')

  const [searchTerm, setSearchTerm] = useState('')
  const [specialty, setSpecialty] = useState('الكل')
  const [stage, setStage] = useState<StageKey | 'all'>('all')

  const specialties = ['الكل', ...Array.from(new Set(MOCK_DOCTORS.map(d => d.specialty)))]

  const filteredDoctors = MOCK_DOCTORS.filter(d => {
    const matchesSearch = d.name.includes(searchTerm) || d.specialty.includes(searchTerm)
    const matchesSpecialty = specialty === 'الكل' || d.specialty === specialty
    const matchesStage = doctorMatchesStage(d, stage)
    return matchesSearch && matchesSpecialty && matchesStage
  })

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-foreground mb-6">احجزي استشارتك مع نخبة الأطباء</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="ابحثي عن دكتور أو تخصص..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 pr-12 pl-4 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSpecialty(spec)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${
                  specialty === spec ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pt-4 hide-scrollbar">
          <button
            onClick={() => setStage('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold border ${stage === 'all' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
          >
            كل المراحل
          </button>
          {(['pre_marriage', 'marriage', 'post_marriage'] as StageKey[]).map((item) => (
            <button
              key={item}
              onClick={() => setStage(item)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border ${stage === item ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {STAGE_META[item].icon} {STAGE_META[item].title}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-3xl p-6 shadow-sm border border-border hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-6 group">
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&auto=format&q=80&seed=${doctor.id}`} alt={doctor.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-sm" />
              {doctor.isOnline && (
                <div className="absolute -bottom-2 -left-2 bg-white p-1 rounded-full">
                  <div className="bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm" title="متاح الآن"></div>
                </div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{doctor.name}</h3>
                  <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-sm font-bold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {doctor.rating}
                </div>
              </div>
              
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{doctor.about}</p>
              
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-medium text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> رد: {doctor.responseTime}</div>
                <div className="flex items-center gap-1.5"><Video className="w-4 h-4 text-gray-400" /> استشارة فيديو</div>
                <div className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-gray-400" /> وصفة طبية (روشتة)</div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-extrabold text-lg text-gray-900">{doctor.price} <span className="text-sm text-gray-500 font-medium">ج.م</span></span>
                <Link
                  to={`${isPublicRoute ? '/doctors' : '/patient/doctors'}/${doctor.id}`}
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-5 py-2 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  عرض الملف والحجز
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-500">لا يوجد أطباء مطابقين لبحثك</h3>
          </div>
        )}
      </div>
    </div>
  )
}
