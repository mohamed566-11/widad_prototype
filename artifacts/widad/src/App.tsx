import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import FloatingChatbot from '@/components/chatbot/FloatingChatbot'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { GuidelinesGuard } from '@/components/auth/GuidelinesGuard'
import { PatientLayout, DoctorLayout, AdminLayout } from '@/components/layout/AppLayouts'
import PublicContentLayout from '@/components/layout/PublicContentLayout'

function PublicContentRoute() {
  return <PublicContentLayout><Outlet /></PublicContentLayout>
}

// ── Public ────────────────────────────────────────────────
const LandingPage       = lazy(() => import('@/pages/public/LandingPage'))
const AboutUs           = lazy(() => import('@/pages/public/AboutUs'))
const LifeStages        = lazy(() => import('@/pages/public/LifeStages'))
const StageDetails      = lazy(() => import('@/pages/public/StageDetails'))
const PublicTrackers    = lazy(() => import('@/pages/public/TrackersPublic'))
const ContactUs         = lazy(() => import('@/pages/public/ContactUs'))
const PublicPricing     = lazy(() => import('@/pages/public/Pricing'))

// ── Auth ──────────────────────────────────────────────────
const DemoLogin         = lazy(() => import('@/pages/auth/DemoLogin'))
const RoleSelect        = lazy(() => import('@/pages/auth/RoleSelect'))
const PatientLogin      = lazy(() => import('@/pages/auth/PatientLogin'))
const PatientRegister   = lazy(() => import('@/pages/auth/PatientRegister'))
const VerifyOTP         = lazy(() => import('@/pages/auth/VerifyOTP'))
const ResetPassword     = lazy(() => import('@/pages/auth/ResetPassword'))
const DoctorLogin       = lazy(() => import('@/pages/auth/DoctorLogin'))
const AdminLogin        = lazy(() => import('@/pages/auth/AdminLogin'))

// ── Patient ───────────────────────────────────────────────
const PatientDashboard    = lazy(() => import('@/pages/patient/Dashboard'))
const Notifications       = lazy(() => import('@/pages/patient/Notifications'))
const ProfilePage         = lazy(() => import('@/pages/patient/profile/ProfilePage'))

const TrackersHub         = lazy(() => import('@/pages/patient/trackers/TrackersHub'))
const MoodTracker         = lazy(() => import('@/pages/patient/trackers/MoodTracker'))
const WeightTracker       = lazy(() => import('@/pages/patient/trackers/WeightTracker'))
const PeriodTracker       = lazy(() => import('@/pages/patient/trackers/PeriodTracker'))
const FertilityTracker    = lazy(() => import('@/pages/patient/trackers/FertilityTracker'))
const PregnancyTracker    = lazy(() => import('@/pages/patient/trackers/PregnancyTracker'))

const DoctorSearch        = lazy(() => import('@/pages/patient/consultations/DoctorSearch'))
const DoctorProfile       = lazy(() => import('@/pages/patient/consultations/DoctorProfile'))
const BookConsultation    = lazy(() => import('@/pages/patient/consultations/BookConsultation'))
const ConsultationsList   = lazy(() => import('@/pages/patient/consultations/ConsultationsList'))
const ConsultationDetail  = lazy(() => import('@/pages/patient/consultations/ConsultationDetail'))

const AiChat              = lazy(() => import('@/pages/patient/ai/AiChat'))
const RiskAssessment      = lazy(() => import('@/pages/patient/ai/RiskAssessment'))
const FetalAnalysis       = lazy(() => import('@/pages/patient/ai/FetalInsights'))

const CommunityFeed       = lazy(() => import('@/pages/patient/community/CommunityFeed'))
const CirclePage          = lazy(() => import('@/pages/patient/community/CirclePage'))
const PostDetail          = lazy(() => import('@/pages/patient/community/PostDetail'))
const CreatePost          = lazy(() => import('@/pages/patient/community/CreatePost'))
const SavedPosts          = lazy(() => import('@/pages/patient/community/SavedPosts'))
const Guidelines          = lazy(() => import('@/pages/patient/community/Guidelines'))

const PricingPage         = lazy(() => import('@/pages/patient/subscriptions/PricingPage'))
const CheckoutPage        = lazy(() => import('@/pages/patient/subscriptions/Checkout'))
const MySubscription      = lazy(() => import('@/pages/patient/subscriptions/MySubscription'))
const Invoices            = lazy(() => import('@/pages/patient/subscriptions/Invoices'))

const ArticlesList        = lazy(() => import('@/pages/patient/articles/ArticlesList'))
const ArticleDetail       = lazy(() => import('@/pages/patient/articles/ArticleDetail'))

// ── Doctor ────────────────────────────────────────────────
const DoctorDashboard     = lazy(() => import('@/pages/doctor/Dashboard'))
const DoctorConsultations = lazy(() => import('@/pages/doctor/Consultations'))
const DoctorPatients      = lazy(() => import('@/pages/doctor/Patients'))
const PatientEHR          = lazy(() => import('@/pages/doctor/PatientEHR'))
const DoctorCalendar      = lazy(() => import('@/pages/doctor/Calendar'))
const DoctorFinancials    = lazy(() => import('@/pages/doctor/Financials'))
const DoctorProfilePage   = lazy(() => import('@/pages/doctor/Profile'))
const DoctorArticlesPage  = lazy(() => import('@/pages/doctor/Articles'))

// ── Admin ─────────────────────────────────────────────────
const AdminDashboard      = lazy(() => import('@/pages/admin/Dashboard'))
const AdminPatients       = lazy(() => import('@/pages/admin/Patients'))
const AdminDoctors        = lazy(() => import('@/pages/admin/Doctors'))
const AdminFinancial      = lazy(() => import('@/pages/admin/Financial'))
const AdminCommunity      = lazy(() => import('@/pages/admin/Community'))
const AdminConsultations  = lazy(() => import('@/pages/admin/Consultations'))
const AdminArticles       = lazy(() => import('@/pages/admin/Articles'))
const AdminSubscriptions  = lazy(() => import('@/pages/admin/Subscriptions'))
const AdminAnalytics      = lazy(() => import('@/pages/admin/Analytics'))
const AdminSettings       = lazy(() => import('@/pages/admin/Settings'))

// ─────────────────────────────────────────────────────────
const queryClient = new QueryClient()

const Fallback = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center" dir="rtl">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="mt-4 font-bold text-gray-500">جاري التحميل...</p>
  </div>
)

import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function AppRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Fallback />}>
        <Routes location={location} key={location.pathname}>
          {/* ── Public ── */}
          <Route element={<PublicContentRoute />}>
            <Route path="/"                element={<LandingPage />} />
            <Route path="/about"            element={<AboutUs />} />
            <Route path="/life-stages"      element={<LifeStages />} />
            <Route path="/life-stages/:stage" element={<StageDetails />} />
            <Route path="/trackers"         element={<PublicTrackers />} />
            <Route path="/contact"          element={<ContactUs />} />
            <Route path="/pricing"          element={<PublicPricing />} />

            {/* ── Public Doctors & Articles (no login needed) ── */}
            <Route path="/doctors"          element={<DoctorSearch />} />
            <Route path="/doctors/:id"      element={<DoctorProfile />} />
            <Route path="/articles"         element={<ArticlesList />} />
            <Route path="/articles/:id"     element={<ArticleDetail />} />
          </Route>

          <Route path="/demo" element={<DemoLogin />} />
          <Route path="/auth" element={<RoleSelect />} />
          <Route path="/auth/patient/login" element={<PatientLogin />} />
          <Route path="/auth/patient/register" element={<PatientRegister />} />
          <Route path="/auth/patient/otp" element={<VerifyOTP />} />
          <Route path="/auth/patient/reset" element={<ResetPassword />} />
          <Route path="/auth/doctor/login" element={<DoctorLogin />} />
          <Route path="/auth/admin/login" element={<AdminLogin />} />

          {/* ── Patient ── */}
          <Route element={<ProtectedRoute role="patient" />}>
            <Route element={<PatientLayout />}>
              <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
              <Route path="/patient/dashboard"                 element={<PatientDashboard />} />
              <Route path="/patient/notifications"             element={<Notifications />} />
              <Route path="/patient/profile"                   element={<ProfilePage />} />
              <Route path="/patient/profile/*"                 element={<ProfilePage />} />

              <Route path="/patient/trackers"                  element={<TrackersHub />} />
              <Route path="/patient/trackers/mood"             element={<MoodTracker />} />
              <Route path="/patient/trackers/weight"           element={<WeightTracker />} />
              <Route path="/patient/trackers/period"           element={<PeriodTracker />} />
              <Route path="/patient/trackers/fertility"        element={<FertilityTracker />} />
              <Route path="/patient/trackers/pregnancy"        element={<PregnancyTracker />} />

              <Route path="/patient/doctors"                   element={<DoctorSearch />} />
              <Route path="/patient/doctors/:id"               element={<DoctorProfile />} />
              <Route path="/patient/book/:id"                  element={<BookConsultation />} />
              <Route path="/patient/consultations"             element={<ConsultationsList />} />
              <Route path="/patient/consultations/:id"         element={<ConsultationDetail />} />

              <Route path="/patient/ai"                        element={<AiChat />} />
              <Route path="/patient/risk"                      element={<RiskAssessment />} />
              <Route path="/patient/fetal"                     element={<FetalAnalysis />} />

              <Route path="/patient/community/guidelines"      element={<Guidelines />} />
              <Route element={<GuidelinesGuard />}>
                <Route path="/patient/community"               element={<CommunityFeed />} />
                <Route path="/patient/community/circles/:id"   element={<CirclePage />} />
                <Route path="/patient/community/post/:id"      element={<PostDetail />} />
                <Route path="/patient/community/new"           element={<CreatePost />} />
                <Route path="/patient/community/create"        element={<CreatePost />} />
                <Route path="/patient/community/saved"         element={<SavedPosts />} />
              </Route>

              <Route path="/patient/subscriptions"             element={<PricingPage />} />
              <Route path="/patient/plans"                     element={<PricingPage />} />
              <Route path="/patient/checkout"                  element={<CheckoutPage />} />
              <Route path="/patient/subscription"              element={<MySubscription />} />
              <Route path="/patient/invoices"                  element={<Invoices />} />

              <Route path="/patient/articles"                  element={<ArticlesList />} />
              <Route path="/patient/articles/:id"              element={<ArticleDetail />} />
            </Route>
          </Route>

          {/* ── Doctor ── */}
          <Route element={<ProtectedRoute role="doctor" />}>
            <Route element={<DoctorLayout />}>
              <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
              <Route path="/doctor/dashboard"         element={<DoctorDashboard />} />
              <Route path="/doctor/consultations"     element={<DoctorConsultations />} />
              <Route path="/doctor/patients"          element={<DoctorPatients />} />
              <Route path="/doctor/patients/:id"      element={<PatientEHR />} />
              <Route path="/doctor/calendar"          element={<DoctorCalendar />} />
              <Route path="/doctor/financials"        element={<DoctorFinancials />} />
              <Route path="/doctor/profile"           element={<DoctorProfilePage />} />
              <Route path="/doctor/articles"          element={<DoctorArticlesPage />} />
            </Route>
          </Route>

          {/* ── Admin ── */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard"      element={<AdminDashboard />} />
              <Route path="/admin/patients"       element={<AdminPatients />} />
              <Route path="/admin/doctors"        element={<AdminDoctors />} />
              <Route path="/admin/financial"          element={<AdminFinancial />} />
              <Route path="/admin/community"          element={<AdminCommunity />} />
              <Route path="/admin/consultations"      element={<AdminConsultations />} />
              <Route path="/admin/articles"           element={<AdminArticles />} />
              <Route path="/admin/subscriptions"      element={<AdminSubscriptions />} />
              <Route path="/admin/analytics"          element={<AdminAnalytics />} />
              <Route path="/admin/settings"           element={<AdminSettings />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div dir="rtl" className="min-h-screen font-sans text-foreground bg-background">
          <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppRoutes />
          </BrowserRouter>
          <FloatingChatbot />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  )
}
