import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import {
  fetchMicrosoftSubscriptionEmails,
  fetchSubscriptionEmails,
} from "../../api/subscriptionApi";

function MyMailMessages() {
  const { token, user } = useAuth();
  const { user: hydratedUser, loading: userLoading } = useUser();
  const provider = hydratedUser?.provider || user?.provider;
  const hasKnownProvider = provider === "google" || provider === "microsoft";
  const [subscriptions, setSubscriptions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [meta, setMeta] = useState({
    aiUsed: false,
    model: null,
    warning: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !hasKnownProvider) {
      setLoading(false);
      return;
    }

    async function loadEmails() {
      try {
        const data =
          provider === "microsoft"
            ? await fetchMicrosoftSubscriptionEmails(token, 50)
            : await fetchSubscriptionEmails(token, 50);
        setSubscriptions(data.subscriptions || []);
        setSummary(data.summary || null);
        setMeta({
          aiUsed: Boolean(data.ai_used),
          model: data.model_used || null,
          warning: data.warning || null,
        });
      } catch (err) {
        setError(err.message || "Failed to load subscription emails");
      } finally {
        setLoading(false);
      }
    }

    loadEmails();
  }, [token, provider, hasKnownProvider]);

  if (userLoading && !hasKnownProvider) {
    return <p className="text-lg">Resolving your login provider...</p>;
  }

  if (!hasKnownProvider) {
    return (
      <p className="text-amber-300">
        Login provider could not be verified. Please logout and sign in again
        with Google or Microsoft.
      </p>
    );
  }

  if (loading) {
    return <MailInsightsSkeleton />;
  }
  if (error) return <p className="text-red-400">{error}</p>;
  if (!subscriptions.length)
    return <p>No subscription related emails found.</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm">
        <p>
          Mode: {meta.aiUsed ? "AI" : "Fallback"}
          {meta.model ? ` (${meta.model})` : ""}
        </p>
        {meta.warning ? (
          <p className="text-amber-300 mt-1">{meta.warning}</p>
        ) : null}
      </div>

      {summary ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total" value={summary.total} />
          <StatCard label="Pending" value={summary.pending} />
          <StatCard label="Recurring" value={summary.recurring} />
          <StatCard label="Paid" value={summary.paid} />
          <StatCard label="Renewal" value={summary.renewal} />
          <StatCard label="Trial" value={summary.trial} />
          <StatCard label="Cancelled" value={summary.cancelled} />
        </div>
      ) : null}

      {subscriptions.map((mail) => (
        <div
          key={mail.id}
          className="rounded-lg border border-slate-700 p-4 bg-slate-900"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs uppercase px-2 py-1 rounded bg-cyan-900 text-cyan-200">
              {mail.status}
            </span>
            <span className="text-xs text-slate-400">
              Confidence: {mail.confidence}
            </span>
          </div>

          <p className="font-semibold">{mail.subject || "(No Subject)"}</p>
          <p className="text-sm text-slate-300">From: {mail.from}</p>
          <p className="text-sm text-slate-400">
            Merchant: {mail.merchant || "-"}
          </p>
          <p className="text-sm text-slate-400">
            Amount: {mail.amount || "-"} {mail.currency || ""}
          </p>
          <p className="text-sm text-slate-400">
            Next Billing: {mail.next_billing_date || "-"}
          </p>
          <p className="text-sm text-slate-400">Date: {mail.date || "-"}</p>
          <p className="text-sm mt-2 text-slate-200">{mail.snippet}</p>
          <p className="text-xs mt-2 text-slate-500">
            Reason: {mail.reason || "-"}
          </p>
        </div>
      ))}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-semibold">{value ?? 0}</p>
    </div>
  );
}

export default MyMailMessages;

function MailInsightsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
        <div className="h-4 w-40 rounded bg-slate-700" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-700 bg-slate-900 p-3 space-y-2"
          >
            <div className="h-3 w-16 rounded bg-slate-700" />
            <div className="h-7 w-12 rounded bg-slate-700" />
          </div>
        ))}
      </div>

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-slate-700 p-4 bg-slate-900 space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-5 w-20 rounded bg-slate-700" />
            <div className="h-4 w-28 rounded bg-slate-700" />
          </div>
          <div className="h-5 w-3/4 rounded bg-slate-700" />
          <div className="h-4 w-1/2 rounded bg-slate-700" />
          <div className="h-4 w-1/3 rounded bg-slate-700" />
          <div className="h-4 w-2/5 rounded bg-slate-700" />
          <div className="h-4 w-1/3 rounded bg-slate-700" />
          <div className="h-4 w-full rounded bg-slate-700" />
          <div className="h-3 w-4/5 rounded bg-slate-700" />
        </div>
      ))}
    </div>
  );
}
