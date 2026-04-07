import { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Image, ChevronRight, ChevronLeft, Layers,
  Star, Upload, Link2, Video, CheckCircle2, AlertCircle, X,
  Sparkles, TrendingUp, Quote, Play, FileVideo, ArrowRight
} from 'lucide-react';
import { submitReviewToAirtable, ReviewFormData } from '../services/airtable';

const TOTAL_STEPS = 6;

const STEP_META = [
  { icon: User,         label: 'Your Info',   desc: 'Who are you?' },
  { icon: Layers,       label: 'Project',     desc: 'What we built' },
  { icon: TrendingUp,   label: 'Results',     desc: 'The outcome' },
  { icon: Quote,        label: 'Testimonial', desc: 'Your words' },
  { icon: Video,        label: 'Media',       desc: 'Optional video' },
  { icon: CheckCircle2, label: 'Confirm',     desc: 'Review & submit' },
];

const INITIAL_DATA: ReviewFormData = {
  clientName: '',
  companyName: '',
  role: '',
  companyLogoUrl: '',
  projectName: '',
  whatWeBuilt: '',
  problemBefore: '',
  resultsAfter: '',
  metrics: '',
  biggestImpact: '',
  writtenTestimonial: '',
  rating: 5,
  videoUrl: '',
  videoFile: null,
};

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
};

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
      {text}{required && <span className="text-primary ml-1">*</span>}
    </label>
  );
}

const inputCls =
  'w-full bg-[#0f0f0f] border border-[#222] rounded-2xl px-5 py-3.5 text-foreground text-sm placeholder:text-[#444] focus:outline-none focus:border-primary/50 focus:bg-[#111] transition-all duration-200';
const textareaCls = `${inputCls} resize-none`;

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label text={label} required={required} />
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-[#444] leading-relaxed">{hint}</p>}
    </div>
  );
}

function LogoDropzone({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const handle = (file: File) => {
    const r = new FileReader();
    r.onload = e => onChange(e.target?.result as string);
    r.readAsDataURL(file);
  };
  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
      onClick={() => ref.current?.click()}
      className={`flex flex-col items-center justify-center gap-2 h-28 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${drag ? 'border-primary bg-primary/5' : 'border-[#222] hover:border-[#333] bg-[#0a0a0a]'}`}
    >
      <Image className="w-5 h-5 text-[#444]" />
      <span className="text-xs text-[#444]">Drop logo or <span className="text-primary">browse</span></span>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
    </div>
  );
}

function VideoDropzone({ file, onFile }: { file: File | null | undefined; onFile: (f: File) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const handle = (f: File) => { if (f.type.startsWith('video/')) onFile(f); };
  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) handle(f); }}
      onClick={() => ref.current?.click()}
      className={`flex flex-col items-center justify-center gap-3 h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${drag ? 'border-primary bg-primary/5' : 'border-[#222] hover:border-[#333] bg-[#0a0a0a]'}`}
    >
      {file ? (
        <>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FileVideo className="w-5 h-5 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-[#444] mt-0.5">{(file.size / 1024 / 1024).toFixed(1)} MB · Click to change</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center">
            <Play className="w-5 h-5 text-primary ml-0.5" />
          </div>
          <div className="text-center">
            <p className="text-sm text-foreground font-medium">Drop your video here</p>
            <p className="text-xs text-[#444] mt-0.5">or <span className="text-primary">browse files</span> · MP4, MOV, WebM</p>
          </div>
        </>
      )}
      <input ref={ref} type="file" accept="video/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handle(f); }} />
    </div>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hov, setHov] = useState(0);
  const labels = ['Terrible', 'Poor', 'Okay', 'Great', 'Outstanding'];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            type="button"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(0)}
            onClick={() => onChange(i)}
            className="transition-all duration-150 hover:scale-110 active:scale-95"
          >
            <Star className={`w-9 h-9 transition-all duration-150 ${i <= (hov || value) ? 'fill-primary text-primary drop-shadow-[0_0_8px_rgba(196,138,100,0.5)]' : 'text-[#2a2a2a]'}`} />
          </button>
        ))}
      </div>
      <p className="text-xs text-primary font-medium">{labels[(hov || value) - 1]}</p>
    </div>
  );
}

function ReviewSummaryBlock({ title, rows }: { title: string; rows: { label: string; value: React.ReactNode }[] }) {
  const filtered = rows.filter(r => r.value);
  if (!filtered.length) return null;
  return (
    <div className="rounded-2xl border border-[#1a1a1a] overflow-hidden">
      <div className="px-5 py-3 bg-[#0f0f0f] border-b border-[#1a1a1a]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#444]">{title}</span>
      </div>
      <div className="divide-y divide-[#111]">
        {filtered.map((r, i) => (
          <div key={i} className="px-5 py-3.5">
            <p className="text-[10px] uppercase tracking-widest text-[#3a3a3a] mb-1">{r.label}</p>
            <div className="text-sm text-foreground leading-relaxed">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step1({ data, update }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void }) {
  const [logoMode, setLogoMode] = useState<'url' | 'upload'>('url');
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <input type="text" className={inputCls} placeholder="John Smith" value={data.clientName} onChange={e => update('clientName', e.target.value)} />
        </Field>
        <Field label="Role / Title" required>
          <input type="text" className={inputCls} placeholder="CEO, Founder, CTO" value={data.role} onChange={e => update('role', e.target.value)} />
        </Field>
      </div>
      <Field label="Company Name" required>
        <input type="text" className={inputCls} placeholder="Acme Inc." value={data.companyName} onChange={e => update('companyName', e.target.value)} />
      </Field>
      <Field label="Company Logo" hint="Optional — appears alongside your testimonial.">
        <div className="flex gap-2 mb-3">
          {(['url', 'upload'] as const).map(m => (
            <button key={m} type="button" onClick={() => setLogoMode(m)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${logoMode === m ? 'bg-primary text-black' : 'bg-[#111] border border-[#222] text-[#555] hover:border-[#333]'}`}>
              {m === 'url' ? <Link2 className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
              {m === 'url' ? 'Paste URL' : 'Upload'}
            </button>
          ))}
        </div>
        {logoMode === 'url'
          ? <input type="url" className={inputCls} placeholder="https://yourcompany.com/logo.png" value={data.companyLogoUrl} onChange={e => update('companyLogoUrl', e.target.value)} />
          : <LogoDropzone value={data.companyLogoUrl} onChange={v => update('companyLogoUrl', v)} />
        }
        {data.companyLogoUrl && (
          <div className="mt-3 inline-flex items-center gap-3 px-4 py-2.5 bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl">
            <img src={data.companyLogoUrl} alt="preview" className="h-6 w-auto object-contain grayscale opacity-60" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="text-[11px] text-[#444]">Logo preview</span>
          </div>
        )}
      </Field>
    </div>
  );
}

function Step2({ data, update }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void }) {
  return (
    <div className="space-y-6">
      <Field label="Project Name" required>
        <input type="text" className={inputCls} placeholder="e.g. E-commerce SaaS Dashboard" value={data.projectName} onChange={e => update('projectName', e.target.value)} />
      </Field>
      <Field label="What did we build for you?" required hint="Describe the solution in a few sentences.">
        <textarea className={textareaCls} rows={3} placeholder="We built a custom SaaS platform with real-time analytics, user management, and automated billing..." value={data.whatWeBuilt} onChange={e => update('whatWeBuilt', e.target.value)} />
      </Field>
      <Field label="What problem were you facing before?" required hint="The more specific, the more powerful your story.">
        <textarea className={textareaCls} rows={3} placeholder="Our operations were entirely manual. We spent 20+ hours a week on tasks that should have been automated..." value={data.problemBefore} onChange={e => update('problemBefore', e.target.value)} />
      </Field>
    </div>
  );
}

function Step3({ data, update }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void }) {
  return (
    <div className="space-y-6">
      <Field label="What changed after working with us?" required hint="Describe the transformation — time saved, revenue gained, problems solved.">
        <textarea className={textareaCls} rows={3} placeholder="After launch, our onboarding time dropped from 2 weeks to 2 days. The team can now focus on growth..." value={data.resultsAfter} onChange={e => update('resultsAfter', e.target.value)} />
      </Field>
      <Field label="Key metrics or numbers" hint="Optional but powerful. E.g. 40% faster, $10K saved monthly, 3x more users.">
        <input type="text" className={inputCls} placeholder="60% reduction in manual work, 2x revenue in 3 months" value={data.metrics} onChange={e => update('metrics', e.target.value)} />
      </Field>
      <Field label="Biggest single impact?" required>
        <input type="text" className={inputCls} placeholder="We finally launched the product we had been delaying for 2 years" value={data.biggestImpact} onChange={e => update('biggestImpact', e.target.value)} />
      </Field>
    </div>
  );
}

function Step4({ data, update, updateNum }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void; updateNum: (k: keyof ReviewFormData, v: number) => void }) {
  const words = data.writtenTestimonial.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div className="space-y-6">
      <Field label="Your testimonial" required hint="Write as if you're telling a friend. Authentic language always wins.">
        <div className="relative">
          <textarea className={`${textareaCls} pb-8`} rows={7}
            placeholder="Working with Zumetrix Labs was one of the best decisions we made. From day one, they understood our vision and turned it into something our customers love..."
            value={data.writtenTestimonial} onChange={e => update('writtenTestimonial', e.target.value)} />
          <div className="absolute bottom-3 right-4 flex items-center gap-2">
            {words > 0 && words < 30 && <span className="text-[11px] text-amber-500/70">Aim for 30+ words</span>}
            <span className={`text-[11px] font-medium ${words >= 30 ? 'text-primary' : 'text-[#333]'}`}>{words}w</span>
          </div>
        </div>
      </Field>
      <Field label="Overall rating">
        <StarRating value={data.rating} onChange={v => updateNum('rating', v)} />
      </Field>
    </div>
  );
}

function Step5({ data, update, updateFile }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void; updateFile: (f: File | null) => void }) {
  const [mode, setMode] = useState<'upload' | 'link'>(data.videoFile ? 'upload' : 'link');
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['upload', 'link'] as const).map(m => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${mode === m ? 'bg-primary text-black' : 'bg-[#111] border border-[#222] text-[#555] hover:border-[#333]'}`}>
            {m === 'upload' ? <Upload className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            {m === 'upload' ? 'Upload video' : 'Paste link'}
          </button>
        ))}
      </div>
      {mode === 'upload'
        ? <VideoDropzone file={data.videoFile} onFile={f => { updateFile(f); update('videoUrl', ''); }} />
        : <Field label="Video URL" hint="Loom, YouTube, Google Drive, or any shareable link.">
            <input type="url" className={inputCls} placeholder="https://loom.com/share/..." value={data.videoUrl} onChange={e => { update('videoUrl', e.target.value); updateFile(null); }} />
          </Field>
      }
      <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-2xl">
        <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-[#666] leading-relaxed">
          A 60-second phone selfie video is 5x more powerful than text alone. You don't need anything fancy — just speak naturally about your experience.
        </p>
      </div>
    </div>
  );
}

function Step6({ data }: { data: ReviewFormData }) {
  return (
    <div className="space-y-4">
      <ReviewSummaryBlock title="Your Information" rows={[
        { label: 'Name', value: data.clientName },
        { label: 'Role', value: data.role },
        { label: 'Company', value: data.companyName },
        { label: 'Logo', value: data.companyLogoUrl ? <img src={data.companyLogoUrl} alt="logo" className="h-5 w-auto object-contain grayscale opacity-60" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} /> : null },
      ]} />
      <ReviewSummaryBlock title="Project & Results" rows={[
        { label: 'Project', value: data.projectName },
        { label: 'What was built', value: data.whatWeBuilt },
        { label: 'Problem before', value: data.problemBefore },
        { label: 'Results after', value: data.resultsAfter },
        { label: 'Metrics', value: data.metrics },
        { label: 'Biggest impact', value: data.biggestImpact },
      ]} />
      <ReviewSummaryBlock title="Testimonial" rows={[
        { label: 'Rating', value: (
          <div className="flex gap-1 mt-0.5">
            {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= data.rating ? 'fill-primary text-primary' : 'text-[#2a2a2a]'}`} />)}
          </div>
        )},
        { label: 'Your testimonial', value: data.writtenTestimonial },
        { label: 'Video', value: data.videoFile ? `${data.videoFile.name}` : data.videoUrl || null },
      ]} />
    </div>
  );
}

function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center gap-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 }}
        className="relative"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-primary/30"
        />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-3xl font-bold text-foreground mb-3">Thank you so much.</h2>
        <p className="text-[#555] text-sm max-w-xs leading-relaxed mx-auto">
          Your testimonial has been saved. We deeply appreciate you taking the time — it means everything to us.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="flex items-center gap-2 px-5 py-3 bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs text-[#444]">Your review will appear on our website after approval.</span>
      </motion.div>
    </motion.div>
  );
}

export default function ReviewPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<ReviewFormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = useCallback((k: keyof ReviewFormData, v: string) => setData(p => ({ ...p, [k]: v })), []);
  const updateNum = useCallback((k: keyof ReviewFormData, v: number) => setData(p => ({ ...p, [k]: v })), []);
  const updateFile = useCallback((f: File | null) => setData(p => ({ ...p, videoFile: f })), []);

  const validate = (): string => {
    if (step === 1) {
      if (!data.clientName.trim()) return 'Please enter your full name.';
      if (!data.role.trim()) return 'Please enter your role or title.';
      if (!data.companyName.trim()) return 'Please enter your company name.';
    }
    if (step === 2) {
      if (!data.projectName.trim()) return 'Please enter the project name.';
      if (!data.whatWeBuilt.trim()) return 'Please describe what we built.';
      if (!data.problemBefore.trim()) return 'Please describe the problem before.';
    }
    if (step === 3) {
      if (!data.resultsAfter.trim()) return 'Please describe the results.';
      if (!data.biggestImpact.trim()) return 'Please share the biggest impact.';
    }
    if (step === 4) {
      if (!data.writtenTestimonial.trim()) return 'Please write your testimonial.';
      const words = data.writtenTestimonial.trim().split(/\s+/).filter(Boolean).length;
      if (words < 10) return 'Please write at least 10 words.';
    }
    return '';
  };

  const next = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setDir(1);
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
  };

  const prev = () => {
    setError('');
    setDir(-1);
    setStep(s => Math.max(s - 1, 1));
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const result = await submitReviewToAirtable(data);
    setSubmitting(false);
    if (result.success) setSubmitted(true);
    else setError(result.error || 'Something went wrong. Please try again.');
  };

  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
  const stepProps = { data, update };

  return (
    <>
      <Helmet>
        <title>Share Your Experience | Zumetrix Labs</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#080808] flex">
        {/* LEFT PANEL — desktop only */}
        <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] shrink-0 flex-col justify-between p-12 border-r border-[#111] bg-[#060606]">
          <div>
            <div className="flex items-center gap-2.5 mb-14">
              <img src="/logo/Logo Icon.png" alt="Zumetrix Labs" className="h-8 w-auto" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="text-sm font-semibold text-foreground tracking-tight">Zumetrix Labs</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">
              Share your<br /><span className="text-primary">experience</span>
            </h1>
            <p className="text-[#444] text-sm leading-relaxed mb-12 max-w-xs">
              Your story helps other founders make the right decision. It takes about 5 minutes.
            </p>

            {/* Step list */}
            <div className="space-y-1">
              {STEP_META.map((s, i) => {
                const idx = i + 1;
                const done = idx < step;
                const active = idx === step;
                const Icon = s.icon;
                return (
                  <div key={i} className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-[#0f0f0f] border border-[#1a1a1a]' : ''}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${done ? 'bg-primary/15 text-primary' : active ? 'bg-primary text-black' : 'bg-[#111] text-[#333]'}`}>
                      {done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium leading-none mb-0.5 transition-colors duration-300 ${active ? 'text-foreground' : done ? 'text-[#444]' : 'text-[#2a2a2a]'}`}>{s.label}</p>
                      <p className={`text-[11px] transition-colors duration-300 ${active ? 'text-[#555]' : 'text-[#2a2a2a]'}`}>{s.desc}</p>
                    </div>
                    {done && <ArrowRight className="w-3.5 h-3.5 text-primary/40 ml-auto" />}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-[#2a2a2a]">Zumetrix Labs · Private & Confidential</p>
        </div>

        {/* RIGHT PANEL — form */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <div className="px-6 sm:px-10 py-5 flex items-center gap-4 border-b border-[#0f0f0f]">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 lg:hidden mr-auto">
              <img src="/logo/Logo Icon.png" alt="" className="h-6 w-auto" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="text-xs font-semibold text-foreground">Zumetrix Labs</span>
            </div>
            <div className="flex items-center gap-3 ml-auto lg:ml-0 lg:w-full">
              <span className="text-xs text-[#333] whitespace-nowrap">{step} / {TOTAL_STEPS}</span>
              <div className="flex-1 h-px bg-[#111] rounded-full overflow-hidden min-w-[80px] sm:min-w-[160px]">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className="text-xs font-semibold text-primary whitespace-nowrap">{pct}%</span>
            </div>
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
              <AnimatePresence mode="wait" custom={dir}>
                {submitted ? (
                  <SuccessScreen key="success" />
                ) : (
                  <motion.div
                    key={step}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Step header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                          {(() => { const Icon = STEP_META[step - 1].icon; return <Icon className="w-3.5 h-3.5 text-primary" />; })()}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{STEP_META[step - 1].label}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug">
                        {step === 1 && <>Who are <span className="text-primary">you?</span></>}
                        {step === 2 && <>About the <span className="text-primary">project</span></>}
                        {step === 3 && <>The <span className="text-primary">results</span></>}
                        {step === 4 && <>Your <span className="text-primary">testimonial</span></>}
                        {step === 5 && <>Video <span className="text-primary">testimonial</span></>}
                        {step === 6 && <>Review & <span className="text-primary">submit</span></>}
                      </h2>
                      <p className="text-sm text-[#444] mt-1.5">
                        {step === 1 && 'Your name and company will appear with your testimonial.'}
                        {step === 2 && 'Help us tell the story of what we built together.'}
                        {step === 3 && "Numbers and outcomes make your story 10x more compelling."}
                        {step === 4 && 'Write as if you are telling a trusted friend. Be real.'}
                        {step === 5 && 'Optional — but incredibly powerful. Even a phone video works.'}
                        {step === 6 && 'Take a final look before we save your review.'}
                      </p>
                    </div>

                    {/* Step body */}
                    {step === 1 && <Step1 {...stepProps} />}
                    {step === 2 && <Step2 {...stepProps} />}
                    {step === 3 && <Step3 {...stepProps} />}
                    {step === 4 && <Step4 data={data} update={update} updateNum={updateNum} />}
                    {step === 5 && <Step5 data={data} update={update} updateFile={updateFile} />}
                    {step === 6 && <Step6 data={data} />}

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-3 mt-6 p-4 bg-red-500/8 border border-red-500/20 rounded-2xl"
                        >
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <p className="text-sm text-red-400 flex-1">{error}</p>
                          <button onClick={() => setError('')}><X className="w-4 h-4 text-red-400/50 hover:text-red-400" /></button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#0f0f0f]">
                      {step > 1 ? (
                        <button type="button" onClick={prev}
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#1a1a1a] text-sm text-[#444] hover:text-foreground hover:border-[#2a2a2a] transition-all duration-200">
                          <ChevronLeft className="w-4 h-4" />
                          Back
                        </button>
                      ) : <div />}

                      {step < TOTAL_STEPS ? (
                        <button type="button" onClick={next}
                          className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-primary text-black text-sm font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_24px_rgba(196,138,100,0.25)]">
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button type="button" onClick={submit} disabled={submitting}
                          className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-primary text-black text-sm font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shadow-[0_0_24px_rgba(196,138,100,0.25)] disabled:opacity-50 disabled:cursor-not-allowed">
                          {submitting ? (
                            <><div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />Submitting...</>
                          ) : (
                            <><CheckCircle2 className="w-4 h-4" />Submit Review</>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
