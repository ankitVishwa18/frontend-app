import MyMailMessages from "../components/auth/MyGmailMessages";
import { useAuth } from "../hooks/useAuth";

function MailPage() {
  const { user } = useAuth();
  const providerName =
    user?.provider === "microsoft"
      ? "Microsoft"
      : user?.provider === "google"
        ? "Google"
        : "Mail";

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">
        {providerName} Subscription Email Insights
      </h1>
      <p className="text-slate-400 mb-6">
        AI-classified emails for pending, recurring, paid, renewal, trial and
        cancelled subscriptions.
      </p>
      <MyMailMessages />
    </main>
  );
}

export default MailPage;
