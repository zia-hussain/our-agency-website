import { CheckCircle2, Mail, ShieldCheck, XCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const messages = {
  success: {
    icon: CheckCircle2,
    title: "You are unsubscribed.",
    copy: "Marketing emails have stopped for this address. Essential replies about an active project or request may still reach you.",
  },
  invalid: {
    icon: XCircle,
    title: "This link is no longer valid.",
    copy: "The address may already be unsubscribed. Email us if you want us to check or remove your information.",
  },
  error: {
    icon: XCircle,
    title: "We could not update your preference.",
    copy: "Please try the link again or email hello@zumetrix.com and we will handle it manually.",
  },
};

export default function UnsubscribePage() {
  const [params] = useSearchParams();
  const status = params.get("status") as keyof typeof messages;
  const content = messages[status] || messages.invalid;
  const Icon = content.icon;

  return (
    <>
      <Helmet>
        <title>Email Preferences | Zumetrix Labs</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-24">
        <div className="w-full max-w-xl rounded-lg border border-border bg-card/45 p-8 text-center sm:p-12">
          <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Email preferences
          </p>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-7 text-muted-foreground">
            {content.copy}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground"
            >
              <ShieldCheck size={17} />
              Return home
            </Link>
            <a
              href="mailto:hello@zumetrix.com"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 font-medium text-foreground transition-colors hover:border-primary/40"
            >
              <Mail size={17} />
              Contact us
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
