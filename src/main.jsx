import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  HeartHandshake,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X
} from "lucide-react";
import "./styles.css";

const PHONE = "312-479-3515";
const EMAIL = "hampton.lentoi13@gmail.com";
const AREA = "Matteson, Richton Park, Park Forest, and surrounding areas";
const OS_URL = "https://hampton-healthcare-os.vercel.app";

const services = [
  [UserRound, "Personal Care", "Respectful assistance with bathing, dressing, grooming, mobility, and daily routines."],
  [UsersRound, "Companion Care", "Conversation, engagement, supervision, and dependable support that reduces isolation."],
  [Home, "Homemaker Support", "Light housekeeping, laundry, meal preparation, and help maintaining a comfortable home."],
  [ClipboardCheck, "Medication Reminders", "Routine reminders and observation support to help clients stay on schedule."],
  [Clock3, "Respite Care", "Flexible relief for family members who need time to rest, work, or handle other responsibilities."],
  [Car, "Transportation Assistance", "Help coordinating and accompanying clients to appointments, errands, and essential outings."]
];

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <div className="topbar">
        <span><MapPin size={15} /> Serving {AREA}</span>
        <a href={`tel:${PHONE.replace(/-/g, "")}`}><Phone size={15} /> {PHONE}</a>
      </div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Hampton Healthcare Services home">
          <img src="/logo-full.svg" alt="Hampton Healthcare Services" />
        </a>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "open" : ""}>
          <a href="#services" onClick={close}>Services</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#intake" onClick={close}>Patient Intake</a>
          <a href="#contact" onClick={close}>Contact</a>
          <a className="portal-link" href={OS_URL} target="_blank" rel="noreferrer">Staff Login</a>
          <a className="nav-cta" href="#intake" onClick={close}>Get Started</a>
        </nav>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="hero-kicker"><Sparkles size={16} /> Family-owned care for the South Suburbs</div>
        <h1>Compassionate home care you can trust.</h1>
        <p className="hero-text">Personalized, non-medical support that helps older adults and individuals live safely, comfortably, and with dignity at home.</p>
        <div className="actions">
          <a className="btn primary" href="#intake">Complete Patient Intake <ArrowRight size={18} /></a>
          <a className="btn secondary" href={`tel:${PHONE.replace(/-/g, "")}`}>Schedule a Free Consultation</a>
        </div>
        <div className="hero-trust">
          <span><Check /> Personalized support</span>
          <span><Check /> Dependable care</span>
          <span><Check /> Clear family communication</span>
        </div>
      </div>
      <div className="hero-photo">
        <img src="/hero-caregiver-woman-elderly.png" alt="Home care professional supporting an older adult" />
        <div className="hero-card">
          <HeartHandshake size={30} />
          <div><strong>Care starts with listening.</strong><span>We build support around each family's needs.</span></div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why choose Hampton Healthcare Services">
      <div><ShieldCheck /><span><strong>Dignity first</strong>Respectful care in every interaction</span></div>
      <div><CalendarDays /><span><strong>Flexible support</strong>Care plans built around real schedules</span></div>
      <div><Phone /><span><strong>Responsive team</strong>Simple access to local support</span></div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="section-heading centered">
        <p className="eyebrow">Our Services</p>
        <h2>Practical support. Personal attention.</h2>
        <p>Our non-medical home care services are designed to promote independence, safety, comfort, and peace of mind.</p>
      </div>
      <div className="service-grid">
        {services.map(([Icon, title, description]) => (
          <article className="service-card" key={title}>
            <div className="service-icon"><Icon size={28} /></div>
            <h3>{title}</h3>
            <p>{description}</p>
            <a href="#intake">Ask about this service <ChevronRight size={17} /></a>
          </article>
        ))}
      </div>
      <p className="service-note">Transportation support is non-emergency assistance and is subject to staff availability and the services authorized for each client.</p>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="about-visual">
        <div className="about-mark">H</div>
        <div className="about-stat"><strong>Family-owned</strong><span>Local care with personal accountability</span></div>
      </div>
      <div className="about-copy">
        <p className="eyebrow">About Hampton Healthcare</p>
        <h2>A care experience built around dignity and family.</h2>
        <p>Hampton Healthcare Services is a family-owned non-medical home care agency serving Matteson, Richton Park, Park Forest, and nearby communities. We help families coordinate dependable assistance that supports independence at home.</p>
        <p>Our approach is straightforward: listen carefully, communicate clearly, and provide consistent support that treats every client as an individual.</p>
        <ul className="feature-list">
          <li><ShieldCheck /> Personalized care planning</li>
          <li><ShieldCheck /> Respectful in-home assistance</li>
          <li><ShieldCheck /> Flexible scheduling options</li>
          <li><ShieldCheck /> Ongoing family communication</li>
        </ul>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "Tell us what you need", "Complete the intake form or call for a consultation."],
    ["02", "Plan the right support", "We review needs, scheduling, preferences, and next steps."],
    ["03", "Begin care with confidence", "Your family receives clear communication as services begin."]
  ];
  return (
    <section className="section process">
      <div className="section-heading centered">
        <p className="eyebrow">Getting Started</p>
        <h2>A simple path to dependable care.</h2>
      </div>
      <div className="process-grid">
        {steps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function SubmissionForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus("Submitting...");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "care_request" })
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus("Thank you. Your intake request has been submitted.");
      form.reset();
    } catch {
      setStatus(`We could not submit the form. Please call ${PHONE} or email ${EMAIL}.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="intake-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Full name<input name="full_name" autoComplete="name" required /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" /></label>
        <label>Service needed<select name="service_needed" defaultValue="">
          <option value="" disabled>Select a service</option>
          {services.map(([, title]) => <option key={title}>{title}</option>)}
          <option>Not sure yet</option>
        </select></label>
        <label>Preferred start date<input name="preferred_start_date" type="date" /></label>
        <label>Preferred schedule<input name="experience" placeholder="Example: weekdays, mornings" /></label>
      </div>
      <label>Tell us about the care needed<textarea name="message" rows="5" required /></label>
      <label className="consent"><input type="checkbox" required /> <span>I confirm that the information provided is accurate and consent to being contacted by Hampton Healthcare Services.</span></label>
      <button className="btn primary form-submit" type="submit" disabled={busy}>{busy ? "Submitting..." : "Submit Patient Intake"}</button>
      {status && <p className="form-status" role="status">{status}</p>}
      <small>Do not use this form for emergencies. Call 911 for urgent medical assistance.</small>
    </form>
  );
}

function Intake() {
  return (
    <section id="intake" className="section intake-section">
      <div className="form-intro">
        <p className="eyebrow">Patient Intake</p>
        <h2>Start the conversation about care.</h2>
        <p>Share the basics and our team will contact you to learn more, answer questions, and discuss the appropriate next steps.</p>
        <div className="privacy-box"><ShieldCheck /><div><strong>Your information matters.</strong><span>Only provide details needed for an initial consultation. Avoid submitting highly sensitive medical or financial information through this form.</span></div></div>
      </div>
      <SubmissionForm />
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div>
        <p className="eyebrow">Contact Us</p>
        <h2>Talk with our family about yours.</h2>
        <p>Contact Hampton Healthcare Services to discuss care needs, schedule a consultation, or ask general questions.</p>
      </div>
      <div className="contact-cards">
        <a href={`tel:${PHONE.replace(/-/g, "")}`}><Phone /><span>Call us</span><strong>{PHONE}</strong></a>
        <a href={`mailto:${EMAIL}`}><Mail /><span>Email us</span><strong>{EMAIL}</strong></a>
        <div><MapPin /><span>Service area</span><strong>{AREA}</strong></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div><img src="/logo-full.svg" alt="Hampton Healthcare Services" /><p>Dependable non-medical home care for families throughout Chicago's South Suburbs.</p></div>
        <div><strong>Explore</strong><a href="#services">Services</a><a href="#about">About</a><a href="#intake">Patient Intake</a></div>
        <div><strong>Contact</strong><a href={`tel:${PHONE.replace(/-/g, "")}`}>{PHONE}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><a href={OS_URL} target="_blank" rel="noreferrer">Hampton Healthcare OS</a></div>
      </div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} Hampton Healthcare Services. All rights reserved.</small><small>Non-medical home care services. Service availability varies by client needs and location.</small></div>
    </footer>
  );
}

function App() {
  return <><Header /><main><Hero /><TrustStrip /><Services /><About /><Process /><Intake /><Contact /></main><Footer /></>;
}

createRoot(document.getElementById("root")).render(<App />);
