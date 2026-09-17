const $ = (id) => document.getElementById(id);
const demo = 'session_id=abc123; theme=dark; _ga=GA1.2.123456789.1234567890; csrf_token=xyz789; consent=analytics';
let lastCookies = [];
const sensitive = /session|auth|token|csrf|jwt|sid|login|cart|user/i;
const tracker = /_ga|_gid|fbp|analytics|pixel|track|amplitude|mixpanel/i;
function parseCookies(raw) { return raw.split(';').map((part) => part.trim()).filter(Boolean).map((part) => { const i = part.indexOf('='); return { name: (i < 0 ? part : part.slice(0, i)).trim(), value: i < 0 ? '' : part.slice(i + 1).trim() }; }); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }
function mask(value) { return value ? '•'.repeat(Math.min(12, Math.max(6, value.length))) : '—'; }
function scan() {
  const raw = $('cookie-input').value.trim();
  if (!raw) { $('cookie-input').focus(); $('status').textContent = 'INPUT NEEDED'; return; }
  lastCookies = parseCookies(raw);
  const findings = [];
  let score = 0;
  lastCookies.forEach(({ name, value }) => {
    if (sensitive.test(name)) { score += 16; findings.push({ type: 'HIGH', text: `${name} may contain session or security material.` }); }
    else if (tracker.test(name)) { score += 7; findings.push({ type: 'INFO', text: `${name} looks like an analytics or tracking signal.` }); }
    if (value.length > 80) score += 3;
  });
  score = Math.min(100, Math.max(4, score));
  $('score').textContent = score;
  $('meter-fill').style.width = `${score}%`;
  const label = score >= 60 ? 'HIGH' : score >= 30 ? 'REVIEW' : 'LOW';
  $('risk-label').textContent = label;
  $('risk-label').className = `risk-label ${label.toLowerCase()}`;
  $('status').textContent = 'ANALYZED';
  $('empty-state').classList.add('hidden'); $('report').classList.remove('hidden');
  renderPreview();
  $('finding-list').innerHTML = findings.length ? `<h3>Signals found <span>${findings.length}</span></h3>${findings.slice(0, 5).map((f) => `<p class="finding ${f.type.toLowerCase()}"><b>${f.type}</b>${escapeHtml(f.text)}</p>`).join('')}` : '<p class="finding good"><b>GOOD</b>No obvious sensitive naming signals found.</p>';
}
function renderPreview() { const reveal = $('reveal-toggle').checked; $('cookie-list').innerHTML = lastCookies.map(({ name, value }) => `<li><span class="cookie-name">${escapeHtml(name)}</span><span class="cookie-value">${reveal ? escapeHtml(value || '—') : mask(value)}</span></li>`).join(''); }
function clearAll() { $('cookie-input').value = ''; $('site-url').value = ''; lastCookies = []; $('report').classList.add('hidden'); $('empty-state').classList.remove('hidden'); $('status').textContent = 'READY'; }
$('scan-btn').addEventListener('click', scan);
$('demo-btn').addEventListener('click', () => { $('site-url').value = 'https://example.com'; $('cookie-input').value = demo; scan(); });
$('clear-btn').addEventListener('click', clearAll);
$('reveal-toggle').addEventListener('change', renderPreview);
$('cookie-input').addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') scan(); });
document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => { document.querySelectorAll('.tab,.tab-panel').forEach((item) => item.classList.remove('active')); tab.classList.add('active'); document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add('active'); }));
