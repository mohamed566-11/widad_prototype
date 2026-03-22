// DESIGN DECISION: Soft Futurism + Glassmorphism 2.0
// Styled the Fetal Insights page to feel like an advanced, futuristic medical terminal but with soft, empathetic colors and glass UI.

import { useMemo, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { staggerContainer, fadeUpVariant, scaleIn } from '@/lib/animations';
import { ScanFace, Activity, CalendarDays, FileText, ChevronLeft, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

const SCAN_HISTORY = [
  { id: 's1', date: '2026-02-18', title: 'Ø³ÙˆÙ†Ø§Ø± Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ù†Ù…Ùˆ', summary: 'Ø§Ù„Ù†Ù…Ùˆ Ù…ØªÙˆØ§ÙÙ‚ Ù…Ø¹ Ø§Ù„Ø¹Ù…Ø± Ø§Ù„Ø­Ù…Ù„ÙŠ. ÙƒØ§ÙØ© Ø§Ù„Ù…Ø¤Ø´Ø±Ø§Øª Ø§Ù„Ø­ÙŠÙˆÙŠØ© Ù…Ù…ØªØ§Ø²Ø©.' },
  { id: 's2', date: '2026-03-05', title: 'Ø³ÙˆÙ†Ø§Ø± ØªÙØµÙŠÙ„ÙŠ', summary: 'Ø§Ù„Ø­Ø±ÙƒØ© Ø¬ÙŠØ¯Ø© ÙˆÙ„Ø§ ØªÙˆØ¬Ø¯ Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ù…Ù‚Ù„Ù‚Ø©. Ø§Ù„Ø³Ø§Ø¦Ù„ Ø§Ù„Ø£Ù…Ù†ÙŠÙˆØ³ÙŠ Ø¶Ù…Ù† Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠ.' },
  { id: 's3', date: '2026-03-19', title: 'Ø³ÙˆÙ†Ø§Ø± Ù†Ø¨Ø¶ ÙˆØ¯ÙˆØ¨Ù„Ø±', summary: 'ØªØ¯ÙÙ‚ Ø§Ù„Ø¯Ù… Ø¶Ù…Ù† Ø§Ù„Ø­Ø¯ÙˆØ¯ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ©. Ø§Ù„Ù†Ø¨Ø¶ Ù…Ù†ØªØ¸Ù… ÙˆÙ‚ÙˆÙŠ.' },
];

type ViewerMode = 'front' | 'side' | 'top';

export default function FetalInsights() {
  const { user } = useAuthStore();
  const [selectedScanId, setSelectedScanId] = useState(SCAN_HISTORY[0].id);
  const [viewerMode, setViewerMode] = useState<ViewerMode>('front');

  const selectedScan = useMemo(
    () => SCAN_HISTORY.find((scan) => scan.id === selectedScanId) ?? SCAN_HISTORY[0],
    [selectedScanId]
  );

  const twins = user?.mockData?.fetalData;
  const fetusList = twins
    ? [twins.twin1, twins.twin2].filter(Boolean)
    : [{ name: 'Ø§Ù„Ø¬Ù†ÙŠÙ† Ø§Ù„Ø£ÙˆÙ„', weight: '780 Ø¬Ø±Ø§Ù…', heartRate: 146 }];

  return (
    <LazyMotion features={domAnimation}>
      <m.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-6xl mx-auto pb-10 space-y-8" dir="rtl">
        
        {/* Header Hero */}
        <m.div variants={fadeUpVariant} className="flex flex-col md:flex-row items-start md:items-end justify-between flex-wrap gap-6 relative">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold text-sm mb-3 border border-primary/20 shadow-sm">
              <BrainCircuit className="w-4 h-4 animate-pulse" />
              Vision AI Preview
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-foreground drop-shadow-sm mb-2">ØªØ­Ù„ÙŠÙ„ Ø§Ù„Ø³ÙˆÙ†Ø§Ø± Ø§Ù„Ø¬Ù†ÙŠÙ†ÙŠ</h1>
            <p className="text-lg text-muted-foreground max-w-xl">Ù‚Ø±Ø§Ø¡Ø© Ù…Ø¨Ø³Ø·Ø© ÙˆÙ…Ø¯Ø¹ÙˆÙ…Ø© Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ù„Ø¢Ø®Ø± Ø§Ù„ÙØ­ÙˆØµØ§Øª Ù…Ø¹ Ø¹Ø±Ø¶ Ø«Ù„Ø§Ø«ÙŠ Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯ ØªØ¬Ø±ÙŠØ¨ÙŠ.</p>
          </div>
          
          <div className="relative z-10 glass-card px-6 py-4 rounded-2xl border border-primary/20 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shadow-inner">
               <CalendarDays className="w-6 h-6 text-primary" />
             </div>
             <div>
               <p className="text-sm font-bold text-muted-foreground">Ø£Ø³Ø¨ÙˆØ¹ Ø§Ù„Ø­Ù…Ù„</p>
               <p className="text-2xl font-black font-display text-primary">{user?.pregnancyWeek ?? 26}</p>
             </div>
          </div>
        </m.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            
            {/* 3D Viewer Mock */}
            <m.section variants={scaleIn} className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-border shadow-[var(--shadow-glass)] relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
                <h2 className="text-xl md:text-2xl font-black font-display text-foreground flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-xl shadow-inner border border-border"><ScanFace className="w-6 h-6 text-foreground" /></div>
                  Ø§Ù„Ø¹Ø§Ø±Ø¶ Ø«Ù„Ø§Ø«ÙŠ Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯ <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20 font-bold ml-2 -translate-y-2 inline-block">BETA</span>
                </h2>
                <div className="flex bg-secondary/50 p-1 rounded-xl border border-border/50 backdrop-blur-sm self-stretch sm:self-auto">
                  {[
                    { id: 'front', label: 'Ø£Ù…Ø§Ù…ÙŠ' },
                    { id: 'side', label: 'Ø¬Ø§Ù†Ø¨ÙŠ' },
                    { id: 'top', label: 'Ø¹Ù„ÙˆÙŠ' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setViewerMode(item.id as ViewerMode)}
                      className={cn(
                        "rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300 flex-1 sm:flex-none",
                        viewerMode === item.id
                          ? 'bg-white dark:bg-black text-foreground shadow-sm border border-border/50'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-black/30'
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-80 md:h-96 rounded-[2rem] border border-border/50 bg-black/5 dark:bg-black/40 relative overflow-hidden group/viewer shadow-inner">
                {/* 3D Mock Environment */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
                
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-700",
                    viewerMode === 'front' ? 'scale-100 rotate-0' : viewerMode === 'side' ? 'scale-105 rotate-12 drop-shadow-2xl' : 'scale-95 -rotate-6'
                  )}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}

                  <div className="relative w-56 h-56 md:w-64 md:h-64 group-hover/viewer:scale-105 transition-transform duration-1000">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 blur-[30px] opacity-60 mix-blend-multiply dark:mix-blend-screen animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-white/10 dark:bg-black/10 border border-white/30 dark:border-white/10 backdrop-blur-sm shadow-[inset_0_0_50px_rgba(255,255,255,0.2)]" />
                    <div className="absolute top-[20%] left-[25%] w-12 h-12 rounded-full bg-primary/40 blur-md animate-pulse delay-75" />
                    <div className="absolute bottom-[25%] right-[25%] w-16 h-16 rounded-full bg-accent/40 blur-lg animate-pulse delay-150" />
                    <div className="absolute top-[40%] right-[30%] w-8 h-8 rounded-full bg-white/20 blur-sm mix-blend-overlay" />
                    
                    {/* Faux scanning lines */}
                    <div className="absolute inset-0 overflow-hidden rounded-full rounded-b-none opacity-50">
                        <div className="w-full h-1 bg-white/40 blur-[1px] shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[scan_3s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>

                {/* Overlays */}
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="glass-card rounded-xl px-3 py-1.5 text-xs font-bold text-primary flex items-center gap-1.5 border border-primary/20 shadow-sm">
                     <div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div>
                     Live Scan
                   </div>
                </div>
                
                <div className="absolute bottom-4 right-4 glass-card rounded-xl p-3 border border-border/50 text-xs font-medium text-foreground max-w-[200px]">
                   <p className="flex justify-between border-b border-border/50 pb-1 mb-1"><span>BPD:</span> <span className="font-bold">62 mm</span></p>
                   <p className="flex justify-between border-b border-border/50 pb-1 mb-1"><span>HC:</span> <span className="font-bold">230 mm</span></p>
                   <p className="flex justify-between"><span>AC:</span> <span className="font-bold">210 mm</span></p>
                </div>
              </div>
            </m.section>

            {/* Current Measurements */}
            <m.section variants={fadeUpVariant} className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-border shadow-sm">
              <h2 className="text-xl md:text-2xl font-black font-display text-foreground mb-6 flex items-center gap-3">
                 <div className="p-2 bg-secondary rounded-xl shadow-inner border border-border"><Activity className="w-6 h-6 text-foreground" /></div>
                 Ø§Ù„Ù‚ÙŠØ§Ø³Ø§Øª Ø§Ù„Ø­ÙŠÙˆÙŠØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ©
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {fetusList.map((fetus: any, index: number) => (
                  <div key={fetus.name} className="glass-card rounded-[1.5rem] border border-border p-5 space-y-4 hover:border-primary/30 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[30px] pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
                    
                    <div className="flex justify-between items-center relative z-10">
                      <p className="font-black font-display text-lg text-foreground flex items-center gap-2">
                        <span className="text-2xl">ðŸ‘¶</span> {fetus.name}
                      </p>
                      <span className="font-bold text-sm bg-secondary px-2 py-1 rounded-lg text-muted-foreground border border-border/50">#0{index + 1}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 relative z-10">
                       <div className="bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-border/50">
                         <p className="text-xs font-bold text-muted-foreground mb-1">Ø§Ù„ÙˆØ²Ù† Ø§Ù„ØªÙ‚Ø¯ÙŠØ±ÙŠ</p>
                         <p className="text-lg font-black font-display text-foreground">{fetus.weight}</p>
                       </div>
                       <div className="bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-border/50">
                         <p className="text-xs font-bold text-muted-foreground mb-1">Ù…Ø¹Ø¯Ù„ Ø§Ù„Ù†Ø¨Ø¶</p>
                         <p className="text-lg font-black font-display text-foreground flex items-baseline gap-1">
                           {fetus.heartRate} <span className="text-xs text-muted-foreground">bpm</span>
                         </p>
                       </div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between text-xs font-bold text-muted-foreground mb-1">
                        <span>Ù…Ø³ØªÙˆÙ‰ Ø§Ù„Ù†Ø¨Ø¶</span>
                        <span>{Math.round((Number(fetus.heartRate) / 180) * 100)}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-secondary overflow-hidden border border-border/50 p-px">
                        <m.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (Number(fetus.heartRate) / 180) * 100)}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </m.section>
          </div>

          <div className="space-y-6 md:space-y-8">
            
            {/* History */}
            <m.section variants={fadeUpVariant} className="glass-panel p-6 rounded-[2.5rem] border border-border shadow-sm">
              <h3 className="text-xl font-black font-display text-foreground mb-4 flex items-center gap-3">
                 <div className="p-2 bg-secondary rounded-xl shadow-inner border border-border"><FileText className="w-5 h-5 text-foreground" /></div>
                 Ø³Ø¬Ù„ Ø§Ù„ÙØ­ÙˆØµØ§Øª
              </h3>
              <div className="space-y-3">
                {SCAN_HISTORY.map((scan) => (
                  <button
                    key={scan.id}
                    onClick={() => setSelectedScanId(scan.id)}
                    className={cn(
                      "w-full text-right rounded-[1.25rem] border p-4 transition-all duration-300 flex items-center justify-between group",
                      selectedScan.id === scan.id
                        ? 'border-primary/50 bg-primary/5 shadow-sm ring-1 ring-primary/20'
                        : 'border-border bg-white/30 dark:bg-black/20 hover:bg-white/60 dark:hover:bg-black/40 hover:border-primary/30'
                    )}
                  >
                    <div>
                      <p className={cn("text-base font-bold font-display mb-1 transition-colors", selectedScan.id === scan.id ? 'text-primary' : 'text-foreground')}>{scan.title}</p>
                      <p className="text-xs font-bold text-muted-foreground">{scan.date}</p>
                    </div>
                    <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", selectedScan.id === scan.id ? 'text-primary translate-x-1' : 'text-muted-foreground group-hover:translate-x-1')} />
                  </button>
                ))}
              </div>
            </m.section>

            {/* Summary details */}
            <m.section variants={fadeUpVariant} className="glass-panel p-6 rounded-[2.5rem] border border-border shadow-sm space-y-5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none"></div>
               
              <h3 className="text-xl font-black font-display text-foreground flex items-center gap-3 relative z-10">
                 <div className="p-1.5 bg-primary/10 rounded-lg shadow-sm border border-primary/20"><BrainCircuit className="w-5 h-5 text-primary" /></div>
                 Ù…Ù„Ø®Øµ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ
              </h3>
              
              <div className="rounded-[1.25rem] bg-white/50 dark:bg-black/20 border border-border p-5 relative z-10 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-3">
                   <p className="text-base font-black font-display text-foreground">{selectedScan.title}</p>
                   <span className="text-xs font-bold bg-secondary px-2 py-1 rounded-md text-muted-foreground">{selectedScan.date}</span>
                </div>
                <p className="text-sm font-medium text-foreground leading-relaxed">{selectedScan.summary}</p>
              </div>
              
              <div className="rounded-[1.25rem] bg-gradient-to-r from-emerald-500/10 to-green-500/5 border border-emerald-500/20 p-5 relative z-10 shadow-sm">
                <p className="font-black font-display text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                   <span className="text-xl">ðŸ’¡</span> ØªÙˆØµÙŠØ© ÙˆØ¯Ø§Ø¯
                </p>
                <p className="text-sm font-medium text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
                  Ø§Ø³ØªÙ…Ø±ÙŠ Ø¹Ù„Ù‰ Ù†ÙØ³ Ù†Ù…Ø· Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø©ØŒ ÙˆÙƒØ±Ø±ÙŠ Ø§Ù„Ø³ÙˆÙ†Ø§Ø± Ø®Ù„Ø§Ù„ Ø£Ø³Ø¨ÙˆØ¹ÙŠÙ† Ø£Ùˆ Ø­Ø³Ø¨ ØªÙˆØµÙŠØ© Ø§Ù„Ø·Ø¨ÙŠØ¨Ø© Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø©.
                </p>
              </div>
            </m.section>
            
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
}
