import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchSubscriptionEmails } from "../../api/subscriptionApi";

function MyGmailMessages() {
  const { token } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [meta, setMeta] = useState({ aiUsed: false, model: null, warning: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEmails() {
      try {
        const data = await fetchSubscriptionEmails(token, 50);
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

    if (token) {
      loadEmails();
    }
  }, [token]);

  if (loading) return <p className="text-lg">Loading subscription emails...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!subscriptions.length) return <p>No subscription related emails found.</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm">
        <p>
          Mode: {meta.aiUsed ? "AI" : "Fallback"}
          {meta.model ? ` (${meta.model})` : ""}
        </p>
        {meta.warning ? <p className="text-amber-300 mt-1">{meta.warning}</p> : null}
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
        <div key={mail.id} className="rounded-lg border border-slate-700 p-4 bg-slate-900">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs uppercase px-2 py-1 rounded bg-cyan-900 text-cyan-200">
              {mail.status}
            </span>
            <span className="text-xs text-slate-400">Confidence: {mail.confidence}</span>
          </div>

          <p className="font-semibold">{mail.subject || "(No Subject)"}</p>
          <p className="text-sm text-slate-300">From: {mail.from}</p>
          <p className="text-sm text-slate-400">Merchant: {mail.merchant || "-"}</p>
          <p className="text-sm text-slate-400">Amount: {mail.amount || "-"} {mail.currency || ""}</p>
          <p className="text-sm text-slate-400">Next Billing: {mail.next_billing_date || "-"}</p>
          <p className="text-sm text-slate-400">Date: {mail.date || "-"}</p>
          <p className="text-sm mt-2 text-slate-200">{mail.snippet}</p>
          <p className="text-xs mt-2 text-slate-500">Reason: {mail.reason || "-"}</p>
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

export default MyGmailMessages;
