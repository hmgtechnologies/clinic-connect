/**
 * Clinic Connect — wizard UI controller.
 */
const Wizard = {
    step: 0,
    steps: ['Business', 'Branding', 'Layout', 'Structure', 'Features', 'Generate'],

    init() {
        this.renderSteps();
        this.renderPresets();
        this.renderPalettes();
        this.renderFonts();
        this.renderLayouts();
        this.renderChips('departments', CATALOG.departments, 'departments');
        this.renderChips('ageGroups', CATALOG.ageGroups, 'ageGroups');
        this.renderChips('activities', CATALOG.activities, 'activities');
        this.renderFeatures();
        this.renderAddons();
        this.bindText();
        this.bindLogo();
        this.show();
        this.preview();
    },

    renderPresets() {
        const el = document.getElementById('presets');
        if (!el) return;
        el.innerHTML = CATALOG.presets.map(p =>
            `<div class="choice" style="text-align:left" onclick="Wizard.usePreset('${p.id}')">
                <i class="fas ${p.icon} brand-text" style="font-size:18px"></i>
                <div style="margin-top:6px">${p.name}</div>
                <div class="muted small" style="font-weight:400;margin-top:3px">${p.desc}</div>
            </div>`).join('');
    },
    usePreset(id) {
        if (Gen.applyPreset(id)) { this.refreshAll(); UI && false; alert('✅ Preset applied. Now add the business details and tweak anything you like.'); }
    },

    selectedAddons() {
        return [...document.querySelectorAll('#addons input:checked')].map(c => c.value);
    },
    renderAddons() {
        const el = document.getElementById('addons');
        if (!el) return;
        el.innerHTML = CATALOG.pricing.addons.map(a =>
            `<label class="chk"><input type="checkbox" value="${a.id}" onchange="Wizard.recalcQuote()"> ${a.name} <span class="muted" style="margin-left:auto">${CATALOG.pricing.currency}${a.price.toLocaleString()}</span></label>`).join('');
        this.recalcQuote();
    },
    recalcQuote() {
        const q = Gen.quote(this.selectedAddons());
        const el = document.getElementById('quoteTotal');
        if (el) el.textContent = q.currency + q.total.toLocaleString();
    },

    lead(channel) {
        const name = (document.getElementById('leadName') || {}).value || '';
        const contact = (document.getElementById('leadContact') || {}).value || '';
        const q = Gen.quote(this.selectedAddons());
        const feats = Gen.featureDefs().map(f => f.name).join(', ');
        const addons = this.selectedAddons().map(id => (CATALOG.pricing.addons.find(a => a.id === id) || {}).name).filter(Boolean).join(', ') || 'none';
        const msg =
`Clinic Connect request%0A----------------------%0A` +
`Church: ${encodeURIComponent(Gen.state.businessName || '(unnamed)')}%0A` +
`From: ${encodeURIComponent(name)} (${encodeURIComponent(contact)})%0A` +
`Preset/Layout: ${encodeURIComponent(Gen.state.layout)}%0A` +
`Features: ${encodeURIComponent(feats)}%0A` +
`Add-ons: ${encodeURIComponent(addons)}%0A` +
`Estimated total: ${q.currency}${q.total.toLocaleString()}`;
        if (channel === 'whatsapp') {
            window.open('https://wa.me/2348100866322?text=' + msg, '_blank');
        } else {
            window.location.href = 'mailto:?subject=' + encodeURIComponent('Clinic Connect request — ' + (Gen.state.businessName || '')) + '&body=' + msg;
        }
    },

    proposal() {
        if (!Gen.state.businessName.trim()) { alert('Enter the business name first.'); return; }
        const w = window.open('', '_blank');
        if (!w) { alert('Please allow pop-ups to view the proposal.'); return; }
        w.document.write(Gen.proposalHtml(this.selectedAddons())); w.document.close();
    },

    share() {
        if (!Gen.state.businessName.trim()) { alert('Enter the business name first, then Share.'); return; }
        const link = Gen.shareLink();
        const ov = document.createElement('div');
        ov.style.cssText = 'position:fixed;inset:0;z-index:300;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:20px';
        ov.innerHTML = `<div class="card" style="max-width:520px;width:100%">
            <h3 style="margin:0 0 6px"><i class="fas fa-share-nodes brand-text"></i> Client Intake Link</h3>
            <p class="muted small" style="margin:0 0 12px">Send this link to the business. When they open it, the builder is pre‑filled with these settings — they can complete the rest themselves.</p>
            <textarea class="input" rows="3" readonly onclick="this.select()">${link}</textarea>
            <div class="pill-row" style="margin-top:12px;justify-content:flex-end">
                <button class="btn btn-ghost" onclick="navigator.clipboard.writeText(${JSON.stringify(link)}).then(()=>{this.textContent='Copied!'})">Copy Link</button>
                <a class="btn btn-ghost" target="_blank" href="https://wa.me/?text=${encodeURIComponent('Build your business platform here: ' + link)}"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                <button class="btn btn-primary" onclick="this.closest('div[style]').parentNode.remove()">Done</button>
            </div>
        </div>`;
        document.body.appendChild(ov);
    },

    renderSteps() {
        document.getElementById('steps').innerHTML = this.steps.map((s, i) =>
            `<div class="step ${i === this.step ? 'active' : (i < this.step ? 'done' : '')}" id="st${i}">${i < this.step ? '<i class="fas fa-check"></i>' : (i + 1)} ${s}</div>`).join('');
    },

    renderPalettes() {
        document.getElementById('palettes').innerHTML = CATALOG.palettes.map(p =>
            `<div onclick="Wizard.pickPalette('${p.id}')" id="pal_${p.id}" class="choice ${Gen.state.palette.id === p.id ? 'sel' : ''}">
                <div class="swatch" style="background:linear-gradient(135deg,${p.primary},${p.dark})"></div>
                <div class="small" style="margin-top:6px">${p.name}</div>
            </div>`).join('');
    },
    pickPalette(id) { Gen.state.palette = CATALOG.palettes.find(p => p.id === id); this.renderPalettes(); this.preview(); },

    renderFonts() {
        document.getElementById('fonts').innerHTML = CATALOG.fonts.map(f =>
            `<div onclick="Wizard.pickFont('${f.id}')" class="choice ${Gen.state.font.id === f.id ? 'sel' : ''}" style="font-family:${f.stack}">${f.name}</div>`).join('');
    },
    pickFont(id) { Gen.state.font = CATALOG.fonts.find(f => f.id === id); this.renderFonts(); this.preview(); },

    renderLayouts() {
        document.getElementById('layouts').innerHTML = CATALOG.layouts.map(l =>
            `<div onclick="Wizard.pickLayout('${l.id}')" class="choice ${Gen.state.layout === l.id ? 'sel' : ''}" style="text-align:left">
                <i class="fas fa-${l.id === 'sidebar' ? 'table-columns' : l.id === 'topnav' ? 'bars' : 'grip'}" style="font-size:20px"></i>
                <div style="margin-top:8px">${l.name}</div>
                <div class="muted small" style="font-weight:400;margin-top:4px">${l.desc}</div>
            </div>`).join('');
    },
    pickLayout(id) { Gen.state.layout = id; this.renderLayouts(); this.preview(); },

    renderChips(elId, list, key) {
        document.getElementById(elId).innerHTML = list.map(x =>
            `<label class="chk"><input type="checkbox" value="${x.id}" data-key="${key}" data-name="${x.name}" onchange="Wizard.toggleChip(this)"> ${x.name}</label>`).join('');
    },
    toggleChip(cb) {
        const key = cb.dataset.key, val = cb.dataset.name;
        const arr = Gen.state[key];
        if (cb.checked) { if (!arr.includes(val)) arr.push(val); }
        else { const i = arr.indexOf(val); if (i > -1) arr.splice(i, 1); }
    },

    renderFeatures() {
        const always = ['members', 'dashboard'];
        document.getElementById('features').innerHTML = CATALOG.features.map(f => {
            const on = Gen.state.features.includes(f.id) || always.includes(f.id);
            return `<label class="feature ${on ? 'on' : ''}" id="feat_${f.id}">
                <input type="checkbox" value="${f.id}" ${on ? 'checked' : ''} ${always.includes(f.id) ? 'disabled' : ''} onchange="Wizard.toggleFeature(this)">
                <span class="ic"><i class="fas ${f.icon} brand-text"></i></span>
                <span><b>${f.name}</b>${f.core ? ' <span class="badge">core</span>' : ''}${f.enterprise ? ' <span class="badge" style="background:#fef3c7;color:#92400e">enterprise</span>' : ''}<br><span class="muted small">${f.desc}</span></span>
            </label>`;
        }).join('');
    },
    toggleFeature(cb) {
        const id = cb.value;
        if (cb.checked) { if (!Gen.state.features.includes(id)) Gen.state.features.push(id); }
        else { Gen.state.features = Gen.state.features.filter(f => f !== id); }
        document.getElementById('feat_' + id).classList.toggle('on', cb.checked);
        this.preview();
    },

    bindText() {
        ['businessName', 'shortName', 'motto', 'currency', 'phone', 'email', 'address', 'campuses', 'giving', 'supabaseUrl', 'supabaseKey'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.value = Gen.state[id] || '';
            el.addEventListener('input', () => { Gen.state[id] = el.value; if (['businessName', 'shortName', 'motto', 'currency'].includes(id)) this.preview(); });
        });
    },

    bindLogo() {
        document.getElementById('logo').addEventListener('change', e => {
            const file = e.target.files[0];
            if (!file) return;
            const r = new FileReader();
            r.onload = () => {
                Gen.state.logoDataUrl = r.result;
                document.getElementById('logoPrev').innerHTML = `<img src="${r.result}" style="height:64px;border-radius:10px;margin-top:6px">`;
                this.preview();
            };
            r.readAsDataURL(file);
        });
    },

    show() {
        document.querySelectorAll('.step-panel').forEach(p => p.classList.toggle('hide', +p.dataset.step !== this.step));
        document.getElementById('prevBtn').style.visibility = this.step === 0 ? 'hidden' : 'visible';
        document.getElementById('nextBtn').classList.toggle('hide', this.step === this.steps.length - 1);
        this.renderSteps();
    },
    next() {
        if (this.step === 0 && !Gen.state.businessName.trim()) { alert('Please enter the business name.'); return; }
        if (this.step < this.steps.length - 1) { this.step++; this.show(); window.scrollTo({ top: document.getElementById('wizard').offsetTop - 10, behavior: 'smooth' }); }
    },
    prev() { if (this.step > 0) { this.step--; this.show(); } },

    preview() {
        const iframe = document.getElementById('preview');
        iframe.srcdoc = Gen.previewHtml();
        Gen.autosave();
    },

    /** Open the full interactive multi-page preview in the modal. */
    fullPreview() {
        if (!Gen.state.businessName.trim()) { alert('Enter the business name first (Step 1).'); return; }
        document.getElementById('fpFrame').srcdoc = Gen.fullPreviewHtml();
        document.getElementById('fpModal').classList.remove('hide');
    },

    save() {
        if (!Gen.state.businessName.trim()) { alert('Enter the business name first.'); return; }
        Gen.saveProject();
    },
    load(ev) {
        const file = ev.target.files[0];
        if (!file) return;
        const r = new FileReader();
        r.onload = () => {
            if (Gen.loadProject(r.result)) {
                // Re-sync all UI from loaded state
                this.refreshAll();
                alert('✅ Project loaded.');
            } else alert('Could not read that project file.');
        };
        r.readAsText(file);
        ev.target.value = '';
    },

    /** Re-render every control from Gen.state (used after Load/restore). */
    refreshAll() {
        this.renderPalettes(); this.renderFonts(); this.renderLayouts(); this.renderFeatures();
        ['businessName', 'shortName', 'motto', 'currency', 'phone', 'email', 'address', 'campuses', 'giving', 'supabaseUrl', 'supabaseKey'].forEach(id => {
            const el = document.getElementById(id); if (el) el.value = Gen.state[id] || '';
        });
        // restore chip checkboxes
        document.querySelectorAll('#departments input,#ageGroups input,#activities input').forEach(cb => {
            cb.checked = (Gen.state[cb.dataset.key] || []).includes(cb.dataset.name);
        });
        if (Gen.state.logoDataUrl) document.getElementById('logoPrev').innerHTML = `<img src="${Gen.state.logoDataUrl}" style="height:64px;border-radius:10px;margin-top:6px">`;
        this.preview();
    },

    async generate() {
        try {
            const ok = await Gen.build();
            if (ok) alert('✅ Your platform ZIP has been downloaded!\n\nNext: open the README inside it for 4 simple deployment steps (also see guide.html).');
        } catch (e) { alert('Generation error: ' + e.message); }
    }
};
document.addEventListener('DOMContentLoaded', () => {
    // Priority: shared intake link (#cfg=) > ?preset= > local draft > fresh.
    const fromHash = Gen.loadFromHash && Gen.loadFromHash();
    const presetParam = new URLSearchParams(location.search).get('preset');
    if (fromHash) { Wizard.init(); Wizard.refreshAll(); }
    else if (presetParam && Gen.applyPreset(presetParam)) { Wizard.init(); Wizard.refreshAll(); }
    else if (Gen.restore && Gen.restore()) { Wizard.init(); Wizard.refreshAll(); }
    else { Wizard.init(); }
});
window.Wizard = Wizard;
