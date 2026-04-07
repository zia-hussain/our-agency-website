import { useState, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Image, ChevronRight, ChevronLeft,
  Star, Upload, Link, Video, CheckCircle2, AlertCircle, X,
  Sparkles, TrendingUp, MessageSquareQuote, Play, FileVideo
} from 'lucide-react';
import { submitReviewToAirtable, ReviewFormData } from '../services/airtable';

const TOTAL_STEPS = 6;

const STEP_META = [
  { icon: User, label: 'Your Info', short: 'Info' },
  { icon: Briefcase, label: 'Project', short: 'Project' },
  { icon: TrendingUp, label: 'Results', short: 'Results' },
  { icon: MessageSquareQuote, label: 'Review', short: 'Review' },
  { icon: Video, label: 'Media', short: 'Media' },
  { icon: CheckCircle2, label: 'Confirm', short: 'Confirm' },
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

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);
  return (
    <div className="w-full h-0.5 bg-border rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      />
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mb-2">
      {STEP_META.map((meta, i) => {
        const idx = i + 1;
        const done = idx < step;
        const active = idx === step;
        return (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`
              flex items-center justify-center rounded-full transition-all duration-300
              ${active ? 'w-8 h-8 bg-primary text-black' : done ? 'w-6 h-6 bg-primary/20 text-primary' : 'w-6 h-6 bg-border text-muted-foreground'}
            `}>
              {done ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className={`font-semibold ${active ? 'text-xs' : 'text-[10px]'}`}>{idx}</span>
              )}
            </div>
            {i < STEP_META.length - 1 && (
              <div className={`w-4 h-px transition-colors duration-300 ${done ? 'bg-primary/40' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldWrapper({ label, hint, children, required }: { label: string; hint?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const inputCls = "w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-sm";
const textareaCls = `${inputCls} resize-none`;

function Step1({ data, update }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void }) {
  const [logoMode, setLogoMode] = useState<'url' | 'upload'>('url');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Tell us about yourself</h2>
        <p className="text-muted-foreground text-sm">Your information will appear with your testimonial.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrapper label="Your Full Name" required>
          <input
            type="text"
            className={inputCls}
            placeholder="e.g. John Smith"
            value={data.clientName}
            onChange={e => update('clientName', e.target.value)}
          />
        </FieldWrapper>
        <FieldWrapper label="Your Role / Title" required>
          <input
            type="text"
            className={inputCls}
            placeholder="e.g. CEO, CTO, Founder"
            value={data.role}
            onChange={e => update('role', e.target.value)}
          />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Company Name" required>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. Acme Inc."
          value={data.companyName}
          onChange={e => update('companyName', e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper label="Company Logo">
        <div className="flex gap-2 mb-3">
          {(['url', 'upload'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setLogoMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${logoMode === m ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:border-primary/40'}`}
            >
              {m === 'url' ? <Link className="w-3 h-3" /> : <Upload className="w-3 h-3" />}
              {m === 'url' ? 'Paste URL' : 'Upload file'}
            </button>
          ))}
        </div>
        {logoMode === 'url' ? (
          <input
            type="url"
            className={inputCls}
            placeholder="https://yourcompany.com/logo.png"
            value={data.companyLogoUrl}
            onChange={e => update('companyLogoUrl', e.target.value)}
          />
        ) : (
          <LogoUploader value={data.companyLogoUrl} onChange={v => update('companyLogoUrl', v)} />
        )}
        {data.companyLogoUrl && (
          <div className="mt-3 flex items-center gap-3 p-3 bg-card border border-border/60 rounded-xl">
            <img src={data.companyLogoUrl} alt="logo preview" className="h-8 w-auto object-contain grayscale opacity-70" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <span className="text-xs text-muted-foreground">Logo preview</span>
          </div>
        )}
      </FieldWrapper>
    </div>
  );
}

function LogoUploader({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => onChange(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      onClick={() => ref.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200 ${dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 bg-card'}`}
    >
      <Image className="w-6 h-6 text-muted-foreground" />
      <span className="text-xs text-muted-foreground text-center">Drag & drop your logo or <span className="text-primary">browse</span></span>
      <span className="text-[10px] text-muted-foreground/60">PNG, SVG, JPG up to 5MB</span>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

function Step2({ data, update }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">About the project</h2>
        <p className="text-muted-foreground text-sm">Help us showcase the work we did together.</p>
      </div>
      <FieldWrapper label="Project Name" required>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. E-commerce SaaS Dashboard"
          value={data.projectName}
          onChange={e => update('projectName', e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper label="What did we build for you?" required hint="Describe the solution, product, or system in a few sentences.">
        <textarea
          className={textareaCls}
          rows={3}
          placeholder="We built a custom SaaS platform with real-time analytics, user management, and automated billing..."
          value={data.whatWeBuilt}
          onChange={e => update('whatWeBuilt', e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper label="What problem were you facing before working with us?" required hint="Be specific — this makes your story compelling.">
        <textarea
          className={textareaCls}
          rows={3}
          placeholder="Our operations were entirely manual. We spent 20+ hours a week on tasks that should have been automated..."
          value={data.problemBefore}
          onChange={e => update('problemBefore', e.target.value)}
        />
      </FieldWrapper>
    </div>
  );
}

function Step3({ data, update }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">The results</h2>
        <p className="text-muted-foreground text-sm">What changed after we worked together? Numbers speak volumes.</p>
      </div>
      <FieldWrapper label="What changed after working with us?" required hint="Describe the transformation — time saved, revenue gained, problems solved.">
        <textarea
          className={textareaCls}
          rows={3}
          placeholder="After launch, our onboarding time dropped from 2 weeks to 2 days. The team can now focus on growth instead of operations..."
          value={data.resultsAfter}
          onChange={e => update('resultsAfter', e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper label="Key metrics or numbers" hint="Optional but powerful. E.g. 40% faster, $10K saved monthly, 3x more users.">
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. 60% reduction in manual work, 2x revenue in 3 months"
          value={data.metrics}
          onChange={e => update('metrics', e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper label="What was the biggest single impact?" required>
        <input
          type="text"
          className={inputCls}
          placeholder="e.g. We finally launched the product we had been delaying for 2 years"
          value={data.biggestImpact}
          onChange={e => update('biggestImpact', e.target.value)}
        />
      </FieldWrapper>
    </div>
  );
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          className="transition-transform duration-150 hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors duration-150 ${i <= (hovered || value) ? 'fill-primary text-primary' : 'text-border'}`}
          />
        </button>
      ))}
    </div>
  );
}

function Step4({ data, update, updateNum }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void; updateNum: (k: keyof ReviewFormData, v: number) => void }) {
  const wordCount = data.writtenTestimonial.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Your testimonial</h2>
        <p className="text-muted-foreground text-sm">In your own words — what would you tell someone considering working with us?</p>
      </div>
      <FieldWrapper label="Your written testimonial" required hint="Write as if you are telling a friend. Authentic language works best.">
        <div className="relative">
          <textarea
            className={`${textareaCls} pr-16`}
            rows={6}
            placeholder="Working with Zumetrix Labs was one of the best decisions we made for our business. From day one, they understood our vision and turned it into a real product that our customers love..."
            value={data.writtenTestimonial}
            onChange={e => update('writtenTestimonial', e.target.value)}
          />
          <span className={`absolute bottom-3 right-3 text-[10px] ${wordCount >= 30 ? 'text-primary' : 'text-muted-foreground'}`}>
            {wordCount} words
          </span>
        </div>
        {wordCount > 0 && wordCount < 30 && (
          <p className="text-xs text-amber-500/80">Aim for at least 30 words — it makes a stronger impression.</p>
        )}
      </FieldWrapper>
      <FieldWrapper label="Overall rating">
        <StarRating value={data.rating} onChange={v => updateNum('rating', v)} />
      </FieldWrapper>
    </div>
  );
}

function VideoUploader({ onFile, file }: { onFile: (f: File) => void; file: File | null | undefined }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File) => {
    if (f.type.startsWith('video/')) onFile(f);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      onClick={() => ref.current?.click()}
      className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200 ${dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40 bg-card'}`}
    >
      {file ? (
        <>
          <div className="flex items-center gap-2 text-primary">
            <FileVideo className="w-6 h-6" />
            <span className="text-sm font-medium">{file.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(1)} MB · Click to change</span>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Play className="w-5 h-5 text-primary ml-0.5" />
          </div>
          <div className="text-center">
            <p className="text-sm text-foreground font-medium">Drop your video here</p>
            <p className="text-xs text-muted-foreground mt-1">or <span className="text-primary">browse files</span></p>
          </div>
          <span className="text-[10px] text-muted-foreground/60">MP4, MOV, WebM · Max 100MB</span>
        </>
      )}
      <input ref={ref} type="file" accept="video/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

function Step5({ data, update, updateFile }: { data: ReviewFormData; update: (k: keyof ReviewFormData, v: string) => void; updateFile: (f: File | null) => void }) {
  const [mode, setMode] = useState<'upload' | 'link'>(data.videoFile ? 'upload' : 'link');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Video testimonial</h2>
        <p className="text-muted-foreground text-sm">Optional — but video testimonials are incredibly powerful. Even a 60-second phone recording is perfect.</p>
      </div>
      <div className="flex gap-2">
        {(['upload', 'link'] as const).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${mode === m ? 'bg-primary text-black' : 'bg-card border border-border text-muted-foreground hover:border-primary/40'}`}
          >
            {m === 'upload' ? <Upload className="w-4 h-4" /> : <Link className="w-4 h-4" />}
            {m === 'upload' ? 'Upload video' : 'Paste link'}
          </button>
        ))}
      </div>
      {mode === 'upload' ? (
        <VideoUploader file={data.videoFile} onFile={f => { updateFile(f); update('videoUrl', ''); }} />
      ) : (
        <FieldWrapper label="Video URL" hint="Loom, YouTube, Google Drive, or any shareable link works.">
          <input
            type="url"
            className={inputCls}
            placeholder="https://loom.com/share/your-video"
            value={data.videoUrl}
            onChange={e => { update('videoUrl', e.target.value); updateFile(null); }}
          />
        </FieldWrapper>
      )}
      <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Video testimonials are 5x more effective than written ones. A simple selfie video talking for 60 seconds about your experience makes a huge impact.
        </p>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string | number | React.ReactNode }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="text-sm text-foreground leading-relaxed">{value}</span>
    </div>
  );
}

function Step6({ data }: { data: ReviewFormData }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Review & submit</h2>
        <p className="text-muted-foreground text-sm">Take a moment to review everything before we save it.</p>
      </div>
      <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-card">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Information</span>
        </div>
        <div className="px-5">
          <ReviewRow label="Name" value={data.clientName} />
          <ReviewRow label="Role" value={data.role} />
          <ReviewRow label="Company" value={data.companyName} />
          {data.companyLogoUrl && (
            <ReviewRow label="Logo" value={
              <img src={data.companyLogoUrl} alt="logo" className="h-6 w-auto object-contain grayscale opacity-70" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
            } />
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-card">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project & Results</span>
        </div>
        <div className="px-5">
          <ReviewRow label="Project" value={data.projectName} />
          <ReviewRow label="What was built" value={data.whatWeBuilt} />
          <ReviewRow label="Problem before" value={data.problemBefore} />
          <ReviewRow label="Results after" value={data.resultsAfter} />
          {data.metrics && <ReviewRow label="Metrics" value={data.metrics} />}
          <ReviewRow label="Biggest impact" value={data.biggestImpact} />
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-border bg-card">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Testimonial</span>
        </div>
        <div className="px-5">
          <ReviewRow label="Rating" value={
            <div className="flex gap-1 mt-1">
              {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= data.rating ? 'fill-primary text-primary' : 'text-border'}`} />)}
            </div>
          } />
          <ReviewRow label="Testimonial" value={data.writtenTestimonial} />
          {(data.videoUrl || data.videoFile) && (
            <ReviewRow label="Video" value={data.videoFile ? `${data.videoFile.name} (${(data.videoFile.size/1024/1024).toFixed(1)} MB)` : data.videoUrl} />
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
      >
        <CheckCircle2 className="w-10 h-10 text-primary" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3"
      >
        <h2 className="text-2xl font-bold text-foreground">Thank you so much!</h2>
        <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
          Your testimonial has been saved. We deeply appreciate you taking the time to share your experience. It means the world to us.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground">Your review will appear on our website after approval.</span>
      </motion.div>
    </div>
  );
}

export default function ReviewPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ReviewFormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = useCallback((k: keyof ReviewFormData, v: string) => {
    setData(prev => ({ ...prev, [k]: v }));
  }, []);

  const updateNum = useCallback((k: keyof ReviewFormData, v: number) => {
    setData(prev => ({ ...prev, [k]: v }));
  }, []);

  const updateFile = useCallback((f: File | null) => {
    setData(prev => ({ ...prev, videoFile: f }));
  }, []);

  const validate = (): string => {
    if (step === 1) {
      if (!data.clientName.trim()) return 'Please enter your name.';
      if (!data.role.trim()) return 'Please enter your role.';
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
      if (data.writtenTestimonial.trim().split(/\s+/).filter(Boolean).length < 10) return 'Please write at least 10 words.';
    }
    return '';
  };

  const next = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setStep(s => Math.min(s + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => {
    setError('');
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const result = await submitReviewToAirtable(data);
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  const stepProps = { data, update };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Share Your Experience | Zumetrix Labs</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-12 sm:py-20">
        <div className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-1 mb-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo/Logo Icon.png" alt="Zumetrix Labs" className="h-7 w-auto" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
              <span className="text-sm font-semibold text-foreground">Zumetrix Labs</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center leading-tight">
              Share your <span className="text-primary">experience</span>
            </h1>
            <p className="text-muted-foreground text-center text-sm max-w-sm mt-1">
              Your story helps other founders make the right decision. Thank you for taking the time.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <SuccessScreen />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-dark"
              >
                <div className="px-6 pt-6 pb-4 border-b border-border/60">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground font-medium">
                      Step {step} of {TOTAL_STEPS} — {STEP_META[step - 1].label}
                    </span>
                    <span className="text-xs text-primary font-semibold">
                      {Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100)}%
                    </span>
                  </div>
                  <ProgressBar step={step} />
                  <div className="mt-4">
                    <StepIndicator step={step} />
                  </div>
                </div>

                <div className="px-6 py-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      {step === 1 && <Step1 {...stepProps} />}
                      {step === 2 && <Step2 {...stepProps} />}
                      {step === 3 && <Step3 {...stepProps} />}
                      {step === 4 && <Step4 data={data} update={update} updateNum={updateNum} />}
                      {step === 5 && <Step5 data={data} update={update} updateFile={updateFile} />}
                      {step === 6 && <Step6 data={data} />}
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 mt-5 p-3 bg-destructive/10 border border-destructive/30 rounded-xl"
                      >
                        <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                        <p className="text-sm text-destructive">{error}</p>
                        <button onClick={() => setError('')} className="ml-auto">
                          <X className="w-3.5 h-3.5 text-destructive/60 hover:text-destructive" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-6 pb-6 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prev}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={next}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-glow"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={submitting}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Submit Review
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-muted-foreground/50 mt-6">
            Your review is private until approved by our team.
          </p>
        </div>
      </div>
    </div>
  );
}
