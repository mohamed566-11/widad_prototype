// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Invoices page with frosted glass tables, glowing headers, and smooth entrance staggered animations.

import { useMemo } from 'react'
import { Download, Receipt, FileText } from 'lucide-react'
import { subscriptionsMock } from '@/mock/services/subscriptions.mock'
import { useAuthStore } from '@/store/auth.store'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function Invoices() {
  const { user } = useAuthStore()

  const invoices = useMemo(() => subscriptionsMock.getInvoices(user), [user])

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-8 pb-10" dir="rtl">
        
        {/* Header Hero */}
        <m.div variants={fadeUpVariant} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none -z-10 text-transparent">glow</div>
          
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-500/10 flex items-center justify-center shadow-inner border border-indigo-500/20">
               <FileText className="w-7 h-7 text-indigo-500" />
             </div>
             <div>
               <h1 className="text-3xl md:text-5xl font-black font-display text-foreground drop-shadow-sm mb-1">الفواتير والدفع</h1>
               <p className="text-lg text-muted-foreground font-medium">سجل مدفوعاتك والاشتراكات النشطة</p>
             </div>
          </div>
        </m.div>

        {/* Table Container */}
        <m.div variants={fadeUpVariant} className="glass-panel rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[80px] group-hover:bg-indigo-500/10 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="relative z-10 overflow-x-auto hide-scrollbar">
            {invoices.length > 0 ? (
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="p-5 font-bold font-display text-muted-foreground text-sm uppercase tracking-wider">رقم الفاتورة</th>
                    <th className="p-5 font-bold font-display text-muted-foreground text-sm uppercase tracking-wider">التاريخ</th>
                    <th className="p-5 font-bold font-display text-muted-foreground text-sm uppercase tracking-wider">الوصف</th>
                    <th className="p-5 font-bold font-display text-muted-foreground text-sm uppercase tracking-wider">المبلغ</th>
                    <th className="p-5 font-bold font-display text-muted-foreground text-sm uppercase tracking-wider">الحالة</th>
                    <th className="p-5 font-bold font-display text-muted-foreground text-sm uppercase tracking-wider text-center">تنزيل</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, i) => (
                    <m.tr 
                      key={invoice.id} 
                      custom={i}
                      variants={fadeUpVariant}
                      className={cn(
                        "group/row hover:bg-white/50 dark:hover:bg-black/20 transition-colors",
                        i !== invoices.length - 1 ? 'border-b border-border/30' : ''
                      )}
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3 font-bold text-foreground bg-secondary/50 px-3 py-1.5 rounded-xl border border-border/50 w-fit shadow-sm" dir="ltr">
                          <Receipt className="w-4 h-4 text-primary" />
                          <span className="font-mono text-sm tracking-wider">{invoice.id}</span>
                        </div>
                      </td>
                      <td className="p-5 font-bold text-muted-foreground text-sm">{invoice.date}</td>
                      <td className="p-5 text-foreground font-black font-display text-lg">{invoice.description}</td>
                      <td className="p-5 font-black text-primary text-xl" dir="ltr">{invoice.amount}</td>
                      <td className="p-5">
                        <span className="bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-xl text-sm font-bold border border-green-500/20 shadow-sm flex items-center justify-center w-fit gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          مدفوعة
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <button className="p-3 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all inline-block hover:shadow-sm border border-transparent hover:border-indigo-500/20 group/btn">
                          <Download className="w-5 h-5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </td>
                    </m.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <m.div variants={fadeUpVariant} className="text-center py-20 px-6 rounded-[2rem] border border-dashed border-border/80 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors duration-500 -z-10"></div>
                 <div className="w-24 h-24 bg-secondary/80 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-border/50 rotate-3 group-hover:-rotate-3 transition-transform duration-500">
                   <FileText className="w-10 h-10 text-muted-foreground" />
                 </div>
                <h3 className="text-x font-black font-display text-foreground mb-2">لا توجد فواتير لهذه الفترة</h3>
                <p className="text-muted-foreground">ستظهر فواتير الإشتراكات والمدفوعات الخاصة بك هنا.</p>
              </m.div>
            )}
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  )
}