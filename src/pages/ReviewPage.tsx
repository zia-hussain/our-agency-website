import { useState, useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Upload, CheckCircle2, AlertCircle, X,
  Sparkles, Play, FileVideo, ArrowRight, ChevronLeft
} from 'lucide-react';
import { submitReviewToAirtable, ReviewFormData } from '../services/airtable';

const PROJECT_TYPES = ['SaaS Product', 'Mobile App', 'Web App', 'AI / Automation', 'MVP', 'E-commerce', 'Custom Software', 'Other'];
const SERVICES_LIST = ['Full-Stack Development', 'Mobile App Development', 'AI & Automation', 'MVP Development', 'UI/UX Design', 'Strategy & Consulting', 'API Integration', 'Other'];

type FormState = {
  clientName: string;
  title: string;
  companyName: string;
  companyLogoUrl: string;
  country: string;
  projectName: string;
  projectDescription: string;
  projectType: string;
  servicesReceived: string;
  projectStartDate: string;
  projectEndDate: string;
  problemSolved: string;
  outcomes: string;
  keyMetricsOrWins: string;
  writtenTestimonial: string;
  starRating: number;
  videoTestimonialUrl: string;
  videoFile: File | null;
};

const INITIAL_DATA: FormState = {
  clientName: '',
  title: '',
  companyName: '',
  companyLogoUrl: '',
  country: '',
  projectName: '',
  projectDescription: '',
  projectType: '',
  servicesReceived: '',
  projectStartDate: '',
  projectEndDate: '',
  problemSolved: '',
  outcomes: '',
  keyMetricsOrWins: '',
  writtenTestimonial: '',
  starRating: 5,
  videoTestimonialUrl: '',
  videoFile: null,
};

const STEPS = [
  { id: 'name',        step: '01', question: "First, what's your name?",                    sub: "We'll display this with your review." },
  { id: 'role',        step: '02', question: "What's your role and company?",                sub: "Helps others understand your perspective." },
  { id: 'location',    step: '03', question: "Where are you based?",                         sub: "Country — shown with your review." },
  { id: 'project',     step: '04', question: "What did we build together?",                  sub: "Give it a name, a type, and a brief description." },
  { id: 'services',    step: '05', question: "Which services did you receive?",              sub: "Select all that apply." },
  { id: 'timeline',    step: '06', question: "When did the project run?",                    sub: "Approximate dates are fine." },
  { id: 'problem',     step: '07', question: "What was breaking before we worked together?", sub: "Be honest — the messier, the more relatable." },
  { id: 'outcomes',    step: '08', question: "What changed after we delivered?",             sub: "Numbers, feelings, outcomes — all welcome." },
  { id: 'testimonial', step: '09', question: "Now write your testimonial.",                  sub: "Pretend you're telling a friend. Be real." },
  { id: 'rating',      step: '10', question: "How would you rate working with us?",          sub: "No pressure — honest feedback helps us grow." },
  { id: 'video',       step: '11', question: "Got 60 seconds? Record a quick video.",        sub: "Optional, but 5x more powerful than text." },
  { id: 'done',        step: '12', question: "You're all done.",                             sub: "Take a look — then hit submit." },
];

const inputBase =
  'w-full bg-transparent border-0 border-b-2 border-[#C48A64]/20 pb-3 text-[#EDEDED] text-xl sm:text-2xl font-light placeholder:text-[#EDEDED]/15 focus:outline-none focus:border-[#C48A64]/60 transition-colors duration-300 leading-relaxed';

const textareaBase =
  'w-full bg-transparent border-0 border-b-2 border-[#C48A64]/20 pb-3 text-[#EDEDED] text-lg sm:text-xl font-light placeholder:text-[#EDEDED]/15 focus:outline-none focus:border-[#C48A64]/60 transition-colors duration-300 leading-relaxed resize-none';

const pillActive = 'border-[#C48A64]/50 text-[#C48A64] bg-[#C48A64]/8';
const pillInactive = 'border-[#1E1E1E] text-[#EDEDED]/25 hover:border-[#C48A64]/25 hover:text-[#EDEDED]/50';

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hov, setHov] = useState(0);
  const labels = ['', 'Regret it', 'It was okay', 'Pretty good', 'Loved it', 'Life-changing'];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i} type="button"
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(0)} onClick={() => onChange(i)}
            className="transition-all duration-200 hover:scale-125 active:scale-95 focus:outline-none"
          >
            <Star strokeWidth={1.5}
              className={`w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ${
                i <= (hov || value)
                  ? 'fill-[#C48A64] text-[#C48A64] drop-shadow-[0_0_16px_rgba(196,138,100,0.5)]'
                  : 'text-[#EDEDED]/10'
              }`}
            />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={hov || value} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} className="text-[#C48A64]/70 text-base font-light">
          {labels[hov || value] || 'Tap a star'}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function MultiSelect({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  const selected = value ? value.split(', ').filter(Boolean) : [];
  const toggle = (opt: string) => {
    const next = selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt];
    onChange(next.join(', '));
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => toggle(opt)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${selected.includes(opt) ? pillActive : pillInactive}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function LogoSection({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [mode, setMode] = useState<'skip' | 'url' | 'upload'>('skip');
  const ref = useRef<HTMLInputElement>(null);
  const handle = (file: File) => {
    const r = new FileReader();
    r.onload = e => onChange(e.target?.result as string);
    r.readAsDataURL(file);
  };
  return (
    <div className="mt-8 space-y-4">
      <p className="text-[#EDEDED]/25 text-sm uppercase tracking-widest">Company logo <span className="normal-case">(optional)</span></p>
      <div className="flex gap-2 flex-wrap">
        {(['skip', 'url', 'upload'] as const).map(m => (
          <button key={m} type="button" onClick={() => { setMode(m); if (m !== 'url') onChange(''); }}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${mode === m ? pillActive : pillInactive}`}>
            {m === 'skip' ? 'Skip' : m === 'url' ? 'Paste URL' : 'Upload file'}
          </button>
        ))}
      </div>
      {mode === 'url' && (
        <input type="url" className={`${inputBase} text-base sm:text-lg`} placeholder="https://example.com/logo.png"
          value={value} onChange={e => onChange(e.target.value)} />
      )}
      {mode === 'upload' && (
        <div onClick={() => ref.current?.click()}
          className="flex items-center gap-4 p-4 border border-dashed border-[#C48A64]/15 rounded-2xl cursor-pointer hover:border-[#C48A64]/30 transition-colors duration-200">
          <div className="w-10 h-10 rounded-xl bg-[#C48A64]/6 flex items-center justify-center">
            <Upload className="w-4 h-4 text-[#C48A64]/50" />
          </div>
          <div>
            <p className="text-[#EDEDED]/50 text-sm">Click to upload</p>
            <p className="text-[#EDEDED]/20 text-xs">PNG, JPG, SVG — max 2MB</p>
          </div>
          <input ref={ref} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
        </div>
      )}
      {value && mode !== 'skip' && (
        <div className="flex items-center gap-3">
          <img src={value} alt="preview" className="h-8 w-auto object-contain opacity-60 grayscale"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span className="text-[#EDEDED]/20 text-xs">Preview</span>
        </div>
      )}
    </div>
  );
}

function VideoSection({ file, url, onFile, onUrl }: {
  file: File | null | undefined; url: string; onFile: (f: File | null) => void; onUrl: (v: string) => void;
}) {
  const [mode, setMode] = useState<'skip' | 'link' | 'upload'>('skip');
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(['skip', 'link', 'upload'] as const).map(m => (
          <button key={m} type="button" onClick={() => { setMode(m); if (m === 'skip') { onFile(null); onUrl(''); } }}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${mode === m ? pillActive : pillInactive}`}>
            {m === 'skip' ? 'Skip for now' : m === 'link' ? 'Paste Loom / YouTube' : 'Upload video'}
          </button>
        ))}
      </div>
      {mode === 'link' && (
        <input type="url" className={`${inputBase} text-base sm:text-lg`} placeholder="https://loom.com/share/..."
          value={url} onChange={e => { onUrl(e.target.value); onFile(null); }} />
      )}
      {mode === 'upload' && (
        !file ? (
          <div
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('video/')) onFile(f); }}
            onClick={() => ref.current?.click()}
            className={`flex flex-col items-center gap-4 py-12 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${drag ? 'border-[#C48A64]/40 bg-[#C48A64]/4' : 'border-[#1E1E1E] hover:border-[#C48A64]/20'}`}
          >
            <div className="w-16 h-16 rounded-2xl bg-[#C48A64]/6 flex items-center justify-center">
              <Play className="w-7 h-7 text-[#C48A64]/40 ml-0.5" />
            </div>
            <div className="text-center">
              <p className="text-[#EDEDED]/40 text-base">Drop your video here or <span className="text-[#C48A64]/70">browse</span></p>
              <p className="text-[#EDEDED]/20 text-sm mt-1">MP4, MOV, WebM — max 500MB</p>
            </div>
            <input ref={ref} type="file" accept="video/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
          </div>
        ) : (
          <div className="flex items-center gap-4 p-5 bg-[#C48A64]/4 border border-[#C48A64]/15 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-[#C48A64]/8 flex items-center justify-center shrink-0">
              <FileVideo className="w-5 h-5 text-[#C48A64]/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#EDEDED]/80 text-sm font-medium truncate">{file.name}</p>
              <p className="text-[#EDEDED]/30 text-xs mt-0.5">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
            </div>
            <button type="button" onClick={() => onFile(null)} className="text-[#EDEDED]/20 hover:text-[#EDEDED]/50 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      )}
      {mode !== 'skip' && (
        <div className="flex items-start gap-3 py-4">
          <Sparkles className="w-4 h-4 text-[#C48A64]/50 shrink-0 mt-0.5" />
          <p className="text-[#EDEDED]/25 text-sm leading-relaxed">
            A 60-second selfie video converts 5x better than text. No script needed — just speak naturally.
          </p>
        </div>
      )}
    </div>
  );
}

function ReviewSummary({ data }: { data: FormState }) {
  const items = [
    { label: 'Name',     value: data.clientName },
    { label: 'Title',    value: `${data.title}${data.companyName ? ` · ${data.companyName}` : ''}` },
    { label: 'Country',  value: data.country },
    { label: 'Project',  value: data.projectName },
    { label: 'Type',     value: data.projectType },
    { label: 'Services', value: data.servicesReceived },
    { label: 'Problem',  value: data.problemSolved },
    { label: 'Outcomes', value: data.outcomes },
    { label: 'Review',   value: data.writtenTestimonial },
    { label: 'Video',    value: data.videoFile ? data.videoFile.name : data.videoTestimonialUrl || null },
  ].filter(i => i.value);

  return (
    <div className="space-y-0 border border-[#1E1E1E] rounded-3xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4 px-6 py-4 border-b border-[#1E1E1E] last:border-0">
          <span className="text-[#C48A64]/40 text-sm w-20 shrink-0 pt-0.5">{item.label}</span>
          <span className="text-[#EDEDED]/70 text-sm leading-relaxed flex-1 line-clamp-2">{item.value}</span>
        </div>
      ))}
      <div className="flex gap-4 px-6 py-4">
        <span className="text-[#C48A64]/40 text-sm w-20 shrink-0 pt-1">Rating</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} className={`w-4 h-4 ${i <= data.starRating ? 'fill-[#C48A64] text-[#C48A64]' : 'text-[#EDEDED]/10'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-[#0C0C0C] px-6 text-center">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="relative mb-10">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#C48A64]/10 to-[#C48A64]/0 border border-[#C48A64]/20 flex items-center justify-center">
          <CheckCircle2 className="w-14 h-14 text-[#C48A64]" />
        </div>
        {[1, 2, 3].map(i => (
          <motion.div key={i} initial={{ scale: 1, opacity: 0.3 }} animate={{ scale: 1 + i * 0.4, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border border-[#C48A64]/20" />
        ))}
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#EDEDED] mb-4 leading-tight">You're a legend.</h1>
        <p className="text-[#EDEDED]/40 text-lg max-w-sm mx-auto leading-relaxed">
          Your story is now with us. We'll review it and publish it soon — and we genuinely mean thank you.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mt-10 flex items-center gap-2 px-5 py-3 border border-[#C48A64]/15 rounded-full">
        <Sparkles className="w-3.5 h-3.5 text-[#C48A64]/50" />
        <span className="text-[#EDEDED]/25 text-xs">Goes live after our team reviews it</span>
      </motion.div>
    </motion.div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 32 : -32, filter: 'blur(4px)' }),
  center: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24, filter: 'blur(4px)' }),
};

export default function ReviewPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormState>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = useCallback((k: keyof FormState, v: string) => setData(p => ({ ...p, [k]: v })), []);
  const updateNum = useCallback((k: keyof FormState, v: number) => setData(p => ({ ...p, [k]: v })), []);
  const updateFile = useCallback((f: File | null) => setData(p => ({ ...p, videoFile: f })), []);

  const validate = (): string => {
    if (step === 0 && !data.clientName.trim()) return "We'd love to know your name.";
    if (step === 1 && !data.title.trim()) return "Tell us your role / title.";
    if (step === 1 && !data.companyName.trim()) return "What company are you from?";
    if (step === 2 && !data.country.trim()) return "Please enter your country.";
    if (step === 3 && !data.projectName.trim()) return "Give the project a name.";
    if (step === 3 && !data.projectDescription.trim()) return "Add a brief project description.";
    if (step === 3 && !data.projectType.trim()) return "Select a project type.";
    if (step === 4 && !data.servicesReceived.trim()) return "Select at least one service.";
    if (step === 6 && !data.problemSolved.trim()) return "Describe the problem before.";
    if (step === 7 && !data.outcomes.trim()) return "Share what changed.";
    if (step === 8) {
      if (!data.writtenTestimonial.trim()) return "Write your testimonial.";
      const words = data.writtenTestimonial.trim().split(/\s+/).filter(Boolean).length;
      if (words < 8) return "Just a few more words — 8 minimum.";
    }
    return '';
  };

  const next = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setDir(1);
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const prev = () => {
    setError('');
    setDir(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const payload: ReviewFormData = {
      clientName: data.clientName,
      title: data.title,
      companyName: data.companyName,
      country: data.country,
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      projectType: data.projectType,
      servicesReceived: data.servicesReceived,
      projectStartDate: data.projectStartDate,
      projectEndDate: data.projectEndDate,
      problemSolved: data.problemSolved,
      outcomes: data.outcomes,
      keyMetricsOrWins: data.keyMetricsOrWins,
      writtenTestimonial: data.writtenTestimonial,
      starRating: data.starRating,
      videoTestimonialUrl: data.videoTestimonialUrl,
    };
    const result = await submitReviewToAirtable(payload);
    setSubmitting(false);
    if (result.success) setSubmitted(true);
    else setError(result.error || 'Something went wrong. Please try again.');
  };

  const totalSteps = STEPS.length;
  const pct = Math.round((step / (totalSteps - 1)) * 100);
  const current = STEPS[step];
  const isLast = step === totalSteps - 1;

  if (submitted) return <SuccessScreen />;

  return (
    <>
      <Helmet>
        <title>Share Your Experience | Zumetrix Labs</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0C0C0C] flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 sm:px-12 py-5">
          <img src="/logo/Logo horizontal.png" alt="Zumetrix Labs" className="h-10 w-auto select-none"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-1.5 items-center">
              {STEPS.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-500 ${
                  i < step ? 'w-1.5 h-1.5 bg-[#C48A64]/60' : i === step ? 'w-4 h-1.5 bg-[#C48A64]' : 'w-1.5 h-1.5 bg-[#1E1E1E]'
                }`} />
              ))}
            </div>
            <span className="text-[#EDEDED]/20 text-xs sm:hidden">{step + 1} / {totalSteps}</span>
            <span className="text-[#C48A64]/50 text-xs hidden sm:block font-medium">{pct}%</span>
          </div>
        </div>

        {/* Progress line */}
        <div className="relative h-px bg-[#1E1E1E] mx-6 sm:mx-12 rounded-full overflow-hidden">
          <motion.div className="absolute inset-y-0 left-0 bg-[#C48A64]/60 rounded-full"
            animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }} />
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-12">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir} variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}>

                {/* Step label */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 mb-8">
                  <span className="text-xs font-mono text-[#C48A64]/50 tracking-widest">{current.step}</span>
                  <div className="flex-1 h-px bg-[#1E1E1E] rounded-full" />
                  <span className="text-[#EDEDED]/15 text-xs font-mono">{step + 1} of {totalSteps}</span>
                </motion.div>

                {/* Question */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EDEDED] leading-tight tracking-tight mb-3">
                    {current.question}
                  </h2>
                  <p className="text-[#EDEDED]/30 text-base sm:text-lg font-light mb-10">{current.sub}</p>
                </motion.div>

                {/* Step Content */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

                  {step === 0 && (
                    <input autoFocus type="text" className={inputBase} placeholder="Your full name"
                      value={data.clientName} onChange={e => update('clientName', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && next()} />
                  )}

                  {step === 1 && (
                    <div className="space-y-8">
                      <input autoFocus type="text" className={inputBase} placeholder="CEO / Founder / CTO / Product Manager"
                        value={data.title} onChange={e => update('title', e.target.value)} />
                      <input type="text" className={inputBase} placeholder="Company name"
                        value={data.companyName} onChange={e => update('companyName', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && next()} />
                      <LogoSection value={data.companyLogoUrl} onChange={v => update('companyLogoUrl', v)} />
                    </div>
                  )}

                  {step === 2 && (
                    <input autoFocus type="text" className={inputBase} placeholder="United States, Pakistan, UAE..."
                      value={data.country} onChange={e => update('country', e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && next()} />
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <input autoFocus type="text" className={inputBase} placeholder="Project name"
                        value={data.projectName} onChange={e => update('projectName', e.target.value)} />
                      <AutoTextarea value={data.projectDescription} onChange={v => update('projectDescription', v)}
                        placeholder="We built a SaaS platform with real-time dashboards and automated billing..." rows={3} />
                      <div>
                        <p className="text-[#EDEDED]/20 text-sm mb-4 uppercase tracking-widest">Project type</p>
                        <div className="flex flex-wrap gap-2">
                          {PROJECT_TYPES.map(t => (
                            <button key={t} type="button" onClick={() => update('projectType', t)}
                              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border ${data.projectType === t ? pillActive : pillInactive}`}>
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <MultiSelect options={SERVICES_LIST} value={data.servicesReceived} onChange={v => update('servicesReceived', v)} />
                  )}

                  {step === 5 && (
                    <div className="space-y-8">
                      <div>
                        <p className="text-[#EDEDED]/20 text-sm mb-3 uppercase tracking-widest">
                          Project start date <span className="normal-case text-[#EDEDED]/12">(optional)</span>
                        </p>
                        <input type="date" className={`${inputBase} text-base sm:text-xl`}
                          value={data.projectStartDate} onChange={e => update('projectStartDate', e.target.value)} />
                      </div>
                      <div>
                        <p className="text-[#EDEDED]/20 text-sm mb-3 uppercase tracking-widest">
                          Project end date <span className="normal-case text-[#EDEDED]/12">(optional)</span>
                        </p>
                        <input type="date" className={`${inputBase} text-base sm:text-xl`}
                          value={data.projectEndDate} onChange={e => update('projectEndDate', e.target.value)} />
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <AutoTextarea autoFocus value={data.problemSolved} onChange={v => update('problemSolved', v)}
                      placeholder="Everything was manual. We were drowning in spreadsheets and losing hours every day..." rows={4} />
                  )}

                  {step === 7 && (
                    <div className="space-y-8">
                      <AutoTextarea autoFocus value={data.outcomes} onChange={v => update('outcomes', v)}
                        placeholder="We cut onboarding time from 3 weeks to 2 days. The team actually enjoys the process now..." rows={4} />
                      <div>
                        <p className="text-[#EDEDED]/20 text-sm mb-3 uppercase tracking-widest">
                          Key metrics or wins <span className="normal-case text-[#EDEDED]/12">(optional)</span>
                        </p>
                        <input type="text" className={`${inputBase} text-base sm:text-xl`}
                          placeholder="60% faster, $12K saved monthly, 3x more users..."
                          value={data.keyMetricsOrWins} onChange={e => update('keyMetricsOrWins', e.target.value)} />
                      </div>
                    </div>
                  )}

                  {step === 8 && (
                    <div className="relative">
                      <AutoTextarea value={data.writtenTestimonial} onChange={v => update('writtenTestimonial', v)}
                        placeholder="Working with Zumetrix Labs was one of the best decisions we've made as a company. They got it on day one..."
                        rows={6} />
                      <div className="absolute bottom-3 right-0 flex items-center gap-2">
                        {(() => {
                          const w = data.writtenTestimonial.trim().split(/\s+/).filter(Boolean).length;
                          return (
                            <>
                              {w > 0 && w < 30 && <span className="text-[#C48A64]/50 text-xs">Aim for 30+ words</span>}
                              <span className={`text-xs font-mono ${w >= 30 ? 'text-[#C48A64]/50' : 'text-[#EDEDED]/15'}`}>{w}w</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {step === 9 && (
                    <StarPicker value={data.starRating} onChange={v => updateNum('starRating', v)} />
                  )}

                  {step === 10 && (
                    <VideoSection file={data.videoFile} url={data.videoTestimonialUrl}
                      onFile={updateFile} onUrl={v => update('videoTestimonialUrl', v)} />
                  )}

                  {step === 11 && <ReviewSummary data={data} />}
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }} className="flex items-center gap-3 mt-8 p-4 bg-red-500/6 border border-red-500/15 rounded-2xl">
                      <AlertCircle className="w-4 h-4 text-red-400/70 shrink-0" />
                      <p className="text-red-400/70 text-sm flex-1">{error}</p>
                      <button onClick={() => setError('')}><X className="w-4 h-4 text-red-400/30 hover:text-red-400/60" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                  className="flex items-center justify-between mt-12">
                  {step > 0 ? (
                    <button type="button" onClick={prev}
                      className="flex items-center gap-2 text-[#EDEDED]/20 hover:text-[#EDEDED]/50 text-sm transition-colors duration-200 group">
                      <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                      Back
                    </button>
                  ) : <div />}

                  {!isLast ? (
                    <button type="button" onClick={next}
                      className="group flex items-center gap-3 px-8 py-4 bg-[#C48A64] text-black text-sm font-semibold rounded-full hover:bg-[#DCA973] active:scale-[0.97] transition-all duration-200 shadow-[0_0_32px_rgba(196,138,100,0.2)]">
                      {step === 5 || step === 10 ? 'Skip & Continue' : 'Continue'}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <button type="button" onClick={submit} disabled={submitting}
                      className="group flex items-center gap-3 px-8 py-4 bg-[#C48A64] text-black text-sm font-semibold rounded-full hover:bg-[#DCA973] active:scale-[0.97] transition-all duration-200 shadow-[0_0_32px_rgba(196,138,100,0.2)] disabled:opacity-30 disabled:cursor-not-allowed">
                      {submitting ? (
                        <><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Submitting...</>
                      ) : (
                        <><CheckCircle2 className="w-4 h-4" />Submit my review</>
                      )}
                    </button>
                  )}
                </motion.div>

                {step < totalSteps - 1 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="text-center text-[#EDEDED]/10 text-xs mt-6">
                    Press <span className="font-mono bg-[#1E1E1E] px-1.5 py-0.5 rounded">Enter</span> to continue
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

function AutoTextarea({ autoFocus, value, onChange, placeholder, rows = 4 }: {
  autoFocus?: boolean; value: string; onChange: (v: string) => void; placeholder: string; rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);
  return (
    <textarea ref={ref} autoFocus={autoFocus} className={textareaBase} rows={rows}
      placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
      style={{ minHeight: `${rows * 1.8}rem` }} />
  );
}
