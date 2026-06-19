# 🩺 Clinic Connect — Free Clinic & Hospital Management System Generator

**A product of HMG Concepts (His Marvellous Grace) — EdTech · DataTech · FaithTech.**

Clinic Connect is a **no-code generator**: you (or a client) fill a short wizard —
clinic details, logo, colours, fonts, layout, departments, staff categories,
activities and features — and it instantly produces a **complete, ready-to-deploy
clinic / hospital management system** as a downloadable ZIP. 100% **free tools**
(Supabase free tier + free static hosting). **No AI API — it is not cost effective.**
You own 100% of your code and data, with zero monthly software fees.

It's part of the **HMG Connect Suite** alongside DramaConnect, Church Connect,
School Connect and Business Connect — a factory that builds full, database-backed
systems for any organisation.

## 🏥 Covers every kind of health practice
**6 clinic-type presets:** General Clinic / OPD · Hospital (with Wards) ·
Pharmacy / Drug Store · Diagnostic Lab / Imaging · Dental Clinic ·
Maternity / Specialist. Each pre-fills layout, colours, features and departments —
fully editable afterwards.

## 🧩 Modules generated (30+)
Dashboard · Staff & Profiles · Staff Directory · **Patients / EMR** ·
Appointments · **Consultations / Visits** · **Vitals & Triage** ·
**Prescriptions** (printable) · **Lab Tests & Results** · **Pharmacy / Drugs**
(stock, expiry & dispensing) · **Wards / Admissions** · Billing & Invoices
(printable) · Finance · Supplies/Inventory · Staff Attendance · **Duty Roster /
Shifts** · HR / Leave · Tasks · **Referrals** · Support / Complaints ·
Patient Feedback · Announcements · Messaging (WhatsApp/Email/SMS) · In-App Inbox ·
Documents · Media Gallery · Reports & Export · Analytics & Charts ·
Staff/Patient ID Cards (QR) · Departments & Units · Compliance & Policies ·
Protocols / Knowledge Base · Audit Log · Settings & Backup · Broadcast.

### Clinical highlights
- **Patients / EMR** — registry with auto MRN, demographics, blood group & allergies, with instant search.
- **Consultations & Vitals** — record complaints, diagnosis & treatment plus BP, temp, pulse, weight & SpO₂.
- **Prescriptions** — prescribe and **print a branded prescription** in one click.
- **Lab Tests & Results** — order tests and record results per patient (pending/completed).
- **Pharmacy** — track drug stock, **expiry-soon & low-stock alerts**, and dispense (auto-posts income to Finance).
- **Wards / Admissions** — admit patients to beds/wards and track discharge.
- **Billing & Finance** — bill consultations, tests & drugs; income/expense ledger.

## 🚀 Deploying the generated platform (5 clear steps)
1. **Create the database (free):** go to <https://supabase.com> → "New project"
   (free tier). When ready, open **SQL Editor → New query**, paste the entire
   contents of `database/schema.sql`, and click **Run**. This builds all tables,
   security rules (Row Level Security) and the sign-up trigger.
2. **Get your keys:** Supabase **Project Settings → API**; copy the **Project URL**
   and the **anon public** key.
3. **Connect the app:** open `assets/js/config.js` and paste the URL + anon key
   into `SUPABASE_URL` and `SUPABASE_KEY`. Save.
4. **Publish (free hosting):** upload this whole folder to **GitHub Pages**
   (repo → Settings → Pages → deploy from branch / root; `.nojekyll` is included),
   or **Cloudflare Pages** / **Vercel**. Keep `index.html` at the site root.
5. **Become the admin:** open the live site, click **Request Access**, sign up,
   then in Supabase **SQL Editor** run (use your email):
   `UPDATE profiles SET role='admin',status='approved' WHERE email='you@email';`
   Reload — you now have full control and can approve other staff.

## 🔒 Security model
Supabase Auth + **Row Level Security** on every table — including all clinical
tables (patients, encounters, vitals, prescriptions, lab tests, drugs,
admissions, roster, referrals). Signed-in staff read shared data; only admins
write management tables. The `service_role` key is never used in the browser —
only the **anon** key in `config.js`.

## ⚙️ Optional free automation pack (NO paid AI API)
If included, the ZIP contains `supabase/functions/` Edge Functions and
`docs/AUTOMATION.md`: daily digest, low-stock/expiry alerts and reminders —
100% free (Supabase free tier + Resend free email tier). The app works fully
without them.

## 🏷️ Brand embedding (lead generation)
Every generated platform carries **"Powered by HMG Concepts"** (login, sidebar,
README, invoices, prescriptions, public site) linking to hmgconcepts.pages.dev,
cssadewale.pages.dev & WhatsApp — so every deployed clinic site becomes a
referral channel back to you.

---
© HMG Concepts. Built by Adewale Samson Adeagbo. Lagos, Nigeria. EdTech · DataTech · FaithTech.
