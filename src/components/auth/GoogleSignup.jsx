import { getGoogleAuthUrl } from "../../api/authApi";

function GoogleSignup() {
  return (
    <a
      href={getGoogleAuthUrl()}
      className="mt-4 block text-center w-full rounded-lg border border-slate-500 hover:border-slate-300 py-3"
    >
      Continue with Google
    </a>
  );
}

export default GoogleSignup;
