import { useAuthStore } from '@/store/auth.store';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function RiskAssessment() {
  const { user } = useAuthStore();
  
  if (user?.lifeStage !== 'marriage') {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Info className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">هذه الخاصية غير متاحة حالياً</h2>
        <p className="text-gray-500">تقييم المخاطر مخصص حالياً لمرحلة الحمل ومتابعة الأمراض المرتبطة به.</p>
      </div>
    );
  }

  const results = user?.mockData?.aiRiskResults || {
    ptb: { score: 15, level: 'low', shap: ['العمر 40%', 'الوزن 30%', 'التاريخ الطبي 30%'] },
    pe: { score: 12, level: 'low', shap: ['ضغط الدم 50%', 'الوزن 30%', 'العمر 20%'] },
    gdm: { score: 18, level: 'low', shap: ['التغذية 45%', 'الوزن 35%', 'العمر 20%'] },
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'high': return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', hex: '#DC2626', label: 'مرتفع' };
      case 'medium': return { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', hex: '#F97316', label: 'متوسط' };
      default: return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', hex: '#16A34A', label: 'منخفض' };
    }
  };

  const models = [
    { id: 'ptb', title: 'الولادة المبكرة (PTB)', data: results.ptb },
    { id: 'pe', title: 'تسمم الحمل (PE)', data: results.pe },
    { id: 'gdm', title: 'سكر الحمل (GDM)', data: results.gdm },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">التقييم الذكي للمخاطر</h1>
          <p className="text-muted-foreground">تحليل مبني على الذكاء الاصطناعي لبياناتك الطبية (لأغراض استرشادية فقط)</p>
        </div>
        {user?.mockData?.dashboardStats?.riskFlag && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold border border-red-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="hidden sm:inline">يرجى استشارة طبيبك</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {models.map(model => {
          const colors = getLevelColor(model.data.level);
          const chartData = [{ name: 'risk', value: model.data.score, fill: colors.hex }];
          
          return (
            <div key={model.id} className={`bg-white rounded-3xl p-6 shadow-sm border-2 transition-all hover:shadow-md ${colors.border}`}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-bold text-gray-900">{model.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                  {colors.label}
                </span>
              </div>

              <div className="relative h-48 mb-6" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={15} data={chartData} startAngle={180} endAngle={0}>
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background={{ fill: '#f3f4f6' }} dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                  <span className={`text-4xl font-black ${colors.text}`}>{model.data.score}%</span>
                  <span className="text-xs text-gray-400 font-medium">نسبة الخطورة</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  العوامل المؤثرة:
                </h3>
                <ul className="space-y-2">
                  {model.data.shap.map((factor: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
        <Info className="w-6 h-6 text-blue-500 shrink-0" />
        <div>
          <h3 className="font-bold text-blue-900 mb-1">كيف يعمل هذا التقييم؟</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            يستخدم وداد تك نماذج تعلم آلي متقدمة تحلل تاريخك الطبي، قياساتك الحالية، ونتائج التحاليل لتقديم تقييم مبدئي لاحتمالية حدوث مضاعفات. هذا التقييم <strong>لا يغني أبداً عن الاستشارة الطبية</strong> والتشخيص من قبل طبيبك المعالج.
          </p>
        </div>
      </div>
    </div>
  );
}