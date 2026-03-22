// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
import { Link } from 'react-router-dom'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { staggerContainer, fadeUpVariant } from '@/lib/animations'
import { Eye, Target, Sparkles, Heart } from 'lucide-react'

export default function AboutUs() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen pt-32 pb-16 px-6 relative overflow-hidden" dir="rtl">
        {/* Animated Background */}
        <div className="fixed top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDuration: '8s' }} />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary/20 rounded-full blur-[100px] pointer-events-none animate-float" style={{ animationDuration: '12s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E')] opacity-50 mixing-blend-overlay pointer-events-none"></div>

        <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-5xl mx-auto relative z-10">
          <m.div variants={fadeUpVariant} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black font-display text-foreground mb-6 drop-shadow-sm">من نحن</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
              وداد منصة صحية رقمية تدعم المرأة العربية في كل مراحل رحلتها، من قبل الزواج وحتى الأمومة، عبر محتوى موثوق، متتبعات ذكية، واستشارات مع أطباء معتمدين.
            </p>
          </m.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-8 border border-white/40 shadow-sm hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-primary/20">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-black font-display mb-3 text-foreground">رؤيتنا</h2>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">
                تمكين كل امرأة من اتخاذ قرارات صحية واثقة مبنية على معلومات موثوقة.
              </p>
            </m.div>

            <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-8 border border-white/40 shadow-sm hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-[1.25rem] bg-secondary/80 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-secondary/50">
                <Target className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-black font-display mb-3 text-foreground">رسالتنا</h2>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">
                تقديم تجربة رعاية صحية رقمية إنسانية، بسيطة، وآمنة.
              </p>
            </m.div>

            <m.div variants={fadeUpVariant} className="glass-card rounded-[2rem] p-8 border border-white/40 shadow-sm hover:shadow-[var(--shadow-glow)] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-[1.25rem] bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-inner border border-accent/30">
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-black font-display mb-3 text-foreground">قيمنا</h2>
              <p className="text-base text-muted-foreground leading-relaxed font-medium">
                الخصوصية، الثقة، التمكين، والالتزام العلمي.
              </p>
            </m.div>
          </div>

          <m.div variants={fadeUpVariant} className="text-center glass-panel rounded-[2.5rem] p-10 border border-white/40">
            <Heart className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-black font-display mb-8">هل أنتِ مستعدة لبدء رحلتك؟</h2>
            <Link to="/auth" className="inline-block bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-[1.25rem] font-bold text-lg hover:-translate-y-1 transition-transform shadow-[var(--shadow-glow)] hover:shadow-lg">
              ابدئي الآن
            </Link>
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  )
}
