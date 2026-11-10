"use client";

import { useState } from "react";

function Star({ className = "" }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true">✦</span>;
}

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [room, setRoom] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  return (
    <main className="register-page">
      <header className="site-header register-header">
        <a className="brand" href="/" aria-label="Northstar home">
          <span className="brand-mark"><Star /></span>
          <span><b>NORTHSTAR</b><small>NOCTURNE</small></span>
        </a>
        <a href="/" className="text-link back-link">← Back home</a>
      </header>

      <section className="register-section">
        <div className="register-card">
          {!submitted ? (
            <>
              <p className="section-kicker">Stocking drop-off</p>
              <h1>Hang it, then tell us where.</h1>
              <p className="register-copy">
                Finished decorating your door or room for the contest? Pop your stocking
                outside and let us know your room number — our gift elves will quietly
                drop something sweet inside before the big night.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
                  setSending(true);
                  setError("");
                  try {
                    const res = await fetch("/api/submit", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ kind: "register", fields: data }),
                    });
                    const json = await res.json().catch(() => ({}));
                    if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
                    setSubmitted(true);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Something went wrong");
                  } finally {
                    setSending(false);
                  }
                }}
              >
                <label>
                  Your name
                  <input name="name" required placeholder="Clara Evergreen" />
                </label>
                <label>
                  Email address
                  <input name="email" required type="email" placeholder="clara@example.com" />
                </label>
                <label>
                  Block / Building
                  <input name="block" required placeholder="Block C" />
                </label>
                <label>
                  Room number
                  <input
                    name="room"
                    required
                    placeholder="07-42"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                </label>
                <label>
                  Anything we should know?
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="E.g. stocking is on the door handle, knock softly, roommate doesn't know yet…"
                  />
                </label>
                {error && <p role="alert" style={{ color: "var(--red)" }}>{error}</p>}
                <button className="primary-button" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Register my stocking"} <span>↗</span>
                </button>
              </form>
              <p className="register-footnote">
                Questions? Message <strong>@NorthstarCommittee</strong> on Telegram.
              </p>
            </>
          ) : (
            <div className="success-state">
              <span>✦</span>
              <p className="section-kicker">Noted!</p>
              <h1>Room {room || "received"} is on the list.</h1>
              <p>
                Keep that stocking visible and we&rsquo;ll take care of the rest. See you
                at the party.
              </p>
              <a className="primary-button compact" href="/">
                Back to the invitation
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
