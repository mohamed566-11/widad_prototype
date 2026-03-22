import { useState } from 'react'

export default function ContactUs() {
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">تواصل معنا</h1>
        <p className="text-lg text-muted-foreground mb-8">يسعدنا استقبال استفساراتك ومقترحاتك.</p>

        {sent ? (
          <div className="bg-white border border-border rounded-3xl p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold mb-2">وصلتنا رسالتك ✅</h2>
            <p className="text-gray-600">شكراً لك. سنعود إليك قريباً.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="bg-white border border-border rounded-3xl p-8 shadow-sm space-y-4"
          >
            <input required placeholder="الاسم" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
            <input required type="email" dir="ltr" placeholder="name@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary" />
            <textarea required rows={5} placeholder="رسالتك" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary resize-none" />
            <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
              إرسال
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
