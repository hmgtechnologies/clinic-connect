/**
 * Clinic Connect — scripted onboarding assistant (NO AI API).
 * A friendly, rules-based helper bubble that guides users through the builder.
 * 100% free, fully offline.
 */
const Bot = {
    steps: [
        { q: "👋 Welcome to Clinic Connect! I'll help you build an enterprise business platform — free. Ready?", a: ['Yes, let\'s go', 'What is this?'] },
        { q: "Great! First, who is this for?", a: ['A whole business', 'A department', 'A single branch'] },
        { q: "Tip: pick a <b>preset</b> in Step 1 to auto-fill everything, then edit. Want me to point out key steps?", a: ['Yes please', 'I\'ll explore'] },
        { q: "Here's the flow: <b>1)</b> Business details + preset → <b>2)</b> Branding (logo/colours/font) → <b>3)</b> Layout → <b>4)</b> Departments & groups → <b>5)</b> Features → <b>6)</b> Preview, quote & download.", a: ['Got it 👍'] },
        { q: "When ready, click <b>Preview Platform</b> to click through it with sample data, then <b>Generate & Download</b>. Deployment is free (guide included). Need a human?", a: ['Chat on WhatsApp', 'No, thanks'] }
    ],
    i: 0,
    open() {
        let box = document.getElementById('cc-bot');
        if (box) { box.style.display = 'flex'; return; }
        box = document.createElement('div');
        box.id = 'cc-bot';
        box.style.cssText = 'position:fixed;bottom:84px;right:20px;width:320px;max-width:92vw;background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.18);z-index:9998;display:flex;flex-direction:column;overflow:hidden;font-family:Inter,sans-serif';
        box.innerHTML = `<div style="background:var(--brand,#4f46e5);color:#fff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center">
            <b><i class="fas fa-robot"></i> Setup Assistant</b>
            <span style="cursor:pointer" onclick="Bot.close()">&times;</span></div>
            <div id="cc-bot-body" style="padding:14px;max-height:340px;overflow-y:auto;font-size:14px"></div>
            <div id="cc-bot-actions" style="padding:10px 14px;border-top:1px solid #f1f5f9;display:flex;flex-wrap:wrap;gap:6px"></div>`;
        document.body.appendChild(box);
        this.i = 0; this.say(0);
    },
    close() { const b = document.getElementById('cc-bot'); if (b) b.style.display = 'none'; },
    say(i) {
        const s = this.steps[i]; if (!s) return;
        const body = document.getElementById('cc-bot-body');
        body.innerHTML += `<div style="background:#f1f5f9;border-radius:12px;padding:10px;margin-bottom:8px">${s.q}</div>`;
        body.scrollTop = body.scrollHeight;
        const act = document.getElementById('cc-bot-actions');
        act.innerHTML = s.a.map(a => `<button onclick="Bot.pick('${a.replace(/'/g, "\\'")}',${i})" style="background:#eef2ff;color:var(--brand,#4f46e5);border:none;border-radius:10px;padding:7px 12px;font-weight:700;font-size:12px;cursor:pointer">${a}</button>`).join('');
    },
    pick(answer, i) {
        const body = document.getElementById('cc-bot-body');
        body.innerHTML += `<div style="background:var(--brand,#4f46e5);color:#fff;border-radius:12px;padding:8px 10px;margin:0 0 8px auto;width:fit-content;max-width:80%">${answer}</div>`;
        if (/whatsapp/i.test(answer)) { window.open('https://wa.me/2348100866322', '_blank'); }
        if (/what is this/i.test(answer)) { body.innerHTML += `<div style="background:#f1f5f9;border-radius:12px;padding:10px;margin-bottom:8px">Clinic Connect builds a complete, free ERP-style business system — staff, CRM, sales, POS, online storefront, invoices, payroll, HR, inventory, analytics, audit log & more. You download it and host it free. No AI APIs. 🙌</div>`; this.say(1); return; }
        const next = i + 1;
        if (this.steps[next]) this.say(next);
        else { document.getElementById('cc-bot-actions').innerHTML = `<button onclick="Bot.close()" style="background:#eef2ff;color:var(--brand,#4f46e5);border:none;border-radius:10px;padding:7px 12px;font-weight:700;font-size:12px;cursor:pointer">Close</button>`; }
    },
    mount() {
        if (document.getElementById('cc-bot-fab')) return;
        const fab = document.createElement('button');
        fab.id = 'cc-bot-fab';
        fab.title = 'Setup Assistant';
        fab.onclick = () => Bot.open();
        fab.style.cssText = 'position:fixed;bottom:20px;right:20px;width:54px;height:54px;border-radius:50%;background:var(--brand,#4f46e5);color:#fff;border:none;font-size:22px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25);z-index:9997';
        fab.innerHTML = '<i class="fas fa-robot"></i>';
        document.body.appendChild(fab);
    }
};
document.addEventListener('DOMContentLoaded', () => Bot.mount());
window.Bot = Bot;
