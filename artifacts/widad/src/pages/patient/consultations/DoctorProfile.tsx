import { useParams, Link, useLocation } from 'react-router-dom';
import { MOCK_DOCTORS } from '@/mock/data/doctors';
import { Star, Clock, Video, Languages, GraduationCap, ShieldCheck, ChevronLeft, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export default function DoctorProfile() {
  const { id } = useParams();
  const location = useLocation();
  const { isAuth } = useAuthStore();
  const doctor = MOCK_DOCTORS.find(d => d.id === id) || MOCK_DOCTORS[0];
  const isPublicRoute = location.pathname.startsWith('/doctors');
  const backPath = isPublicRoute ? '/doctors' : '/patient/doctors';
  const bookPath = `/patient/book/${doctor.id}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <Link to={backPath} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm">
        <ChevronLeft className="w-4 h-4" />
        عودة للبحث
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-border flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
        
        <div className="relative shrink-0">
          <img src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format&q=80&seed=${doctor.id}`} alt={doctor.name} className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover shadow-lg border-4 border-white" />
          {doctor.isOnline && (
            <div className="absolute -bottom-2 -left-2 bg-white p-1.5 rounded-full shadow-sm">
              <div className="bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-right">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center justify-center md:justify-start gap-2">
                {doctor.name}
                <ShieldCheck className="w-6 h-6 text-primary" />
              </h1>
              <p className="text-primary font-bold text-lg mt-1">{doctor.specialty}</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-xl text-sm font-bold border border-yellow-100">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {doctor.rating} ({doctor.reviewsCount} تقييم)
              </div>
              <p className="text-2xl font-black text-gray-900">{doctor.price} <span className="text-sm text-gray-500 font-medium">ج.م</span></p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            <span className="flex items-center gap-1.5 text-sm font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Clock className="w-4 h-4 text-gray-400" />
              وقت الرد: {doctor.responseTime}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Video className="w-4 h-4 text-gray-400" />
              استشارة فيديو، صوت، نص
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">نبذة عن الطبيب</h2>
            <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
          </div>

          {/* Details */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">المؤهلات</h3>
              </div>
              <ul className="space-y-2">
                {doctor.qualifications.map((q, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">اللغات</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((l, i) => (
                  <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm font-bold border border-purple-100">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-border sticky top-6 h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">احجزي استشارتك</h3>
          
          <div className="space-y-4 mb-6">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 text-sm">أقرب موعد متاح</p>
                <p className="text-green-700 mt-1">{new Date(doctor.nextAvailable).toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>
            </div>
          </div>

          <Link 
            to={isAuth ? bookPath : '/auth/patient/login'}
            state={isAuth ? undefined : { redirectTo: bookPath }}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            {isAuth ? 'المتابعة للحجز' : 'تسجيل الدخول للحجز'}
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <p className="text-center text-xs text-gray-400 mt-4 font-medium">الدفع آمن ومحمي 100%</p>
        </div>
      </div>
    </div>
  );
}