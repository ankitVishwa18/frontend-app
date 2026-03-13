import MyGmailMessages from "../components/auth/MyGmailMessages";

function GmailPage() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Subscription Email Insights</h1>
      <p className="text-slate-400 mb-6">
        AI-classified emails for pending, recurring, paid, renewal, trial and cancelled subscriptions.
      </p>
      <MyGmailMessages />
    </main>
  );
}

export default GmailPage;
