import AuthCard from "../common/AuthCard";
import { getGoogleAuthUrl } from "../../api/googleApi";
import { getMicrosoftAuthUrl } from "../../api/microsoftApi";

function Login() {
  return (
    <AuthCard title="Sign In">
      <p className="text-slate-300">Choose an account to continue.</p>
      <a
        href={getGoogleAuthUrl()}
        className="mt-5 flex items-center justify-center gap-3 w-full rounded-lg border border-slate-500 hover:border-slate-300 py-3"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
          <path
            fill="#EA4335"
            d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 4 1.5l2.7-2.6C17 3.2 14.7 2.2 12 2.2 6.9 2.2 2.8 6.3 2.8 11.4S6.9 20.6 12 20.6c6.9 0 9.2-4.8 9.2-7.2 0-.5 0-.8-.1-1.2H12z"
          />
          <path
            fill="#34A853"
            d="M3.8 7.8l3.2 2.3c.9-2.6 3.4-4.4 5.9-4.4 1.9 0 3.2.8 4 1.5l2.7-2.6C17 3.2 14.7 2.2 12 2.2c-3.6 0-6.8 2-8.2 5.6z"
          />
          <path
            fill="#FBBC05"
            d="M12 20.6c2.6 0 4.8-.9 6.4-2.4l-3-2.4c-.8.6-1.8 1.1-3.4 1.1-3.2 0-5.7-2.2-6.6-5.1l-3.3 2.5c1.4 3.7 5 6.3 9.9 6.3z"
          />
          <path
            fill="#4285F4"
            d="M21.2 13.4c0-.5 0-.8-.1-1.2H12v3.9h5.5c-.3 1.6-1.2 2.7-2.1 3.5l3 2.4c1.7-1.6 2.8-4 2.8-7.6z"
          />
        </svg>
        Signup with Google
      </a>
      <a
        href={getMicrosoftAuthUrl()}
        className="mt-3 flex items-center justify-center gap-3 w-full rounded-lg border border-slate-500 hover:border-slate-300 py-3"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
        Signup with Microsoft
      </a>
    </AuthCard>
  );
}

export default Login;
