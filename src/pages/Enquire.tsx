import { useEffect, useRef, useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";

type PersonaKey = "applicant" | "agent" | "staff" | "current";

function randomCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
  return code;
}

const refreshIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);
const arrowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function Captcha() {
  const [code, setCode] = useState(() => randomCaptcha());
  return (
    <div className="field field-full">
      <label>Verification <span className="required-mark">*</span></label>
      <div className="captcha-row">
        <div className="captcha-display">
          <span className="captcha-code">{code}</span>
          <button type="button" className="captcha-refresh" title="Refresh captcha" onClick={() => setCode(randomCaptcha())}>
            {refreshIcon}
          </button>
        </div>
        <input type="text" placeholder="Enter the code above" required />
      </div>
    </div>
  );
}

function Segmented({ name, options, required = true }: { name: string; options: string[]; required?: boolean }) {
  return (
    <div className="enquirer-type">
      <div className="enquirer-type-label">
        I am enquiring as <span className="enquirer-type-required">*</span>
      </div>
      <div className={`segmented-control${options.length === 2 ? " two-up" : ""}`} role="radiogroup">
        {options.map((o, i) => (
          <label key={o} className="segment-option">
            <input type="radio" name={name} value={o} defaultChecked={i === 0} required={required} />
            <span className="segment-option-content">{o}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Enquire() {
  usePageMeta({ title: "Register your interest — UWA India Enquiry", description: "Register your interest with UWA India — for prospective students, parents, agents and aspiring staff." });
  const [active, setActive] = useState<PersonaKey>("applicant");
  const submit = (e: React.FormEvent) => { e.preventDefault(); alert("Form submitted (demo)"); };
  const topRef = useRef<HTMLElement>(null);
  useEffect(() => { topRef.current?.scrollIntoView({ behavior: "auto", block: "start" }); }, []);

  const personas: { key: PersonaKey; label: string; desc: string; icon: JSX.Element }[] = [
    { key: "applicant", label: "Prospective Student / Parent / Guardian", desc: "Register interest in a programme or course",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg> },
    { key: "agent", label: "Education Agent / Others", desc: "Partner with us",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 11h-6M19 8v6" /></svg> },
    { key: "staff", label: "Aspiring Staff", desc: "Teaching & non-teaching roles",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><path d="M9 5h6v2H9z" /></svg> },
    { key: "current", label: "Current Student / Staff", desc: "Need support? Raise a request",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg> },
  ];

  return (
    <>
      <style>{ENQUIRE_CSS}</style>
      <section ref={topRef} className="enquiry-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Get in touch</span>
            <h1 className="section-title">Register your <em>interest</em></h1>
            <p className="section-subtitle">Whichever path brings you to UWA India — applicant, family member, agent, or future colleague — start here. We'll guide you the rest of the way.</p>
          </div>

          <div className="persona-tabs" role="tablist">
            {personas.map((p) => (
              <button
                key={p.key}
                className={`persona-tab${active === p.key ? " active" : ""}`}
                role="tab"
                aria-selected={active === p.key}
                onClick={() => setActive(p.key)}
              >
                <div className="persona-icon">{p.icon}</div>
                <span className="persona-label">{p.label}</span>
                <span className="persona-desc">{p.desc}</span>
              </button>
            ))}
          </div>

          <div className="form-card">
            {/* Applicant */}
            <div className={`form-panel${active === "applicant" ? " active" : ""}`}>
              <div className="panel-header">
                <div className="panel-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                </div>
                <div className="panel-header-text">
                  <h3>Register your interest in a programme</h3>
                  <p>For prospective students, parents, and guardians exploring UWA India.</p>
                </div>
              </div>

              <form onSubmit={submit}>
                <Segmented name="enquirer-applicant" options={["Student", "Parent", "Guardian"]} />
                <div className="form-grid">
                  <div className="field"><label>Full Name <span className="required-mark">*</span></label><input type="text" placeholder="Enter your full name" required /></div>
                  <div className="field"><label>Email Address <span className="required-mark">*</span></label><input type="email" placeholder="name@example.com" required /></div>
                  <div className="field field-full">
                    <label>Mobile Number <span className="required-mark">*</span></label>
                    <div className="phone-group">
                      <select><option>+91</option><option>+61</option><option>+1</option><option>+44</option></select>
                      <input type="tel" placeholder="10-digit mobile number" required />
                    </div>
                  </div>
                  <div className="field"><label>State <span className="required-mark">*</span></label>
                    <select required><option value="">Select state</option><option>Tamil Nadu</option><option>Maharashtra</option><option>Karnataka</option><option>Delhi</option><option>Other</option></select>
                  </div>
                  <div className="field"><label>District / City <span className="required-mark">*</span></label>
                    <select required><option value="">Select city</option><option>Chennai</option><option>Mumbai</option><option>Bengaluru</option><option>Delhi</option></select>
                  </div>
                  <div className="field"><label>Campus <span className="required-mark">*</span></label>
                    <select required><option value="">Select campus</option><option>Mumbai</option><option>Chennai</option></select>
                  </div>
                  <div className="field"><label>Programme <span className="required-mark">*</span></label>
                    <select required><option value="">Select programme</option><option>Undergraduate</option><option>Postgraduate</option></select>
                  </div>
                  <div className="field"><label>Course <span className="required-mark">*</span></label>
                    <select required><option value="">Select course</option><option>Bachelor of Computing</option><option>Bachelor of Business</option><option>Master of Data Science</option></select>
                  </div>
                  <div className="field"><label>Intake Year <span className="required-mark">*</span></label>
                    <select required><option value="">Select intake</option><option>September 2026</option><option>February 2027</option><option>September 2027</option></select>
                  </div>
                  <div className="field field-full"><label>Description / Message <span className="required-mark">*</span></label><textarea placeholder="Tell us anything else that would help us assist you..." required /></div>
                  <Captcha />
                </div>
                <div className="consent">
                  <input type="checkbox" id="consent-1" required />
                  <label htmlFor="consent-1">I consent to UWA India collecting and processing my personal data for my enquiry/application and to being contacted via Email, SMS, WhatsApp or Phone, in line with the <a href="#">Privacy Policy</a>.</label>
                </div>
                <button type="submit" className="submit-btn">Submit Enquiry {arrowIcon}</button>
              </form>
            </div>

            {/* Agent */}
            <div className={`form-panel${active === "agent" ? " active" : ""}`}>
              <div className="panel-header">
                <div className="panel-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 11h-6M19 8v6" /></svg>
                </div>
                <div className="panel-header-text">
                  <h3>Partner with UWA India</h3>
                  <p>For education agents and other professional enquirers.</p>
                </div>
              </div>
              <form onSubmit={submit}>
                <Segmented name="enquirer-agent" options={["Education Agent", "Others"]} />
                <div className="form-grid">
                  <div className="field"><label>Full Name <span className="required-mark">*</span></label><input type="text" placeholder="Enter your full name" required /></div>
                  <div className="field"><label>Email Address <span className="required-mark">*</span></label><input type="email" placeholder="name@example.com" required /></div>
                  <div className="field field-full">
                    <label>Phone Number <span className="required-mark">*</span></label>
                    <div className="phone-group">
                      <select><option>+91</option><option>+61</option><option>+1</option><option>+44</option></select>
                      <input type="tel" placeholder="Enter phone number" required />
                    </div>
                  </div>
                  <div className="field field-full"><label>Description <span className="required-mark">*</span></label><textarea placeholder="Tell us about your enquiry — organisation, region you operate in, partnership interest..." required /></div>
                  <Captcha />
                </div>
                <div className="consent">
                  <input type="checkbox" id="consent-2" required />
                  <label htmlFor="consent-2">I consent to UWA India collecting and processing my personal data for my enquiry and to being contacted via Email, SMS, WhatsApp or Phone, in line with the <a href="#">Privacy Policy</a>.</label>
                </div>
                <button type="submit" className="submit-btn">Submit Enquiry {arrowIcon}</button>
              </form>
            </div>

            {/* Staff */}
            <div className={`form-panel${active === "staff" ? " active" : ""}`}>
              <div className="panel-header">
                <div className="panel-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20 7h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><path d="M9 5h6v2H9z" /></svg>
                </div>
                <div className="panel-header-text">
                  <h3>Join our team</h3>
                  <p>For aspiring teaching and non-teaching staff at UWA India.</p>
                </div>
              </div>
              <form onSubmit={submit}>
                <Segmented name="enquirer-staff" options={["Aspiring Teaching Staff", "Aspiring Non-Teaching Staff"]} />
                <div className="form-grid">
                  <div className="field"><label>Full Name <span className="required-mark">*</span></label><input type="text" placeholder="Enter your full name" required /></div>
                  <div className="field"><label>Email Address <span className="required-mark">*</span></label><input type="email" placeholder="name@example.com" required /></div>
                  <div className="field field-full">
                    <label>Phone Number <span className="required-mark">*</span></label>
                    <div className="phone-group">
                      <select><option>+91</option><option>+61</option><option>+1</option><option>+44</option></select>
                      <input type="tel" placeholder="Enter phone number" required />
                    </div>
                  </div>
                  <div className="field field-full"><label>Description <span className="required-mark">*</span></label><textarea placeholder="Briefly describe your background, area of expertise, and the role you're interested in..." required /></div>
                  <Captcha />
                </div>
                <div className="consent">
                  <input type="checkbox" id="consent-3" required />
                  <label htmlFor="consent-3">I consent to UWA India collecting and processing my personal data for my enquiry and to being contacted via Email, SMS, WhatsApp or Phone, in line with the <a href="#">Privacy Policy</a>.</label>
                </div>
                <button type="submit" className="submit-btn">Submit Enquiry {arrowIcon}</button>
              </form>
            </div>

            {/* Current */}
            <div className={`form-panel${active === "current" ? " active" : ""}`}>
              <div className="redirect-panel">
                <div className="redirect-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" /></svg>
                </div>
                <h3>You're already part of UWA India</h3>
                <p>Current students and staff can access dedicated support services for academic queries, IT issues, administrative requests, and more — all in one place.</p>
                <a href="https://support.india.uwa.edu.au/" className="redirect-btn" target="_blank" rel="noopener">
                  Raise a Support Request {arrowIcon}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const ENQUIRE_CSS = `
.enquiry-section {
  --uwa-navy: #003087; --uwa-navy-deep: #001f5c; --uwa-gold: #DAAA00;
  --uwa-gold-soft: #f4e4a1; --ink: #1a1a2e; --ink-soft: #4a4a6a;
  --line: #e5e7ef; --line-strong: #c7cad9; --bg: #fafaf7; --card: #ffffff;
  --radius: 10px; --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0,31,92,0.06);
  --shadow-md: 0 8px 24px rgba(0,31,92,0.08);
  --shadow-lg: 0 20px 60px rgba(0,31,92,0.12);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--ink); line-height: 1.55; padding: 80px 24px;
  background: radial-gradient(circle at 10% 0%, rgba(0,48,135,0.04) 0%, transparent 40%),
              radial-gradient(circle at 90% 100%, rgba(218,170,0,0.05) 0%, transparent 40%), var(--bg);
  position: relative; overflow: hidden;
}
.enquiry-section::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background: linear-gradient(90deg, transparent, var(--uwa-navy), transparent); opacity: .15; }
.enquiry-section .container { max-width: 1200px; margin: 0 auto; position: relative; }
.enquiry-section * { box-sizing: border-box; }
.enquiry-section .section-header { text-align:center; margin-bottom:48px; }
.enquiry-section .eyebrow { display:inline-block; font-size:12px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; color:var(--uwa-navy); padding:6px 14px; background:rgba(0,48,135,0.06); border-radius:100px; margin-bottom:18px; }
.enquiry-section .section-title { font-family:'Fraunces', Georgia, serif; font-size:clamp(32px,5vw,48px); font-weight:500; letter-spacing:-0.02em; color:var(--uwa-navy-deep); margin:0 0 14px; line-height:1.1; }
.enquiry-section .section-title em { font-style:italic; color:var(--uwa-gold); font-weight:400; }
.enquiry-section .section-subtitle { font-size:17px; color:var(--ink-soft); max-width:620px; margin:0 auto; }
.enquiry-section .persona-tabs { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; background:var(--card); padding:12px; border-radius:var(--radius-lg) var(--radius-lg) 0 0; border:1px solid var(--line); border-bottom:none; box-shadow:var(--shadow-sm); }
.enquiry-section .persona-tab { position:relative; background:transparent; border:1.5px solid transparent; border-radius:var(--radius); padding:18px 14px; cursor:pointer; text-align:left; transition: all .25s cubic-bezier(.4,0,.2,1); font-family:inherit; }
.enquiry-section .persona-tab:hover { background:rgba(0,48,135,0.03); border-color:var(--line); }
.enquiry-section .persona-tab.active { background:var(--uwa-navy); border-color:var(--uwa-navy); }
.enquiry-section .persona-tab.active .persona-icon, .enquiry-section .persona-tab.active .persona-label, .enquiry-section .persona-tab.active .persona-desc { color:#fff; }
.enquiry-section .persona-tab.active .persona-icon { background: rgba(255,255,255,0.15); }
.enquiry-section .persona-icon { width:36px; height:36px; border-radius:8px; background:rgba(0,48,135,0.08); color:var(--uwa-navy); display:flex; align-items:center; justify-content:center; margin-bottom:10px; transition: all .25s; }
.enquiry-section .persona-icon svg { width:18px; height:18px; }
.enquiry-section .persona-label { display:block; font-size:14px; font-weight:600; color:var(--ink); margin-bottom:2px; line-height:1.3; }
.enquiry-section .persona-desc { display:block; font-size:12px; color:var(--ink-soft); line-height:1.35; }
.enquiry-section .form-card { background:var(--card); border:1px solid var(--line); border-radius: 0 0 var(--radius-lg) var(--radius-lg); padding:40px; box-shadow:var(--shadow-md); position:relative; }
.enquiry-section .form-panel { display:none; animation: enquiryFadeIn .4s ease; }
.enquiry-section .form-panel.active { display:block; }
@keyframes enquiryFadeIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
.enquiry-section .panel-header { display:flex; align-items:flex-start; gap:16px; padding-bottom:24px; margin-bottom:28px; border-bottom:1px solid var(--line); }
.enquiry-section .panel-header-icon { flex-shrink:0; width:44px; height:44px; background:var(--uwa-navy); color:#fff; border-radius:10px; display:flex; align-items:center; justify-content:center; }
.enquiry-section .panel-header-icon svg { width:22px; height:22px; }
.enquiry-section .panel-header-text h3 { font-family:'Fraunces', Georgia, serif; font-size:24px; font-weight:500; color:var(--uwa-navy-deep); margin:0 0 4px; letter-spacing:-0.01em; }
.enquiry-section .panel-header-text p { font-size:14px; color:var(--ink-soft); margin:0; }
.enquiry-section .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px 20px; }
.enquiry-section .field { display:flex; flex-direction:column; gap:6px; }
.enquiry-section .field-full { grid-column: 1 / -1; }
.enquiry-section .field label { font-size:13px; font-weight:500; color:var(--ink); display:flex; align-items:center; gap:4px; }
.enquiry-section .required-mark { color:var(--uwa-gold); font-weight:600; }
.enquiry-section .field input, .enquiry-section .field select, .enquiry-section .field textarea { font-family:inherit; font-size:15px; color:var(--ink); background:#fff; border:1.5px solid var(--line); border-radius:var(--radius); padding:12px 14px; transition: all .2s; width:100%; }
.enquiry-section .field input:hover, .enquiry-section .field select:hover, .enquiry-section .field textarea:hover { border-color:var(--line-strong); }
.enquiry-section .field input:focus, .enquiry-section .field select:focus, .enquiry-section .field textarea:focus { outline:none; border-color:var(--uwa-navy); box-shadow: 0 0 0 4px rgba(0,48,135,0.1); }
.enquiry-section .field select { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23003087' stroke-width='2' d='M1 1l5 5 5-5'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position: right 14px center; padding-right:40px; cursor:pointer; }
.enquiry-section .field textarea { resize:vertical; min-height:96px; }
.enquiry-section .phone-group { display:flex; gap:8px; }
.enquiry-section .phone-group select { flex: 0 0 90px; }
.enquiry-section .phone-group input { flex:1; }
.enquiry-section .captcha-row { display:grid; grid-template-columns:auto 1fr; gap:12px; align-items:stretch; }
.enquiry-section .captcha-display { background: repeating-linear-gradient(45deg, #f5f5f0, #f5f5f0 2px, #fafaf5 2px, #fafaf5 4px); border:1.5px solid var(--line); border-radius:var(--radius); padding:0 18px; display:flex; align-items:center; gap:12px; min-height:46px; }
.enquiry-section .captcha-code { font-family:'Fraunces', Georgia, serif; font-size:22px; font-weight:600; letter-spacing:4px; color:var(--uwa-navy-deep); font-style:italic; text-decoration: line-through; text-decoration-color: rgba(218,170,0,0.4); user-select:none; }
.enquiry-section .captcha-refresh { background:transparent; border:none; color:var(--uwa-navy); cursor:pointer; padding:4px; display:flex; align-items:center; border-radius:4px; transition: all .2s; }
.enquiry-section .captcha-refresh:hover { background: rgba(0,48,135,0.08); transform: rotate(90deg); }
.enquiry-section .consent { display:flex; align-items:flex-start; gap:10px; margin:28px 0 20px; padding:16px; background: rgba(0,48,135,0.025); border-radius:var(--radius); border-left:3px solid var(--uwa-gold); }
.enquiry-section .consent input[type="checkbox"] { margin-top:3px; width:16px; height:16px; accent-color: var(--uwa-navy); flex-shrink:0; cursor:pointer; }
.enquiry-section .consent label { font-size:13px; color:var(--ink-soft); line-height:1.5; cursor:pointer; }
.enquiry-section .consent a { color: var(--uwa-navy); font-weight:500; text-decoration:underline; text-underline-offset:2px; }
.enquiry-section .submit-btn { width:100%; background:var(--uwa-navy); color:#fff; border:none; padding:16px 24px; border-radius:var(--radius); font-family:inherit; font-size:15px; font-weight:600; letter-spacing:.5px; text-transform:uppercase; cursor:pointer; transition: all .25s; display:flex; align-items:center; justify-content:center; gap:10px; position:relative; overflow:hidden; }
.enquiry-section .submit-btn::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transition: left .6s; }
.enquiry-section .submit-btn:hover { background: var(--uwa-navy-deep); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.enquiry-section .submit-btn:hover::before { left:100%; }
.enquiry-section .submit-btn svg { width:16px; height:16px; }
.enquiry-section .redirect-panel { text-align:center; padding:40px 20px; }
.enquiry-section .redirect-icon { width:72px; height:72px; background: linear-gradient(135deg, var(--uwa-navy), var(--uwa-navy-deep)); color:#fff; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; margin-bottom:22px; box-shadow: 0 12px 32px rgba(0,48,135,0.25); }
.enquiry-section .redirect-icon svg { width:32px; height:32px; }
.enquiry-section .redirect-panel h3 { font-family:'Fraunces', Georgia, serif; font-size:26px; color:var(--uwa-navy-deep); margin:0 0 10px; font-weight:500; }
.enquiry-section .redirect-panel p { color:var(--ink-soft); font-size:16px; max-width:480px; margin:0 auto 28px; }
.enquiry-section .redirect-btn { display:inline-flex; align-items:center; gap:10px; background:var(--uwa-navy); color:#fff; padding:14px 28px; border-radius:var(--radius); text-decoration:none; font-weight:600; font-size:15px; transition: all .25s; }
.enquiry-section .redirect-btn:hover { background: var(--uwa-navy-deep); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.enquiry-section .redirect-btn svg { width:16px; height:16px; transition: transform .25s; }
.enquiry-section .redirect-btn:hover svg { transform: translateX(4px); }
.enquiry-section .enquirer-type { margin-bottom:28px; position:relative; }
.enquiry-section .enquirer-type-label { display:flex; align-items:center; gap:8px; font-size:12px; text-transform:uppercase; letter-spacing:1.5px; color:var(--uwa-navy); font-weight:600; margin-bottom:12px; }
.enquiry-section .enquirer-type-label::before { content:''; width:18px; height:1.5px; background: var(--uwa-gold); display:inline-block; }
.enquiry-section .enquirer-type-required { color: var(--uwa-gold); font-weight:700; margin-left:2px; }
.enquiry-section .segmented-control { display:flex; background:#f5f6fa; border:1px solid var(--line); border-radius:12px; padding:5px; gap:4px; position:relative; }
.enquiry-section .segment-option { flex:1; position:relative; cursor:pointer; }
.enquiry-section .segment-option input[type="radio"] { position:absolute; opacity:0; pointer-events:none; }
.enquiry-section .segment-option-content { display:flex; align-items:center; justify-content:center; gap:8px; padding:12px 16px; border-radius:8px; font-size:14px; font-weight:500; color:var(--ink-soft); transition: all .25s cubic-bezier(.4,0,.2,1); text-align:center; user-select:none; border:1.5px solid transparent; }
.enquiry-section .segment-option:hover .segment-option-content { color: var(--uwa-navy); background: rgba(0,48,135,0.04); }
.enquiry-section .segment-option input[type="radio"]:checked + .segment-option-content { background:#fff; color: var(--uwa-navy-deep); font-weight:600; box-shadow: 0 2px 8px rgba(0,48,135,0.08), 0 0 0 1px rgba(0,48,135,0.08); border-color: var(--uwa-navy); }
.enquiry-section .segment-option input[type="radio"]:checked + .segment-option-content::before { content:''; width:14px; height:14px; background:var(--uwa-navy); border-radius:50%; display:inline-flex; flex-shrink:0; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%23fff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' d='M2 6l3 3 5-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:center; background-size:10px; }
.enquiry-section .segmented-control.two-up { max-width:520px; }
@media (max-width: 880px) {
  .enquiry-section .persona-tabs { grid-template-columns: 1fr 1fr; }
  .enquiry-section .form-grid { grid-template-columns: 1fr; }
  .enquiry-section .form-card { padding: 28px 22px; }
}
@media (max-width: 600px) {
  .enquiry-section .segmented-control { flex-direction: column; }
  .enquiry-section .segment-option-content { justify-content: flex-start; padding: 14px 16px; }
}
@media (max-width: 500px) {
  .enquiry-section { padding: 56px 16px; }
  .enquiry-section .persona-tabs { grid-template-columns: 1fr; padding: 8px; }
  .enquiry-section .persona-tab { padding: 14px; display: flex; align-items: center; gap: 12px; }
  .enquiry-section .persona-icon { margin-bottom: 0; }
  .enquiry-section .panel-header { flex-direction: column; gap: 12px; }
}
`;

export default Enquire;
