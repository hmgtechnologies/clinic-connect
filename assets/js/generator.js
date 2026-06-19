/**
 * Clinic Connect — generator engine.
 * Collects the wizard config, builds all output files via TPL, zips with JSZip,
 * and triggers a download. Also drives the live preview.
 */
const Gen = {
    state: {
        businessName: '', shortName: '', motto: '', address: '', phone: '', email: '',
        giving: '', currency: '₦', supabaseUrl: '', supabaseKey: '',
        palette: CATALOG.palettes[0], font: CATALOG.fonts[0], layout: 'sidebar',
        logoDataUrl: '', features: ['members', 'dashboard'], departments: [], ageGroups: [], activities: [],
        campuses: ''   // optional comma-separated list, e.g. "Main, Annex"
    },

    /** Resolve full feature defs (always includes dashboard + members first). */
    featureDefs() {
        const order = ['dashboard', 'members', ...this.state.features.filter(f => f !== 'dashboard' && f !== 'members')];
        const uniq = [...new Set(order)];
        const map = { dashboard: { id: 'dashboard', name: 'Dashboard', icon: 'fa-gauge-high' } };
        CATALOG.features.forEach(f => map[f.id] = f);
        return uniq.map(id => map[id]).filter(Boolean);
    },

    cfg() {
        return Object.assign({}, this.state, { _featureDefs: this.featureDefs() });
    },

    async build() {
        if (typeof JSZip === 'undefined') { alert('ZIP library not loaded. Check your connection.'); return; }
        const c = this.cfg();
        if (!c.businessName) { alert('Please enter the business name (Step 1).'); return; }
        const zip = new JSZip();
        const root = (c.shortName || c.businessName || 'business').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const f = zip.folder(root);

        // assets
        f.file('assets/css/style.css', TPL.css(c));
        f.file('assets/js/config.js', TPL.config(c));
        f.file('assets/js/app.js', TPL.app(c));
        f.file('assets/js/modules.js', TPL.modules(c));
        f.file('index.html', TPL.index(c));
        f.file('about.html', TPL.publicSite(c));
        if (c.features.includes('orders') && TPL.shop) f.file('shop.html', TPL.shop(c));
        f.file('manifest.json', TPL.manifest(c));
        f.file('sw.js', TPL.sw(c));
        f.file('.nojekyll', '');
        f.file('README.md', TPL.readme(c));
        f.file('database/schema.sql', TPL.sql(c));

        // Optional FREE automation pack (Supabase Edge Functions — no paid AI API)
        if (TPL.edgeFunctions) {
            const ef = TPL.edgeFunctions(c);
            Object.keys(ef).forEach(path => f.file(path, ef[path]));
        }

        // pages for each feature
        this.featureDefs().forEach(feat => {
            f.file('pages/' + feat.id + '.html', TPL.page(c, feat));
        });

        // logo
        if (c.logoDataUrl) {
            const base64 = c.logoDataUrl.split(',')[1];
            f.file('assets/img/logo.png', base64, { base64: true });
        } else {
            // tiny placeholder note
            f.file('assets/img/README.txt', 'Add your business logo here as logo.png (square, e.g. 512x512).');
        }

        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = root + '-platform.zip'; a.click();
        URL.revokeObjectURL(url);
        return true;
    },

    /** Build a standalone HTML string for the live preview iframe. */
    previewHtml() {
        const c = this.cfg();
        const feats = this.featureDefs().slice(0, 7);
        const nav = feats.map((x, i) => `<a class="lnk${i === 0 ? ' on' : ''}"><i class="fas ${x.icon}"></i> ${x.name}</a>`).join('');
        const logo = c.logoDataUrl ? `<img src="${c.logoDataUrl}" style="height:30px;width:30px;border-radius:7px;object-fit:cover">` : `<div style="height:30px;width:30px;border-radius:7px;background:#fff;color:${c.palette.primary};display:flex;align-items:center;justify-content:center;font-weight:900">${(c.shortName || 'C')[0]}</div>`;
        const kpis = ['Members', 'Events', 'Balance', 'Departments'].map(k => `<div class="cd"><div class="mut">${k}</div><div class="big">${k === 'Balance' ? (c.currency + '0') : '0'}</div></div>`).join('');
        const fontLink = c.font.google ? `<link href="https://fonts.googleapis.com/css2?family=${c.font.google}&display=swap" rel="stylesheet">` : '';
        const topnav = c.layout !== 'sidebar';
        return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">${fontLink}
<style>
*{box-sizing:border-box}body{margin:0;font-family:${c.font.stack};background:#f1f5f9;color:#1e293b}
.shell{display:flex;min-height:100vh}
.side{width:210px;background:#0f172a;color:#fff;padding:14px;${topnav ? 'display:none' : ''}}
.brand{display:flex;gap:9px;align-items:center;font-weight:800;padding:8px 6px 16px;border-bottom:1px solid #1e293b;margin-bottom:10px}
.lnk{display:flex;gap:9px;align-items:center;color:#94a3b8;padding:9px 11px;border-radius:9px;font-size:13px;margin-bottom:3px;text-decoration:none}
.lnk.on{background:${c.palette.primary};color:#fff}
.main{flex:1;padding:22px}
.top{${topnav ? '' : 'display:none;'}background:${c.palette.primary};color:#fff;padding:12px 18px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.top .lnk{color:rgba(255,255,255,.8)}.top .lnk.on{background:rgba(255,255,255,.2);color:#fff}
.hero{background:${c.palette.primary};color:#fff;border-radius:16px;padding:22px;margin-bottom:18px}
.row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
.cd{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px}
.mut{font-size:11px;color:#64748b;text-transform:uppercase;font-weight:700}.big{font-size:24px;font-weight:900}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px}
.cards-hub{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.hub{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px;text-align:center}
.hub i{font-size:26px;color:${c.palette.primary}}
.btn{background:${c.palette.primary};color:#fff;border:none;border-radius:9px;padding:9px 16px;font-weight:700}
@media(max-width:700px){.row,.cards-hub{grid-template-columns:1fr 1fr}.side{display:none}}
</style></head><body>
<div class="shell">
  <div class="side"><div class="brand">${logo} <span>${esc(c.shortName || 'Business')}</span></div>${nav}</div>
  <div style="flex:1">
    <div class="top">${logo}<b style="margin-right:8px">${esc(c.shortName || 'Business')}</b>${nav}</div>
    <div class="main">
      <div class="hero"><h2 style="margin:0">Welcome to ${esc(c.businessName || 'Our Business')}</h2><p style="margin:6px 0 0;opacity:.9">${esc(c.motto || 'Staff Portal')}</p></div>
      ${c.layout === 'cards'
                ? `<div class="cards-hub">${feats.map(x => `<div class="hub"><i class="fas ${x.icon}"></i><p style="font-weight:700;margin:8px 0 0">${x.name}</p></div>`).join('')}</div>`
                : `<div class="row">${kpis}</div><div class="card"><h3 style="margin:0 0 10px"><i class="fas fa-bullhorn" style="color:${c.palette.accent}"></i> Announcements</h3><p style="color:#64748b">Your company notices will appear here.</p></div>`}
      <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:20px">Powered by HMG Concepts — EdTech · DataTech · FaithTech</p>
    </div>
  </div>
</div></body></html>`;
    },

    /** Full interactive multi-page preview (uses Preview + mock data). */
    fullPreviewHtml() {
        return (window.Preview ? Preview.html(this.state, this.cfg()) : this.previewHtml());
    },

    /** Save the whole project (wizard answers) as a JSON file. */
    saveProject() {
        const data = JSON.stringify(this.state, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const name = (this.state.shortName || this.state.businessName || 'business').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        a.href = url; a.download = name + '-project.json'; a.click();
        URL.revokeObjectURL(url);
    },

    /** Load a saved project JSON back into state. Returns true on success. */
    loadProject(json) {
        try {
            const obj = typeof json === 'string' ? JSON.parse(json) : json;
            // Re-resolve palette/font objects from catalog by id (in case of drift)
            if (obj.palette && obj.palette.id) obj.palette = CATALOG.palettes.find(p => p.id === obj.palette.id) || obj.palette;
            if (obj.font && obj.font.id) obj.font = CATALOG.fonts.find(f => f.id === obj.font.id) || obj.font;
            Object.assign(this.state, obj);
            return true;
        } catch (e) { return false; }
    },

    /** Auto-save to localStorage so work isn't lost on refresh. */
    autosave() { try { localStorage.setItem('cc-draft', JSON.stringify(this.state)); } catch (e) {} },
    restore() { try { const d = localStorage.getItem('cc-draft'); if (d) return this.loadProject(d); } catch (e) {} return false; }
,

    /** Apply a named preset (from CATALOG.presets) onto the current state. */
    applyPreset(id) {
        const p = CATALOG.presets.find(x => x.id === id);
        if (!p) return false;
        this.state.palette = CATALOG.palettes.find(x => x.id === p.palette) || this.state.palette;
        this.state.font = CATALOG.fonts.find(x => x.id === p.font) || this.state.font;
        this.state.layout = p.layout || this.state.layout;
        this.state.features = [...new Set(['dashboard', 'members', ...(p.features || [])])];
        this.state.departments = (p.departments || []).slice();
        this.state.ageGroups = (p.ageGroups || []).slice();
        this.state.activities = (p.activities || []).slice();
        return true;
    },

    /**
     * Build a shareable intake link that pre-fills the builder.
     * Encodes a COMPACT config (no logo data) as base64 in the URL hash.
     */
    shareLink(baseUrl) {
        const compact = {
            businessName: this.state.businessName, shortName: this.state.shortName, motto: this.state.motto,
            address: this.state.address, phone: this.state.phone, email: this.state.email,
            giving: this.state.giving, currency: this.state.currency,
            paletteId: this.state.palette.id, fontId: this.state.font.id, layout: this.state.layout,
            features: this.state.features, departments: this.state.departments,
            ageGroups: this.state.ageGroups, activities: this.state.activities, campuses: this.state.campuses
        };
        const json = JSON.stringify(compact);
        const b64 = btoa(unescape(encodeURIComponent(json)));
        const base = baseUrl || (location.origin + location.pathname.replace(/[^/]*$/, 'builder.html'));
        return base + '#cfg=' + b64;
    },

    /** Read a shared config from the URL hash (#cfg=...) into state. */
    loadFromHash() {
        try {
            const m = (location.hash || '').match(/cfg=([^&]+)/);
            if (!m) return false;
            const json = decodeURIComponent(escape(atob(m[1])));
            const o = JSON.parse(json);
            if (o.paletteId) this.state.palette = CATALOG.palettes.find(p => p.id === o.paletteId) || this.state.palette;
            if (o.fontId) this.state.font = CATALOG.fonts.find(f => f.id === o.fontId) || this.state.font;
            ['businessName', 'shortName', 'motto', 'address', 'phone', 'email', 'giving', 'currency', 'layout', 'features', 'departments', 'ageGroups', 'activities', 'campuses'].forEach(k => {
                if (o[k] !== undefined) this.state[k] = o[k];
            });
            return true;
        } catch (e) { return false; }
    },

    /** Compute an indicative quote from selections + chosen add-ons. */
    quote(addonIds) {
        const P = CATALOG.pricing;
        const feats = this.featureDefs();
        const extraFeatures = Math.max(0, feats.length - 2); // dashboard+members are core
        const depts = (this.state.departments || []).length;
        const items = [
            { label: 'Base setup', amount: P.base },
            { label: extraFeatures + ' feature module(s)', amount: extraFeatures * P.perFeature },
            { label: depts + ' department(s)', amount: depts * P.perDepartment }
        ];
        (addonIds || []).forEach(id => {
            const a = P.addons.find(x => x.id === id);
            if (a) items.push({ label: a.name, amount: a.price });
        });
        const total = items.reduce((s, i) => s + i.amount, 0);
        return { currency: P.currency, items, total };
    },

    /** Open a printable proposal / spec sheet for the business (save as PDF). */
    proposalHtml(addonIds) {
        const c = this.cfg();
        const feats = c._featureDefs.map(f => `<li><b>${esc(f.name)}</b></li>`).join('');
        const list = (arr) => arr && arr.length ? arr.map(esc).join(', ') : '—';
        return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(c.businessName)} — Platform Proposal</title>
<style>body{font-family:Inter,Arial,sans-serif;max-width:780px;margin:0 auto;padding:36px;color:#1e293b}
h1{color:${c.palette.primary}} h2{border-bottom:2px solid ${c.palette.primary};padding-bottom:6px;margin-top:26px}
.head{display:flex;gap:16px;align-items:center;border-bottom:3px solid ${c.palette.primary};padding-bottom:16px}
.tag{display:inline-block;background:${c.palette.primary}1a;color:${c.palette.primary};padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;margin:2px}
ul{columns:2} .foot{margin-top:36px;border-top:1px solid #e2e8f0;padding-top:16px;color:#64748b;font-size:13px;text-align:center}
@media print{.noprint{display:none}}</style></head><body>
<div class="head">${c.logoDataUrl ? `<img src="${c.logoDataUrl}" style="height:64px;width:64px;border-radius:12px;object-fit:cover">` : ''}
<div><h1 style="margin:0">${esc(c.businessName)}</h1><p style="margin:4px 0 0;color:#64748b">${esc(c.motto || 'Business Management Platform')}</p></div></div>
<h2>Project Overview</h2>
<p>A complete, self‑hosted business management platform built on free, modern technology (Supabase + static web). Zero monthly software fees; the business fully owns its data.</p>
<p><b>Branding:</b> <span class="tag">Theme: ${esc(c.palette.name)}</span> <span class="tag">Font: ${esc(c.font.name)}</span> <span class="tag">Layout: ${esc(c.layout)}</span></p>
<h2>Included Modules (${c._featureDefs.length})</h2><ul>${feats}</ul>
<h2>Business Structure</h2>
<p><b>Departments:</b> ${list(c.departments)}</p>
<p><b>Staff Categories:</b> ${list(c.ageGroups)}</p>
<p><b>Activities:</b> ${list(c.activities)}</p>
<h2>Contact</h2>
<p>${esc(c.address || '')}<br>${esc(c.phone || '')} ${c.email ? '· ' + esc(c.email) : ''}</p>
<h2>What's Delivered</h2>
<ul style="columns:1">
<li>Complete website (all pages) + installable PWA</li>
<li>One‑click database setup script (Supabase)</li>
<li>Member sign‑up with admin approval & roles</li>
<li>Step‑by‑step deployment guide — go live free</li>
</ul>
${(() => { const q = this.quote(addonIds); return `<h2>Indicative Quote</h2>
<p class="muted" style="font-size:13px">The software runs free (Supabase + static hosting). The figures below cover optional setup/build service.</p>
<table style="width:100%;border-collapse:collapse">${q.items.map(i => `<tr><td style="padding:6px 0;border-bottom:1px solid #e2e8f0">${esc(i.label)}</td><td style="padding:6px 0;border-bottom:1px solid #e2e8f0;text-align:right">${q.currency}${i.amount.toLocaleString()}</td></tr>`).join('')}
<tr><td style="padding:10px 0;font-weight:800">Total (estimate)</td><td style="padding:10px 0;font-weight:800;text-align:right;color:${c.palette.primary}">${q.currency}${q.total.toLocaleString()}</td></tr></table>`; })()}
<div class="foot">Prepared with <b>Clinic Connect</b> by <b>HMG Concepts</b> — EdTech · DataTech · FaithTech<br>
${HMG.site} · ${HMG.whatsapp}</div>
<div class="noprint" style="text-align:center;margin-top:20px"><button onclick="window.print()" style="background:${c.palette.primary};color:#fff;border:none;padding:12px 24px;border-radius:10px;font-weight:700;cursor:pointer">Print / Save as PDF</button></div>
</body></html>`;
    }
};

function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
window.Gen = Gen;
