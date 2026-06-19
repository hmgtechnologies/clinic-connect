/**
 * Clinic Connect — catalog of selectable options used to configure & generate
 * a custom clinic / hospital management platform. 100% free tooling
 * (Supabase free tier + static hosting). NO AI API — not cost effective.
 */
const CATALOG = {
    palettes: [
        { id: 'teal',     name: 'Medical Teal',   primary: '#0d9488', dark: '#115e59', accent: '#f59e0b' },
        { id: 'emerald',  name: 'Health Green',   primary: '#059669', dark: '#065f46', accent: '#d97706' },
        { id: 'corporate',name: 'Clinical Blue',  primary: '#1d4ed8', dark: '#1e3a8a', accent: '#f97316' },
        { id: 'royal',    name: 'Care Indigo',    primary: '#4f46e5', dark: '#3730a3', accent: '#f59e0b' },
        { id: 'crimson',  name: 'Vital Red',      primary: '#dc2626', dark: '#991b1b', accent: '#0ea5e9' },
        { id: 'violet',   name: 'Calm Violet',    primary: '#7c3aed', dark: '#5b21b6', accent: '#10b981' },
        { id: 'slate',    name: 'Executive Slate',primary: '#0f172a', dark: '#020617', accent: '#14b8a6' },
        { id: 'amber',    name: 'Warm Amber',     primary: '#b45309', dark: '#78350f', accent: '#1d4ed8' }
    ],
    fonts: [
        { id: 'inter',     name: 'Inter (Modern)',     stack: "'Inter',system-ui,sans-serif",  google: 'Inter:wght@400;600;800' },
        { id: 'poppins',   name: 'Poppins (Friendly)', stack: "'Poppins',sans-serif",          google: 'Poppins:wght@400;600;800' },
        { id: 'montserrat',name: 'Montserrat (Bold)',  stack: "'Montserrat',sans-serif",        google: 'Montserrat:wght@400;600;800' },
        { id: 'merriweather', name: 'Merriweather (Classic)', stack: "'Merriweather',serif",    google: 'Merriweather:wght@400;700;900' },
        { id: 'system',    name: 'System (Fastest)',   stack: "system-ui,-apple-system,sans-serif", google: '' }
    ],
    layouts: [
        { id: 'sidebar',  name: 'Sidebar Navigation', desc: 'Left sidebar + content (best for clinical dashboards).' },
        { id: 'topnav',   name: 'Top Navigation',     desc: 'Top menu bar + content (clean & familiar).' },
        { id: 'cards',    name: 'Card Hub',           desc: 'A launchpad of big feature cards on the home screen.' }
    ],
    // Clinical departments / units
    departments: [
        { id: 'gp',          name: 'General Practice / OPD', icon: 'fa-user-doctor' },
        { id: 'nursing',     name: 'Nursing',              icon: 'fa-user-nurse' },
        { id: 'pharmacy',    name: 'Pharmacy',             icon: 'fa-prescription-bottle-medical' },
        { id: 'laboratory',  name: 'Laboratory',           icon: 'fa-flask-vial' },
        { id: 'radiology',   name: 'Radiology / Imaging',  icon: 'fa-x-ray' },
        { id: 'paediatrics', name: 'Paediatrics',          icon: 'fa-baby' },
        { id: 'maternity',   name: 'Maternity / O&G',      icon: 'fa-person-pregnant' },
        { id: 'dental',      name: 'Dental',               icon: 'fa-tooth' },
        { id: 'theatre',     name: 'Theatre / Surgery',    icon: 'fa-syringe' },
        { id: 'emergency',   name: 'Emergency / A&E',      icon: 'fa-truck-medical' },
        { id: 'records',     name: 'Medical Records',      icon: 'fa-folder-open' },
        { id: 'billing_d',   name: 'Billing / Accounts',   icon: 'fa-file-invoice-dollar' },
        { id: 'admin_d',     name: 'Admin / Front Desk',   icon: 'fa-building' },
        { id: 'physio',      name: 'Physiotherapy',        icon: 'fa-hand-holding-medical' }
    ],
    // "Age groups" reused as STAFF CATEGORIES / TEAM TIERS
    ageGroups: [
        { id: 'doctors',    name: 'Doctors / Consultants' },
        { id: 'nurses',     name: 'Nurses' },
        { id: 'pharmacists',name: 'Pharmacists' },
        { id: 'labtechs',   name: 'Lab Scientists / Techs' },
        { id: 'admin_staff',name: 'Admin / Front Desk' },
        { id: 'support',    name: 'Support Staff' },
        { id: 'locum',      name: 'Locum / Part-time' },
        { id: 'patients',   name: 'Patients' }
    ],
    activities: [
        { id: 'consult',    name: 'Consultations' },
        { id: 'triage',     name: 'Triage & Vitals' },
        { id: 'dispense',   name: 'Dispensing Drugs' },
        { id: 'labwork',    name: 'Lab & Diagnostics' },
        { id: 'admission',  name: 'Admissions / Ward Rounds' },
        { id: 'billing_a',  name: 'Billing & Payments' },
        { id: 'immunise',   name: 'Immunisation' },
        { id: 'referral',   name: 'Referrals' },
        { id: 'training_a', name: 'Staff Training' }
    ],
    // App features (each maps to a generated page/module)
    features: [
        { id: 'staff',       name: 'Staff & Profiles',       icon: 'fa-users',        core: true, desc: 'Doctors, nurses & staff records, photos, departments & roles.' },
        { id: 'directory',   name: 'Staff Directory',        icon: 'fa-address-book', desc: 'Searchable team directory with contacts.' },
        { id: 'patients',    name: 'Patients / EMR',         icon: 'fa-hospital-user',clinical: true, desc: 'Patient registry with demographics & medical record numbers.' },
        { id: 'appointments',name: 'Appointments / Bookings',icon: 'fa-calendar-check',desc: 'Patient bookings & clinic scheduling.' },
        { id: 'encounters',  name: 'Consultations / Visits', icon: 'fa-notes-medical',clinical: true, desc: 'Record visits: complaints, diagnosis & treatment notes.' },
        { id: 'vitals',      name: 'Vitals & Triage',        icon: 'fa-heart-pulse',  clinical: true, desc: 'BP, temperature, pulse, weight & triage notes.' },
        { id: 'prescriptions',name:'Prescriptions',          icon: 'fa-prescription', clinical: true, desc: 'Prescribe drugs; print prescriptions.' },
        { id: 'labtests',    name: 'Lab Tests / Results',    icon: 'fa-flask-vial',   clinical: true, desc: 'Order tests & record results per patient.' },
        { id: 'pharmacy',    name: 'Pharmacy / Drugs',       icon: 'fa-prescription-bottle-medical', clinical: true, desc: 'Drug stock, expiry & dispensing with low-stock alerts.' },
        { id: 'admissions',  name: 'Wards / Admissions',     icon: 'fa-bed-pulse',    clinical: true, desc: 'Admit patients to beds/wards; track discharge.' },
        { id: 'billing',     name: 'Billing & Invoices',     icon: 'fa-file-invoice-dollar', desc: 'Bill consultations, tests & drugs; printable invoice.' },
        { id: 'finance',     name: 'Finance / Accounting',   icon: 'fa-wallet',       desc: 'Income & expense ledger with summaries.' },
        { id: 'inventory',   name: 'Supplies / Inventory',   icon: 'fa-boxes-stacked',desc: 'Consumables & equipment with low-stock alerts.' },
        { id: 'attendance',  name: 'Staff Attendance',       icon: 'fa-user-check',   desc: 'Clock-in / daily attendance.' },
        { id: 'roster',      name: 'Duty Roster / Shifts',   icon: 'fa-calendar-days',clinical: true, desc: 'Assign shifts & on-call duties to staff.' },
        { id: 'hr',          name: 'HR / Leave',             icon: 'fa-users-gear',   desc: 'Leave requests & staff records.' },
        { id: 'tasks',       name: 'Tasks / To-do',          icon: 'fa-list-check',   desc: 'Assign & track team tasks.' },
        { id: 'referrals',   name: 'Referrals',              icon: 'fa-share-from-square', clinical: true, desc: 'Refer patients in/out; track status.' },
        { id: 'tickets',     name: 'Support / Complaints',   icon: 'fa-headset',      desc: 'Patient complaints & requests with status.' },
        { id: 'feedback',    name: 'Patient Feedback',       icon: 'fa-star',         desc: 'Reviews & satisfaction from patients.' },
        { id: 'announcements',name:'Announcements',          icon: 'fa-bullhorn',     desc: 'Clinic-wide notices on the dashboard.' },
        { id: 'messaging',   name: 'Messaging (WhatsApp/Email)', icon: 'fa-paper-plane', desc: 'Reach staff/patients — free, in bulk.' },
        { id: 'inbox',       name: 'In-App Inbox',           icon: 'fa-inbox',        desc: 'Private staff↔management messaging.' },
        { id: 'documents',   name: 'Documents / Files',      icon: 'fa-folder-open',  desc: 'Policies, protocols & shared files.' },
        { id: 'gallery',     name: 'Media Gallery',          icon: 'fa-images',       desc: 'Facility & event photos & albums.' },
        { id: 'reports',     name: 'Reports & Export',       icon: 'fa-file-export',  desc: 'Excel / CSV exports for any dataset.' },
        { id: 'analytics',   name: 'Analytics & Charts',     icon: 'fa-chart-line',   desc: 'Visual dashboards: income, visits & pipeline.' },
        { id: 'idcards',     name: 'Staff/Patient ID Cards', icon: 'fa-id-card',      desc: 'Branded cards with QR.' },
        { id: 'units',       name: 'Departments & Units',    icon: 'fa-people-group', desc: 'Per-department coordination.' },
        { id: 'compliance',  name: 'Compliance & Policies',  icon: 'fa-clipboard-check', desc: 'Policy acknowledgements & compliance register.' },
        { id: 'knowledge',   name: 'Protocols / Knowledge',  icon: 'fa-book-open',    desc: 'Searchable clinical protocols & SOPs.' },
        { id: 'audit',       name: 'Audit Log',              icon: 'fa-clipboard-list', desc: 'Immutable trail of admin actions for accountability.' },
        { id: 'settings',    name: 'Settings & Backup',      icon: 'fa-gear',         desc: 'Org profile, data export/backup & admin controls.' },
        { id: 'broadcast',   name: 'Broadcast / Bulk Notify',icon: 'fa-tower-broadcast', desc: 'Notify staff/patients via WhatsApp/email/SMS.' }
    ],

    // Clinic-type presets — pre-fill features + departments for each type.
    presets: [
        {
            id: 'clinic', name: 'General Clinic / OPD',
            icon: 'fa-stethoscope', desc: 'Outpatient clinics: patients, appointments, consults, prescriptions & billing.',
            palette: 'teal', font: 'inter', layout: 'sidebar',
            features: ['staff','patients','appointments','encounters','vitals','prescriptions','labtests','pharmacy','billing','finance','inventory','attendance','announcements','messaging','reports','analytics','idcards','audit','settings','broadcast'],
            departments: ['General Practice / OPD','Nursing','Pharmacy','Laboratory','Billing / Accounts','Admin / Front Desk'],
            ageGroups: ['Doctors / Consultants','Nurses','Pharmacists','Lab Scientists / Techs','Admin / Front Desk','Patients'],
            activities: ['Consultations','Triage & Vitals','Dispensing Drugs','Lab & Diagnostics','Billing & Payments']
        },
        {
            id: 'hospital', name: 'Hospital (with Wards)',
            icon: 'fa-hospital', desc: 'Hospitals: full EMR, admissions/wards, theatre, labs, pharmacy & roster.',
            palette: 'corporate', font: 'inter', layout: 'sidebar',
            features: ['staff','directory','patients','appointments','encounters','vitals','prescriptions','labtests','pharmacy','admissions','billing','finance','inventory','attendance','roster','hr','tasks','referrals','announcements','messaging','inbox','documents','knowledge','compliance','reports','analytics','idcards','units','audit','settings','broadcast'],
            departments: ['General Practice / OPD','Nursing','Pharmacy','Laboratory','Radiology / Imaging','Theatre / Surgery','Emergency / A&E','Maternity / O&G','Medical Records','Billing / Accounts'],
            ageGroups: ['Doctors / Consultants','Nurses','Pharmacists','Lab Scientists / Techs','Admin / Front Desk','Support Staff','Patients'],
            activities: ['Consultations','Triage & Vitals','Dispensing Drugs','Lab & Diagnostics','Admissions / Ward Rounds','Billing & Payments','Referrals']
        },
        {
            id: 'pharmacy', name: 'Pharmacy / Drug Store',
            icon: 'fa-prescription-bottle-medical', desc: 'Community pharmacies: drug stock, dispensing, sales & billing.',
            palette: 'emerald', font: 'poppins', layout: 'sidebar',
            features: ['staff','patients','pharmacy','prescriptions','billing','finance','inventory','attendance','feedback','announcements','messaging','reports','analytics','idcards','audit','settings','broadcast'],
            departments: ['Pharmacy','Billing / Accounts','Admin / Front Desk'],
            ageGroups: ['Pharmacists','Support Staff','Admin / Front Desk','Patients'],
            activities: ['Dispensing Drugs','Billing & Payments']
        },
        {
            id: 'lab', name: 'Diagnostic Lab / Imaging',
            icon: 'fa-flask-vial', desc: 'Labs & imaging centres: test orders, results, billing & reports.',
            palette: 'violet', font: 'inter', layout: 'sidebar',
            features: ['staff','patients','appointments','labtests','billing','finance','inventory','attendance','referrals','announcements','messaging','documents','reports','analytics','idcards','audit','settings','broadcast'],
            departments: ['Laboratory','Radiology / Imaging','Billing / Accounts','Admin / Front Desk'],
            ageGroups: ['Lab Scientists / Techs','Doctors / Consultants','Admin / Front Desk','Patients'],
            activities: ['Lab & Diagnostics','Billing & Payments','Referrals']
        },
        {
            id: 'dental', name: 'Dental Clinic',
            icon: 'fa-tooth', desc: 'Dental practices: patients, appointments, treatments & billing.',
            palette: 'royal', font: 'poppins', layout: 'sidebar',
            features: ['staff','patients','appointments','encounters','prescriptions','billing','finance','inventory','attendance','feedback','announcements','messaging','gallery','reports','analytics','idcards','audit','settings','broadcast'],
            departments: ['Dental','Nursing','Billing / Accounts','Admin / Front Desk'],
            ageGroups: ['Doctors / Consultants','Nurses','Admin / Front Desk','Patients'],
            activities: ['Consultations','Billing & Payments']
        },
        {
            id: 'maternity', name: 'Maternity / Specialist',
            icon: 'fa-person-pregnant', desc: 'Maternity & specialist clinics: ANC, admissions, EMR & billing.',
            palette: 'crimson', font: 'inter', layout: 'sidebar',
            features: ['staff','directory','patients','appointments','encounters','vitals','prescriptions','labtests','pharmacy','admissions','billing','finance','inventory','attendance','roster','announcements','messaging','inbox','documents','knowledge','reports','analytics','idcards','units','audit','settings','broadcast'],
            departments: ['Maternity / O&G','Nursing','Paediatrics','Pharmacy','Laboratory','Billing / Accounts'],
            ageGroups: ['Doctors / Consultants','Nurses','Pharmacists','Lab Scientists / Techs','Admin / Front Desk','Patients'],
            activities: ['Consultations','Triage & Vitals','Admissions / Ward Rounds','Immunisation','Billing & Payments']
        }
    ],

    pricing: {
        currency: '₦',
        base: 50000,
        perFeature: 6000,
        perDepartment: 1500,
        addons: [
            { id: 'deploy',   name: 'We deploy it for you (hosting + Supabase setup)', price: 35000 },
            { id: 'training', name: 'Staff training session (1 hour)',                 price: 20000 },
            { id: 'data',     name: 'Bulk patient/staff/drug import',                  price: 35000 },
            { id: 'brand',    name: 'Invoice & prescription template branding',        price: 20000 },
            { id: 'domain',   name: 'Custom domain setup',                             price: 10000 },
            { id: 'support',  name: '3 months priority support',                       price: 40000 },
            { id: 'edge',     name: 'Automation pack (appointment/stock reminders)',  price: 50000 },
            { id: 'multi',    name: 'Multi-branch / multi-location setup',             price: 25000 }
        ]
    }
};
window.CATALOG = CATALOG;
