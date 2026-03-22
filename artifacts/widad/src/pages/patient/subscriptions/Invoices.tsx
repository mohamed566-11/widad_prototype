import { useMemo } from 'react'
import { Download, Receipt } from 'lucide-react'
import { subscriptionsMock } from '@/mock/services/subscriptions.mock'
import { useAuthStore } from '@/store/auth.store'

export default function Invoices() {
  const { user } = useAuthStore()

  const invoices = useMemo(() => subscriptionsMock.getInvoices(user), [user])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">الفواتير والدفع</h1>
        <p className="text-sm text-gray-500 font-medium">يتم تحديث الفواتير تلقائيًا بعد أي عملية اشتراك</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 font-bold text-gray-600 text-sm">رقم الفاتورة</th>
                <th className="p-5 font-bold text-gray-600 text-sm">التاريخ</th>
                <th className="p-5 font-bold text-gray-600 text-sm">الوصف</th>
                <th className="p-5 font-bold text-gray-600 text-sm">المبلغ</th>
                <th className="p-5 font-bold text-gray-600 text-sm">الحالة</th>
                <th className="p-5 font-bold text-gray-600 text-sm text-center">تنزيل</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, i) => (
                <tr key={invoice.id} className={i !== invoices.length - 1 ? 'border-b border-gray-50' : ''}>
                  <td className="p-5">
                    <div className="flex items-center gap-2 font-bold text-gray-900" dir="ltr">
                      <Receipt className="w-4 h-4 text-gray-400" />
                      {invoice.id}
                    </div>
                  </td>
                  <td className="p-5 font-medium text-gray-600">{invoice.date}</td>
                  <td className="p-5 text-gray-800 font-medium">{invoice.description}</td>
                  <td className="p-5 font-bold text-foreground">{invoice.amount}</td>
                  <td className="p-5">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                      مدفوعة
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors inline-block">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {invoices.length === 0 && (
          <div className="p-12 text-center text-gray-500 font-medium">
            لا توجد فواتير لهذه الفترة
          </div>
        )}
      </div>
    </div>
  )
}