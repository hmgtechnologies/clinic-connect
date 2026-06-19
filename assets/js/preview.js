/**
 * Clinic Connect — full interactive multi-page PREVIEW.
 * Builds a single self-contained HTML document that runs the REAL generated
 * app (app.js + modules.js) against a MOCK Supabase client seeded with demo
 * data, so the operator/client can click through every page before downloading.
 * No backend needed — 100% in the iframe.
 */
const Preview = {
    demo(c) {
        const depts = (c.departments && c.departments.length) ? c.departments : ['Sales', 'Operations', 'Finance / Accounts'];
        const titles = ['Medical Director', 'Doctor', 'Nurse', 'Pharmacist', 'Lab Scientist', 'Front Desk', 'Nurse', 'Accountant'];
        const names = ['Dr. Grace Adeyemi', 'Dr. John Okoro', 'Nurse Mary Bello', 'Pharm. Daniel Musa', 'Esther Obi', 'Samuel Eze', 'Nurse Ruth Ali', 'Peter Udo'];
        const profiles = names.map((n, i) => ({
            id: 'demo-' + i, full_name: n, email: n.split(' ')[0].toLowerCase() + '@demo.org',
            phone: '0803000000' + i, department: depts[i % depts.length], job_title: titles[i % titles.length],
            staff_no: 'EMP/' + (1000 + i),
            role: i === 0 ? 'admin' : (i === 1 ? 'manager' : 'staff'), status: 'approved',
            birth_month: ((i * 2) % 12) + 1, birth_day: (i * 3 % 27) + 1, occupation: titles[i % titles.length]
        }));
        const me = profiles[0];
        const today = new Date();
        const fmt = d => d.toISOString().slice(0, 10);
        return {
            me,
            tables: {
                profiles,
                finances: [
                    { id: 'f1', date: fmt(today), description: 'Product sales', type: 'income', amount: 850000 },
                    { id: 'f2', date: fmt(today), description: 'Consulting fees', type: 'income', amount: 420000 },
                    { id: 'f3', date: fmt(today), description: 'Office rent', type: 'expense', amount: 200000 },
                    { id: 'f4', date: fmt(today), description: 'Salaries', type: 'expense', amount: 600000 }
                ],
                customers: [
                    { id: 'cu1', name: 'Bright Stores Ltd', email: 'info@bright.com', phone: '08030001111', company: 'Bright Stores', stage: 'customer' },
                    { id: 'cu2', name: 'Tunde A.', email: 'tunde@mail.com', phone: '08030002222', company: '—', stage: 'lead' },
                    { id: 'cu3', name: 'Zenith Corp', email: 'buy@zenith.com', phone: '08030003333', company: 'Zenith', stage: 'qualified' }
                ],
                deals: [
                    { id: 'd1', title: 'Annual supply contract', customer: 'Bright Stores Ltd', amount: 1500000, stage: 'negotiation', close_date: fmt(today) },
                    { id: 'd2', title: 'Website project', customer: 'Zenith Corp', amount: 450000, stage: 'won' }
                ],
                invoices: [
                    { id: 'iv1', number: 'INV-1001', customer: 'Bright Stores Ltd', amount: 500000, paid: 500000, status: 'paid', items: 'Goods supplied' },
                    { id: 'iv2', number: 'INV-1002', customer: 'Zenith Corp', amount: 450000, paid: 200000, status: 'part', items: 'Website (50% deposit)' }
                ],
                inventory: [
                    { id: 'in1', name: 'Carton of Juice', sku: 'JUICE-01', quantity: 120, reorder_level: 20, price: 4500 },
                    { id: 'in2', name: 'Printer Paper (Ream)', sku: 'PAP-02', quantity: 8, reorder_level: 10, price: 3500 }
                ],
                projects: [
                    { id: 'pr1', name: 'Zenith Website', client: 'Zenith Corp', status: 'active', deadline: fmt(new Date(today.getTime()+14*864e5)), details: 'Corporate site build' }
                ],
                tasks: [
                    { id: 't1', title: 'Follow up Tunde', assignee_id: 'demo-1', status: 'open', due_date: fmt(today) }
                ],
                appointments: [
                    { id: 'ap1', customer: 'Walk-in client', phone: '08030004444', service: 'Consultation', appt_date: new Date(today.getTime()+864e5).toISOString(), status: 'booked' }
                ],
                tickets: [
                    { id: 'tk1', subject: 'Delivery delay', customer: 'Bright Stores Ltd', priority: 'high', status: 'open', details: 'Order #345 not delivered' }
                ],
                leave_requests: [
                    { id: 'lv1', staff_id: 'demo-2', type: 'Annual leave', start_date: fmt(today), end_date: fmt(new Date(today.getTime()+5*864e5)), status: 'pending' }
                ],
                feedback: [
                    { id: 'fb1', name: 'Happy Customer', rating: 5, comment: 'Excellent service!', created_at: today.toISOString() }
                ],
                attendance: [
                    { id: 'at1', member_id: 'demo-1', service_date: fmt(today), status: 'present' }
                ],
                events: [
                    { id: 'e1', title: 'Team Meeting', event_date: new Date(today.getTime()+2*864e5).toISOString(), location: 'Boardroom', description: 'Weekly sync' },
                    { id: 'e2', title: 'Product Launch', event_date: new Date(today.getTime()+20*864e5).toISOString(), location: 'Event Centre', description: '' }
                ],
                announcements: [
                    { id: 'a1', title: 'New CRM is live!', body: 'Please log all leads in the portal.', created_at: today.toISOString() }
                ],
                resources: [
                    { id: 'r1', title: 'Staff Handbook', url: '#', description: 'PDF' },
                    { id: 'r2', title: 'Price List 2026', url: '#', description: 'Excel' }
                ],
                gallery: [
                    { id: 'g1', title: 'Our Storefront', album: 'Branding', image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' }
                ],
                patients: [
                    { id: 'pt1', mrn: 'MRN001', full_name: 'Ada Nwosu', sex: 'Female', phone: '08031110001', blood_group: 'O+', created_at: today.toISOString() },
                    { id: 'pt2', mrn: 'MRN002', full_name: 'Musa Bello', sex: 'Male', phone: '08031110002', blood_group: 'A+', created_at: today.toISOString() }
                ],
                encounters: [
                    { id: 'en1', patient_id: 'pt1', complaint: 'Fever & headache', diagnosis: 'Malaria', treatment: 'Antimalarials, rest', doctor: 'Dr. John Okoro', created_at: today.toISOString() }
                ],
                vitals: [
                    { id: 'vi1', patient_id: 'pt1', bp: '120/80', temp: '38.2', pulse: '88', weight: '64', spo2: '98', note: 'Febrile', created_at: today.toISOString() }
                ],
                prescriptions: [
                    { id: 'rx1', patient_id: 'pt1', drug: 'Artemether/Lumefantrine 80/480', dose: '1 tab', frequency: 'BD', duration: '3 days', doctor: 'Dr. John Okoro', created_at: today.toISOString() }
                ],
                lab_tests: [
                    { id: 'lb1', patient_id: 'pt1', test: 'Malaria Parasite (MP)', result: 'Positive (++)', status: 'completed', created_at: today.toISOString() },
                    { id: 'lb2', patient_id: 'pt2', test: 'FBC', result: '', status: 'pending', created_at: today.toISOString() }
                ],
                drugs: [
                    { id: 'dg1', name: 'Paracetamol 500mg', quantity: 240, reorder_level: 50, price: 30, expiry: fmt(new Date(today.getTime()+200*864e5)) },
                    { id: 'dg2', name: 'Amoxicillin 500mg', quantity: 18, reorder_level: 20, price: 80, expiry: fmt(new Date(today.getTime()+20*864e5)) }
                ],
                admissions: [
                    { id: 'ad1', patient_id: 'pt2', ward: 'Male Ward', bed: 'B3', reason: 'Observation', status: 'admitted', created_at: today.toISOString() }
                ],
                roster: [
                    { id: 'ro1', staff: 'Nurse Mary Bello', shift_date: fmt(today), shift: 'Night', department: 'Nursing', created_at: today.toISOString() }
                ],
                referrals: [
                    { id: 're1', patient: 'Ada Nwosu', refer_to: 'General Hospital — Radiology', reason: 'CT scan', status: 'sent', created_at: today.toISOString() }
                ],

                orders: [
                    { id: 'o1', customer: 'Walk-in', items: 'Carton of Juice x2', total: 9000, channel: 'pos', status: 'completed', created_at: today.toISOString() },
                    { id: 'o2', customer: 'Ada N.', phone: '08031110000', items: 'Printer Paper x3', total: 10500, channel: 'web', status: 'new', created_at: today.toISOString() }
                ],
                quotes: [
                    { id: 'q1', number: 'QUO-2001', customer: 'Zenith Corp', amount: 750000, items: 'Brand refresh package', status: 'sent', created_at: today.toISOString() }
                ],
                purchase_orders: [
                    { id: 'po1', number: 'PO-3001', supplier: 'MegaSupplies Ltd', items: 'Juice cartons x100', amount: 380000, status: 'ordered', created_at: today.toISOString() }
                ],
                vendors: [
                    { id: 'v1', name: 'MegaSupplies Ltd', contact: 'Mr. Bala', phone: '08039990000', email: 'sales@mega.com', category: 'Goods', created_at: today.toISOString() }
                ],
                assets: [
                    { id: 'as1', name: 'Delivery Van', tag: 'AST-001', category: 'Vehicle', location: 'Head Office', holder: 'Logistics', value: 8500000, status: 'in-use', created_at: today.toISOString() }
                ],
                expenses: [
                    { id: 'ex1', staff_id: 'demo-2', description: 'Client lunch', category: 'Entertainment', amount: 25000, status: 'pending', created_at: today.toISOString() }
                ],
                payroll: [
                    { id: 'py1', staff_id: 'demo-2', period: 'May 2026', gross: 250000, deductions: 35000, net: 215000, created_at: today.toISOString() }
                ],
                timesheets: [
                    { id: 'ts1', staff_id: 'demo-1', work_date: fmt(today), project: 'Zenith Website', hours: 6, notes: 'Homepage build', created_at: today.toISOString() }
                ],
                goals: [
                    { id: 'go1', objective: 'Reach ₦5M monthly sales', owner: 'Sales', target: 5000000, progress: 3200000, due_date: fmt(new Date(today.getTime()+30*864e5)), created_at: today.toISOString() }
                ],
                applicants: [
                    { id: 'rc1', name: 'Joy Eze', position: 'Sales Executive', email: 'joy@mail.com', phone: '08032220000', stage: 'interview', created_at: today.toISOString() }
                ],
                contracts: [
                    { id: 'ct1', title: 'Office lease', party: 'PrimeProperties', value: 2400000, start_date: fmt(today), end_date: fmt(new Date(today.getTime()+20*864e5)), status: 'active', created_at: today.toISOString() }
                ],
                knowledge: [
                    { id: 'kb1', title: 'How to process a refund', category: 'Operations', body: '1. Verify the order.\\n2. Confirm with a manager.\\n3. Record in Finance as an expense.', created_at: today.toISOString() }
                ],
                compliance: [
                    { id: 'cp1', policy: 'Data Protection Policy', owner: 'IT / Tech', review_date: fmt(new Date(today.getTime()+60*864e5)), status: 'compliant', created_at: today.toISOString() }
                ],
                messages: [
                    { id: 'm1', from_id: 'demo-1', to_id: null, subject: 'Welcome to the portal', body: 'Please complete your profile this week.', created_at: today.toISOString() }
                ],
                audit_log: [
                    { id: 'al1', action: 'Approved a staff account', actor: 'Grace Adeyemi', created_at: today.toISOString() }
                ]
            }
        };
    },

    /** A mock Supabase client (chainable) backed by the demo tables. */
    mockClientSource() {
        return `
        function makeMock(DATA, ME){
          function q(table){
            let rows=(DATA[table]||[]).slice();
            const api={
              select(){return api;},
              order(){return api;},
              limit(n){rows=rows.slice(0,n);return api;},
              eq(col,val){rows=rows.filter(r=>String(r[col])===String(val));return api;},
              maybeSingle(){return Promise.resolve({data:rows[0]||null,error:null});},
              single(){return Promise.resolve({data:rows[0]||null,error:null});},
              insert(){return Promise.resolve({data:null,error:null});},
              update(){return {eq:()=>Promise.resolve({data:null,error:null})};},
              upsert(){return Promise.resolve({data:null,error:null});},
              delete(){return {eq:()=>Promise.resolve({data:null,error:null})};},
              then(res){return Promise.resolve({data:rows,error:null}).then(res);}
            };
            return api;
          }
          return {
            from:q,
            auth:{ getUser(){return Promise.resolve({data:{user:ME}});}, signOut(){return Promise.resolve({});},
                   signInWithPassword(){return Promise.resolve({data:{},error:null});}, signUp(){return Promise.resolve({data:{},error:null});} },
            storage:{ from(){return { upload(){return Promise.resolve({error:null});}, getPublicUrl(){return {data:{publicUrl:'#'}};} };} }
          };
        }`;
    },

    /** Build the complete preview HTML document. */
    html(c, fullCfg) {
        const TPLc = fullCfg; // cfg with _featureDefs
        const demo = this.demo(c);
        const feats = TPLc._featureDefs;
        const firstId = 'dashboard';
        const fontLink = c.font.google ? `<link href="https://fonts.googleapis.com/css2?family=${c.font.google}&display=swap" rel="stylesheet">` : '';
        const logo = c.logoDataUrl || '';

        // We reuse the generated css/app/modules verbatim, but neutralise the
        // hard redirects in Auth (guard/idx) for the sandboxed preview.
        const appJs = TPL.app(TPLc)
            .replace("location.href=this.idx();", "/*preview*/;")
            .replace("if(!u){location.href=this.idx();return null;}", "if(!u){return ME_PREVIEW;}")
            .replace("await sb.auth.signOut();location.href=this.idx();", "/*preview*/;");
        const modulesJs = TPL.modules(TPLc);
        const cfgJs = TPL.config(Object.assign({}, c, { supabaseUrl: 'preview', supabaseKey: 'preview' }))
            .replace(/\(function\(\)\{[\s\S]*?\}\)\(\);/, ''); // drop real supabase init

        const navLinks = feats.map(f => `<a class="pv-link" data-id="${f.id}"><i class="fas ${f.icon} fa-fw"></i> ${esc(f.name)}</a>`).join('');

        return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">${fontLink}
<style>${TPL.css(TPLc)}
.pv-shell{display:flex;min-height:100vh}
.pv-side{width:220px;background:#0f172a;color:#fff;padding:14px;flex-shrink:0}
.pv-brand{display:flex;gap:9px;align-items:center;font-weight:800;padding:6px 6px 14px;border-bottom:1px solid #1e293b;margin-bottom:10px}
.pv-link{display:flex;gap:9px;align-items:center;color:#94a3b8;padding:9px 11px;border-radius:9px;font-size:13px;margin-bottom:3px;cursor:pointer}
.pv-link:hover{background:#1e293b;color:#fff}.pv-link.on{background:var(--brand);color:#fff}
.pv-main{flex:1;padding:22px;overflow-y:auto;height:100vh}
${c.layout === 'topnav' ? '.pv-side{display:none}.pv-top{display:flex!important}' : ''}
${c.layout === 'cards' ? '.pv-side{display:none}' : ''}
.pv-top{display:none;background:var(--brand);color:#fff;padding:10px 16px;gap:12px;align-items:center;flex-wrap:wrap;position:sticky;top:0;z-index:5}
.pv-top .pv-link{color:rgba(255,255,255,.85)}.pv-top .pv-link.on{background:rgba(255,255,255,.2)}
.pv-hub{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.pv-hubc{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:center;cursor:pointer}
.pv-hubc i{font-size:26px;color:var(--brand)}
@media(max-width:760px){.pv-side{display:none}.pv-hub{grid-template-columns:1fr 1fr}}
</style></head>
<body>
<div class="pv-shell">
  <div class="pv-side">
    <div class="pv-brand">${logo ? `<img src="${logo}" style="height:32px;width:32px;border-radius:7px;object-fit:cover">` : `<div style="height:32px;width:32px;border-radius:7px;background:#fff;color:var(--brand);display:flex;align-items:center;justify-content:center;font-weight:900">${esc((c.shortName || 'C')[0])}</div>`} <span>${esc(c.shortName || 'Business')}</span></div>
    <div id="pv-nav">${navLinks}</div>
    <div style="margin-top:14px;border-top:1px solid #1e293b;padding-top:10px;font-size:10px;color:#64748b;text-align:center">Powered by HMG Concepts</div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column">
    <div class="pv-top"><b style="margin-right:6px">${esc(c.shortName || 'Business')}</b><div style="display:flex;gap:6px;flex-wrap:wrap">${navLinks}</div></div>
    <div class="pv-main">
      ${c.layout === 'cards' ? `<div class="pv-hub" id="pv-hub">${feats.map(f => `<div class="pv-hubc" data-id="${f.id}"><i class="fas ${f.icon}"></i><p style="font-weight:700;margin:8px 0 0">${esc(f.name)}</p></div>`).join('')}</div>` : ''}
      <div id="hdr"></div><div id="body" class="fade"></div>
    </div>
  </div>
</div>
<div style="position:fixed;bottom:0;left:0;right:0;background:#fef3c7;color:#92400e;text-align:center;font-size:11px;padding:5px;border-top:1px solid #fde68a">👁️ PREVIEW with sample data — the real platform connects to the clinic's own Supabase. Powered by HMG Concepts.</div>

<script>
const ME_PREVIEW=${JSON.stringify(demo.me)};
const DEMO_DATA=${JSON.stringify(demo.tables)};
${this.mockClientSource()}
var sb=makeMock(DEMO_DATA,ME_PREVIEW);window.sb=sb;
</script>
<script>${cfgJs}
window.CONFIG=CONFIG;window.sb=sb;</script>
<script>${appJs}</script>
<script>${modulesJs}</script>
<script>
// Override Layout.sidebar/header (preview provides its own chrome) and wire nav.
Layout.sidebar=function(){};
async function pvGo(id){
  document.querySelectorAll('.pv-link').forEach(a=>a.classList.toggle('on',a.dataset.id===id));
  const feat=${JSON.stringify(feats)}.find(f=>f.id===id)||{name:id};
  document.getElementById('hdr').innerHTML=Layout.header(feat.name,CONFIG.BUSINESS_NAME);
  document.getElementById('body').innerHTML='<div class="muted">Loading…</div>';
  try{ await Modules.render(id, ME_PREVIEW, document.getElementById('body')); }
  catch(e){ document.getElementById('body').innerHTML='<div class="card">'+id+' preview</div>'; }
}
document.querySelectorAll('.pv-link,[data-id]').forEach(a=>a.addEventListener('click',()=>pvGo(a.dataset.id)));
pvGo('${firstId}');
</script>
</body></html>`;
    }
};

function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
window.Preview = Preview;
