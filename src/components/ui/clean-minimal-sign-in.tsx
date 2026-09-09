"use client";
/* Integrated per §4. NOT assembled into the page per decision D3 — a login that
   leads nowhere costs trust. It ships in the library so the gated deal room can
   be turned on at Phase 4 without re-integrating.
   Correction 8: the supplied file hardcoded bg-white / text-black / sky-50 /
   blue-100 and broke under the dark class. Tokens from BRAND.md now.
   Correction 9: the alert() stub is gone. The submit handler is a no-op that
   states plainly that authentication is not wired, rather than faking success. */

import * as React from "react";
import { useState } from "react";
import { LogIn, Lock, Mail } from "lucide-react";

const SignIn2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignIn = () => {
    setNotice("");
    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("That email address is not valid.");
      return;
    }
    setError("");
    setNotice("Access is not open yet. The deal room opens to approved contacts only.");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-sm bg-card rounded-sm border border-border p-8 flex flex-col items-center text-foreground">
        <div className="flex items-center justify-center w-14 h-14 rounded-sm bg-da-oxblood mb-6">
          <LogIn className="w-6 h-6 text-da-ivory" />
        </div>
        <h2 className="font-display text-2xl mb-2 text-center">Deal room</h2>
        <p className="text-muted-foreground text-sm mb-6 text-center">
          For approved contacts. Access is granted by invitation.
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full pl-10 pr-3 py-2 rounded-sm border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full pl-10 pr-10 py-2 rounded-sm border border-input focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? <div className="text-sm text-destructive">{error}</div> : null}
          {notice ? <div className="text-sm text-da-champagne">{notice}</div> : null}
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-da-oxblood text-da-ivory font-medium py-2 rounded-sm hover:brightness-110 cursor-pointer transition mb-2 mt-3"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export { SignIn2 };
