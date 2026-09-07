import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    login(email);
    setTimeout(() => {
      navigate("/dashboard");
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-[#3D4A34] text-[#F6F1E4] p-12">
        <p className="font-['Fraunces'] text-xl font-semibold">Re:Wear</p>
        <div>
          <p className="text-[#B5592F] text-sm uppercase tracking-widest mb-3 font-medium">
            Member access
          </p>
          <h1 className="font-['Fraunces'] text-5xl font-semibold leading-[1.05]">
            Every swap starts
            <br />
            with a name tag.
          </h1>
          <p className="mt-6 text-[#D9C9AE] max-w-sm leading-relaxed">
            Log in to see who wants your jacket, and what they're offering for it.
          </p>
        </div>
        <p className="text-xs text-[#7A9270]">No new clothes. Just new owners.</p>
      </div>

      <div className="flex items-center justify-center p-8 bg-[#F6F1E4]">
        <div className="w-full max-w-sm">
          <div className="h-4 bg-[repeating-linear-gradient(90deg,#23231F_0_6px,transparent_6px_14px)] opacity-20 rounded-t-md" />
          <div className="relative bg-white border-2 border-[#23231F] border-t-0 px-8 pt-10 pb-8">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#F6F1E4] border-2 border-[#23231F]" />

            <p className="text-center text-xs uppercase tracking-[0.2em] text-[#B5592F] font-medium mb-1">
              Member login
            </p>
            <h2 className="font-['Fraunces'] text-2xl font-semibold text-center text-[#23231F] mb-8">
              Claim your closet
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wide text-[#7A7264] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="aravind@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full border-0 border-b-2 border-[#D9C9AE] bg-transparent px-1 py-2 min-h-[44px] focus:outline-none focus:border-[#B5592F] transition-colors disabled:opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-xs uppercase tracking-wide text-[#7A7264] mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full border-0 border-b-2 border-[#D9C9AE] bg-transparent px-1 py-2 min-h-[44px] focus:outline-none focus:border-[#B5592F] transition-colors disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="shine-btn mt-3 bg-[#23231F] text-[#F6F1E4] py-3 min-h-[44px] rounded-full font-medium hover:bg-[#B5592F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B5592F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Enter the swap"}
              </button>
            </form>

            <p className="text-center text-xs text-[#7A7264] mt-6">
              New here? Ask a friend for an invite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;