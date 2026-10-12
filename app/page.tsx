"use client";

import { useEffect, useState } from "react";

const eventDate = new Date("2026-12-18T18:30:00+08:00");

const programme = [
  { time: "6:30", suffix: "PM", title: "Lanterns & Mulled Cheer", copy: "Arrive beneath the winter lights. First pours and tiny bites await." },
  { time: "7:15", suffix: "PM", title: "The Candlelit Feast", copy: "A generous table, four festive courses, and excellent company." },
  { time: "8:45", suffix: "PM", title: "The Great Gift Caper", copy: "Teams, clues, secret parcels. Glory—and gingerbread—on the line." },
  { time: "10:00", suffix: "PM", title: "Dancing in the Snow", copy: "The ceiling sparkles, the records spin, and midnight feels miles away." },
];

const doors = [
  { n: 1, icon: "✦", title: "Come curious", text: "A small mystery waits for every guest at the door." },
  { n: 2, icon: "♬", title: "Name that tune", text: "Warm up your festive music knowledge. The first game begins early." },
  { n: 3, icon: "❄", title: "Winter white", text: "Wear a touch of cream, silver, forest green—or all three." },
  { n: 4, icon: "♜", title: "Play boldly", text: "The Great Gift Caper rewards nerve more than knowledge." },
  { n: 5, icon: "☕", title: "Stay toasty", text: "The cocoa bar opens after dinner, marshmallow mountain included." },
  { n: 6, icon: "★", title: "Look up", text: "At precisely 10, the ballroom becomes a snow globe." },
];

function Star({ className = "" }: { className?: string }) {
  return <span className={`star ${className}`} aria-hidden="true">✦</span>;
}

function Countdown() {
  const [parts, setParts] = useState({ days: "77", hours: "04", mins: "22", secs: "18" });

  useEffect(() => {
    const tick = () => {
      const distance = Math.max(0, eventDate.getTime() - Date.now());
      setParts({
        days: String(Math.floor(distance / 86400000)).padStart(2, "0"),
        hours: String(Math.floor((distance / 3600000) % 24)).padStart(2, "0"),
        mins: String(Math.floor((distance / 60000) % 60)).padStart(2, "0"),
        secs: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
      });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label={`${parts.days} days, ${parts.hours} hours, ${parts.mins} minutes until the event`}>
      {Object.entries(parts).map(([label, value], index) => (
        <div className="count-unit" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
          {index < 3 && <i aria-hidden="true">:</i>}
        </div>
      ))}
    </div>
  );
}

function Ornament({ variant, className = "" }: { variant: "stripe" | "star" | "sprig"; className?: string }) {
  return (
    <div className={`ornament ${variant} ${className}`} aria-hidden="true">
      <span className="ornament-cap" />
      <span className="ornament-string" />
      {variant === "star" && <span className="ornament-mark">✦</span>}
      {variant === "sprig" && <span className="ornament-mark">❋</span>}
    </div>
  );
}

function Stockings() {
  const cuffs = ["#a5352d", "#d9a847", "#174b41"];
  return (
    <div className="stockings" aria-hidden="true">
      {cuffs.map((color, i) => (
        <div className="stocking-rig" key={i} style={{ "--delay": `${i * -0.7}s` } as React.CSSProperties}>
          <span className="stocking-string" />
          <span className="stocking-pin" />
          <div className="stocking-body" style={{ background: color }}>
            <span className="stocking-cuff" />
            <span className="stocking-mark">✦</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniTree() {
  return (
    <div className="mini-tree" aria-hidden="true">
      <span className="mini-tree-top" />
      <div className="mini-tree-tier t1" />
      <div className="mini-tree-tier t2" />
      <div className="mini-tree-tier t3" />
      <span className="mini-tree-trunk" />
      <span className="light l1" /><span className="light l2" /><span className="light l3" /><span className="light l4" /><span className="light l5" />
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDoor, setActiveDoor] = useState<number | null>(null);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Northstar home" onClick={closeMenu}>
          <span className="brand-mark"><Star /></span>
          <span><b>NORTHSTAR</b><small>NOCTURNE</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          <span /><span />
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <a href="#story" onClick={closeMenu}>The evening</a>
          <a href="#programme" onClick={closeMenu}>Programme</a>
          <a href="#discover" onClick={closeMenu}>Little secrets</a>
          <a href="#visit" onClick={closeMenu}>Visit us</a>
          <a href="/register" className="nav-register" onClick={closeMenu}>Register my room <span>✦</span></a>
          <button className="nav-rsvp" onClick={() => { setRsvpOpen(true); closeMenu(); }}>Save my seat <span>↗</span></button>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="snow" aria-hidden="true">
          {Array.from({ length: 26 }, (_, i) => (
            <i
              key={i}
              style={{
                "--x": `${(i * 37) % 100}%`,
                "--duration": `${10 + (i % 8)}s`,
                "--delay": `${i * -0.9}s`,
                "--drift": `${((i % 5) - 2) * 24}px`,
                "--opacity": 0.18 + (i % 5) * 0.09,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <Ornament variant="stripe" className="ornament-left" />
        <Ornament variant="star" className="ornament-right" />
        <Stockings />
        <MiniTree />
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="eyebrow"><span /> An invitation to wonder <span /></p>
          <h1><span>A Christmas</span><em>After Dark</em></h1>
          <p className="hero-copy">Step out of the ordinary and into an evening of candlelit feasting, curious games, and a little midwinter magic.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setRsvpOpen(true)}>Join the guest list <span>↗</span></button>
            <a href="#story" className="text-link">Unwrap the story <span>↓</span></a>
          </div>
        </div>
        <div className="date-ribbon">
          <span>FRI</span><strong>18</strong><span>DEC<br />2026</span><i /><span>6:30 PM</span><i /><span>THE GLASSHOUSE<br />SINGAPORE</span>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span>SCROLL TO WANDER</span><i /></div>
      </section>

      <section className="story-section section" id="story">
        <div className="story-art" aria-hidden="true">
          <div className="moon"><span>✦</span></div>
          <div className="pine pine-one" /><div className="pine pine-two" /><div className="pine pine-three" />
          <div className="house"><div className="roof" /><div className="chimney" /><div className="window w1" /><div className="window w2" /><div className="door" /></div>
          <div className="snow-bank" />
          <Star className="s1" /><Star className="s2" /><Star className="s3" />
        </div>
        <div className="story-copy">
          <p className="section-kicker">The evening</p>
          <h2>When the city quiets,<br /><em>the wonder begins.</em></h2>
          <p>Beyond the last row of city lights, The Glasshouse will glow for one night only. Come hungry, come curious, and leave the sensible shoes at home.</p>
          <p>We have planned a feast around long tables, games with just enough mischief, and a dance floor beneath a sky of paper stars.</p>
          <div className="signature"><span>Made with merry intent,</span><strong>The Northstar Society</strong></div>
        </div>
      </section>

      <section className="programme-section section" id="programme">
        <div className="section-heading centered">
          <p className="section-kicker light">One enchanted evening</p>
          <h2>The night,<br /><em>beautifully unplanned.</em></h2>
          <p>A loose itinerary for those who like to know where the magic might happen.</p>
        </div>
        <div className="timeline">
          {programme.map((item, index) => (
            <article key={item.time}>
              <div className="time"><strong>{item.time}</strong><span>{item.suffix}</span></div>
              <div className="timeline-marker"><span>{index % 2 === 0 ? "✦" : "❋"}</span></div>
              <div className="programme-copy"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></div>
            </article>
          ))}
        </div>
        <p className="programme-note">Timing is approximate. Merriment rarely follows a clock.</p>
      </section>

      <section className="discover-section section" id="discover">
        <div className="section-heading centered dark">
          <p className="section-kicker">A few little secrets</p>
          <h2>Peek behind the doors.</h2>
          <p>Every gathering is better with a hint of mystery. Tap to reveal.</p>
        </div>
        <div className="door-grid">
          {doors.map((door) => (
            <button className={`secret-door door-${door.n}`} key={door.n} onClick={() => setActiveDoor(door.n)} aria-label={`Open secret door ${door.n}`}>
              <span className="door-number">{door.n}</span><span className="door-icon">{door.icon}</span><span className="door-knob" />
            </button>
          ))}
        </div>
        <div className="tiny-instruction"><span>↖</span> Go on, open one</div>
      </section>

      <section className="visit-section section" id="visit">
        <div className="section-heading centered dark">
          <p className="section-kicker">Find us</p>
          <h2>When, where<br /><em>&amp; who to ask.</em></h2>
          <p>Everything you need to get your dorm there — and your decorations seen.</p>
        </div>
        <div className="visit-grid">
          <div className="visit-card">
            <span className="visit-icon">✦</span>
            <p className="section-kicker">Date &amp; time</p>
            <h3>Fri, 18 Dec 2026</h3>
            <p>Doors open 6:30 PM · Ends 11:30 PM</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">❋</span>
            <p className="section-kicker">Venue</p>
            <h3>The Glasshouse</h3>
            <p>Block C Residences, Student Village<br />Singapore</p>
          </div>
          <div className="visit-card">
            <span className="visit-icon">☕</span>
            <p className="section-kicker">Questions?</p>
            <h3>@NorthstarCommittee</h3>
            <p>Message us on Telegram anytime</p>
          </div>
        </div>
        <div className="map-wrap">
          <iframe
            title="Map to The Glasshouse"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Student+Village+Residences+Singapore&output=embed"
          />
          <a
            className="text-link map-link"
            href="https://www.google.com/maps/search/?api=1&query=Student+Village+Residences+Singapore"
            target="_blank"
            rel="noreferrer"
          >
            Get directions <span>↗</span>
          </a>
        </div>
      </section>

      <section className="register-banner section">
        <Ornament variant="sprig" className="banner-ornament" />
        <div className="banner-content">
          <p className="section-kicker light">Finished decorating?</p>
          <h2>Hang your stocking.</h2>
          <p>Tell us your room number so our elves know exactly where to drop your gift.</p>
          <a className="cream-button" href="/register">Register my room <span>↗</span></a>
        </div>
      </section>

      <section className="rsvp-banner section">
        <Ornament variant="sprig" className="banner-ornament" />
        <div className="banner-content">
          <p className="section-kicker light">Your place by the fire</p>
          <h2>Make the nice list.</h2>
          <p>Seats at the table are limited. Kindly reply by 4 December.</p>
          <button className="cream-button" onClick={() => setRsvpOpen(true)}>RSVP for the evening <span>↗</span></button>
        </div>
        <div className="countdown-wrap"><p>THE MAGIC BEGINS IN</p><Countdown /></div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Star /></span><span><b>NORTHSTAR</b><small>NOCTURNE</small></span></a>
        <p>Made for warm hearts & cold nights.</p>
        <div><a href="#visit">Visit</a><a href="/register">Register</a><a href="https://t.me/NorthstarCommittee" target="_blank" rel="noreferrer">Telegram</a><button onClick={() => setRsvpOpen(true)}>RSVP</button></div>
        <span>© 2026 Northstar Society</span>
      </footer>

      {activeDoor !== null && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveDoor(null)}>
          <div className="secret-modal" role="dialog" aria-modal="true" aria-labelledby="secret-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveDoor(null)} aria-label="Close">×</button>
            <span className="modal-icon">{doors[activeDoor - 1].icon}</span>
            <p>SECRET NO. {activeDoor}</p>
            <h3 id="secret-title">{doors[activeDoor - 1].title}</h3>
            <span>{doors[activeDoor - 1].text}</span>
            <button className="primary-button compact" onClick={() => setActiveDoor(null)}>I’ll remember</button>
          </div>
        </div>
      )}

      {rsvpOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setRsvpOpen(false)}>
          <div className="rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="rsvp-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setRsvpOpen(false)} aria-label="Close">×</button>
            {!submitted ? (
              <>
                <p className="section-kicker">The guest list</p>
                <h3 id="rsvp-title">Save your seat.</h3>
                <p>Friday, 18 December · 6:30 PM</p>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <label>Your name<input required placeholder="Clara Evergreen" /></label>
                  <label>Email address<input required type="email" placeholder="clara@example.com" /></label>
                  <label>Will you join us?<select defaultValue="yes"><option value="yes">Joyfully, yes!</option><option value="plus-one">Yes, with a guest</option><option value="no">Sorry to miss it</option></select></label>
                  <button className="primary-button" type="submit">Send my reply <span>↗</span></button>
                </form>
              </>
            ) : (
              <div className="success-state"><span>✦</span><p className="section-kicker">Consider it done</p><h3>You’re on the list.</h3><p>Keep an eye on your inbox. A little more magic is on its way.</p><button className="primary-button compact" onClick={() => setRsvpOpen(false)}>Wonderful</button></div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
