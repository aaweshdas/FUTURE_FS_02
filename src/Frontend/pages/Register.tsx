import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/Client/contexts/AuthContext";
import { Button } from "@/Frontend/components/ui/button";
import { Input } from "@/Frontend/components/ui/input";
import { Label } from "@/Frontend/components/ui/label";
import { Zap, Check, Loader2, MailCheck } from "lucide-react";

export default function Register() {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  const bullets = [
    "Track and manage all your leads",
    "Visual pipeline with drag-and-drop",
    "Automated follow-up reminders",
  ];

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="text-center max-w-sm">
          <MailCheck className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation link to <span className="font-medium text-foreground">{email}</span>. Click it to activate your account.
          </p>
          <Link to="/login" className="text-primary font-medium hover:underline">Go to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-center px-16">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-8 w-8 text-sidebar-primary" />
          <span className="text-2xl font-bold text-sidebar-foreground">LeadFlow</span>
        </div>
        <h2 className="text-3xl font-bold text-sidebar-foreground mb-4">Start for free</h2>
        <p className="text-sidebar-muted-foreground mb-8">Create your account and start managing leads in minutes.</p>
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-sidebar-foreground">
              <Check className="h-4 w-4 text-sidebar-primary flex-shrink-0" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 bg-background">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LeadFlow</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-6">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 6 characters" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/home" className="text-muted-foreground hover:text-foreground">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
