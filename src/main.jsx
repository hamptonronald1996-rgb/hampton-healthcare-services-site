import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Phone, Mail, MapPin, User, Home, Activity, Car, Clock, ClipboardCheck, ShieldCheck, ChevronRight, Menu, X } from "lucide-react";
import "./styles.css";

const PHONE = "312-479-3515";
const EMAIL = "hampton.lentoi13@gmail.com";
const AREA = "South Suburbs of Chicago";

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Home", "#home"], ["About Us", "#about"], ["Services", "#services"], ["For Clients", "#clients"], ["For Caregivers", "#caregivers"], ["Contact", "#contact"]];
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Hampton Healthcare Services home">
        <img src="/logo-full.svg" alt="Hampton Healthcare Services" />
      </a>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X /> : <Menu />}</button>
      <nav className={open ? "open" : ""}>
        {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#request" onClick={() => setOpen(false)}>Request Care</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Compassionate Care. Trusted Support. Better Living.</p>
        <h1>Quality Home Care<br />You Can Trust</h1>
        <p className="hero-text">Hampton Healthcare Services provides dependable, personalized home care that helps individuals live safely and comfortably at home.</p>
        <div className="actions">
          <a className="btn primary" href="#request">Request Care <ChevronRight size={18} /></a>
          <a className="btn secondary" href="#caregivers">Become a Caregiver <ChevronRight size={18} /></a>
        </div>
      </div>
      <div className="hero-photo">
        <img src="/hero-caregiver-woman-elderly.png" alt="Caregiver smiling with an elderly woman at home" />
      </div>
    </section>
  );
}

function Services() {
  const cards = [
    [User, "Personal Care", "Assistance with bathing, dressing, grooming, and daily personal needs."],
    [Home, "Companion Care", "Friendly companionship and support for everyday activities."],
    [Activity, "Medication Reminders", "Timely reminders to help manage medication routines safely."],
    [Car, "Errands & Transportation", "Help with errands, appointments, shopping, and transportation needs."],
    [Clock, "Respite Care", "Reliable support so family caregivers can rest and recharge."],
    [ClipboardCheck, "Homemaker Services", "Light housekeeping, meal support, laundry, and home organization assistance."]
  ];
  return (
    <section id="services" className="section services">
      <div className="center">
        <h2>Our Services</h2>
        <p>We offer a wide range of in-home care services tailored to meet the unique needs of each individual.</p>
      </div>
      <div className="service-grid">
        {cards.map(([Icon, title, desc]) => (
          <article className="service-card" key={title}>
            <div className="icon"><Icon size={34} /></div>
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div>
        <p className="eyebrow">About Us</p>
        <h2>Care rooted in dignity, respect, and reliability.</h2>
      </div>
      <p>Hampton Healthcare Services supports seniors, adults, and families who need dependable non-medical assistance at home. Our mission is to help clients maintain independence while giving loved ones confidence that care is handled with compassion and professionalism.</p>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" className="section split">
      <div>
        <p className="eyebrow">For Clients</p>
        <h2>Simple support when your family needs it most.</h2>
        <p>Whether care is needed a few hours per week or more consistent support, we help families understand needs, build a care plan, and match each client with dependable assistance.</p>
      </div>
      <ul className="checklist">
        <li><ShieldCheck /> Personalized care planning</li>
        <li><ShieldCheck /> Respectful in-home support</li>
        <li><ShieldCheck /> Flexible scheduling options</li>
        <li><ShieldCheck /> Clear family communication</li>
      </ul>
    </section>
  );
}

function Caregivers() {
  return (
    <section id="caregivers" className="section split soft">
      <div>
        <p className="eyebrow">For Caregivers</p>
        <h2>Join a care team built on professionalism.</h2>
        <p>We are looking for dependable caregivers who care about serving families with patience, consistency, and respect.</p>
      </div>
      <a className="btn primary" href="#caregiver-application">Apply Online</a>
    </section>
  );
}


function RequestForm() {
  const [status, setStatus] = React.useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type: "care_request" })
    });

    if (res.ok) {
      setStatus("Thank you. Your request has been submitted.");
      form.reset();
    } else {
      setStatus("Something went wrong. Please call us directly at 312-479-3515.");
    }
  }

  return (
    <section id="request" className="request section">
      <div className="section-head">
        <p className="eyebrow">Request Care</p>
        <h2>Tell us what kind of support you need.</h2>
        <p>Submit the form below and our team will follow up.</p>
      </div>

      <form onSubmit={submit}>
        <input name="full_name" placeholder="Full name" required />
        <input name="phone" placeholder="Phone number" required />
        <input name="email" placeholder="Email address" />
        <input name="service_needed" placeholder="Service needed" />
        <input name="preferred_start_date" placeholder="Preferred start date" />
        <textarea name="message" placeholder="Tell us what care is needed"></textarea>
        <button type="submit">Submit Request</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

function CaregiverApplication() {
  const [status, setStatus] = React.useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, type: "caregiver_application" })
    });

    if (res.ok) {
      setStatus("Thank you. Your application has been submitted.");
      form.reset();
    } else {
      setStatus("Something went wrong. Please call us directly at 312-479-3515.");
    }
  }

  return (
    <section id="caregiver-application" className="request section">
      <div className="section-head">
        <p className="eyebrow">Caregiver Application</p>
        <h2>Apply to join our care team.</h2>
        <p>We are looking for dependable, compassionate caregivers.</p>
      </div>

      <form onSubmit={submit}>
        <input name="full_name" placeholder="Full name" required />
        <input name="phone" placeholder="Phone number" required />
        <input name="email" placeholder="Email address" />
        <input name="experience" placeholder="Caregiving/CNA experience" />
        <input name="certifications" placeholder="Certifications, if any" />
        <textarea name="message" placeholder="Tell us why you would be a strong caregiver"></textarea>
        <button type="submit">Submit Application</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}


function ContactBar() {
  return (
    <section id="contact" className="contact-bar">
      <div><Phone /><span>Call Us</span><strong>{PHONE}</strong></div>
      <div><Mail /><span>Email Us</span><strong>{EMAIL}</strong></div>
      <div><MapPin /><span>Service Area</span><strong>{AREA}</strong></div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <img src="/logo-full.svg" alt="Hampton Healthcare Services" />
      <p>Dependable non-medical home care across the South Suburbs of Chicago.</p>
      <small>© {new Date().getFullYear()} Hampton Healthcare Services. All rights reserved.</small>
    </footer>
  );
}

function App() {
  return <><Header /><main><Hero /><Services /><About /><Clients /><Caregivers /><RequestForm />
      <CaregiverApplication /><ContactBar /></main><Footer /></>;
}

createRoot(document.getElementById("root")).render(<App />);
