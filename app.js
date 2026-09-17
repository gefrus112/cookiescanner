const $ = (id) => document.getElementById(id);
const demo = 'session_id=abc123; theme=dark; _ga=GA1.2.123456789.1234567890; csrf_token=xyz789';

function parseCookies(raw) {
  return raw.split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
    const separator = part.indexOf('=');
    return { name: (separator < 0 ? part : part.slice(0, separator)).trim(), value: separator < 0 ? '' : part.slice(separator + 1).trim() };
  }).filter((cookie) => cookie.name);
}

function scan() {
  const raw = $('cookie-input').value.trim();
  if (!raw) { $('cookie-input').focus(); return; }
  const cookies = parseCookies(raw);
  const findings = [];
  const secureHints = [];
  cookies.forEach(({ name }) => {
    const lower = name.toLowerCase();
    const sensitive = /(session|auth|token|jwt|csrf|login|user|pass|sid)/.test(lower);
    if (sensitive) findings.push({ bad: true, title: `${name} may contain sensitive data`, text: 'Confirm this cookie is necessary, short-lived, and never stores a password or personal data.' });
    else secureHints.push({ bad: false, title: `${name} identified`, text: 'Review its purpose, retention period, and whether it is needed.' });
  });
  const score = Math.min(98, Math.max(8, findings.length * 22 + (cookies.length > 10 ? 12 : 0)));
  const secure = cookies.filter(({ name }) => /(secure|session|csrf|auth)/i.test(name)).length;
  $('empty-state').classList.add('hidden'); $('report').classList.remove('hidden'); $('status').textContent = 'COMPLETE';
  $('score').textContent = score; $('meter-fill').style.width = `${score}%`; $('meter-fill').style.background = score > 60 ? 'var(--red)' : score > 30 ? 'var(--orange)' : 'var(--mint)';
  $('risk-label').textContent = score > 60 ? 'HIGH RISK' : score > 30 ? 'REVIEW NEEDED' : 'LOW RISK'; $('risk-label').style.color = score > 60 ? 'var(--red)' : score > 30 ? 'var(--orange)' : 'var(--mint)';
  $('cookie-count').textContent = cookies.length; $('issue-count').textContent = findings.length; $('secure-count').textContent = secure;
  const all = [...findings, ...secureHints.slice(0, Math.max(1, 4 - findings.length))];
  $('findings').innerHTML = all.map((item) => `<div class="finding ${item.bad ? '' : 'good'}"><span class="finding-icon">${item.bad ? '!' : '✓'}</span><div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p></div></div>`).join('');
  const url = $('site-url').value.trim(); const site = $('site-result');
  if (url) { try { const parsed = new URL(url); site.textContent = `TARGET · ${parsed.origin}  /  This local audit only analyzes the cookie text you supplied. It does not crawl, probe, or transmit credentials.`; site.classList.remove('hidden'); } catch { site.textContent = 'TARGET · The website URL is not valid. Cookie analysis was still completed locally.'; site.classList.remove('hidden'); } } else site.classList.add('hidden');
}
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char])); }
$('scan-btn').addEventListener('click', scan); $('demo-btn').addEventListener('click', () => { $('cookie-input').value = demo; $('site-url').value = 'https://demo.example.com'; scan(); }); $('clear-btn').addEventListener('click', () => { $('cookie-input').value = ''; $('site-url').value = ''; $('report').classList.add('hidden'); $('empty-state').classList.remove('hidden'); $('status').textContent = 'READY'; });
