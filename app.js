const $ = (id) => document.getElementById(id);
const demo = 'session_id=abc123; theme=dark; _ga=GA1.2.123456789.1234567890; csrf_token=xyz789; consent=analytics';
let lastCookies = [];

const sensitive = /session|auth|token|csrf|jwt|sid|login|cart|user|otp|secret/i;
const tracker = /_ga|_gid|fbp|analytics|pixel|track|amplitude|mixpanel|consent/i;

function parseCookies(raw) {
  return raw.split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
    const i = part.indexOf('=');
    return {
      name: (i < 0 ? part : part.slice(0, i)).trim(),
      value: i < 0 ? '' : part.slice(i + 1).trim()
    };
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function mask(value) {
  return value ? '•'.repeat(Math.min(12, Math.max(6, value.length))) : '—';
}

function classifyCookie(name, value) {
  const entries = [];
  if (sensitive.test(name)) entries.push('session-like');
  if (tracker.test(name)) entries.push('tracking-like');
  if (/(token|jwt|csrf)/i.test(name)) entries.push('security-related');
  if (value.length > 80) entries.push('long-value');
  if (!entries.length) entries.push('general');
  return entries;
}

function scan() {
  const raw = $('cookie-input').value.trim();
  if (!raw) {
    $('cookie-input').focus();
    $('status').textContent = 'INPUT NEEDED';
    return;
  }

  lastCookies = parseCookies(raw);
  const findings = [];
  let score = 0;

  lastCookies.forEach(({ name, value }) => {
    const tags = classifyCookie(name, value);

    if (tags.includes('session-like')) {
      score += 18;
      findings.push({ level: 'HIGH', text: `${name} looks like a session or auth-related value.` });
    }

    if (tags.includes('tracking-like')) {
      score += 10;
      findings.push({ level: 'INFO', text: `${name} resembles a tracking or analytics identifier.` });
    }

    if (tags.includes('security-related')) {
      score += 12;
      findings.push({ level: 'HIGH', text: `${name} appears to be security-sensitive.` });
    }

    if (tags.includes('long-value')) {
      score += 4;
      findings.push({ level: 'INFO', text: `${name} has an unusually long value and may be worth inspecting.` });
    }
  });

  score = Math.min(100, Math.max(4, score));

  $('score').textContent = score;
  $('meter-fill').style.width = `${score}%`;

  const label = score >= 60 ? 'HIGH' : score >= 30 ? 'REVIEW' : 'LOW';
  $('risk-label').textContent = label;
  $('risk-label').className = `risk-label ${label.toLowerCase()}`;
  $('status').textContent = 'ANALYZED';

  $('empty-state').classList.add('hidden');
  $('report').classList.remove('hidden');
  renderPreview();

  $('finding-list').innerHTML = findings.length
    ? `<h3>Signals found <span>${findings.length}</span></h3>${findings.slice(0, 5).map((f) => `<p class="finding ${f.level.toLowerCase()}"><b>${f.level}</b>${escapeHtml(f.text)}</p>`).join('')}`
    : '<p class="finding good"><b>GOOD</b>No obvious sensitive naming signals found.</p>';
}

function renderPreview() {
  const reveal = $('reveal-toggle').checked;
  $('cookie-list').innerHTML = lastCookies.map(({ name, value }) => `
    <li>
      <span class="cookie-name">${escapeHtml(name)}</span>
      <span class="cookie-value">${reveal ? escapeHtml(value || '—') : mask(value)}</span>
    </li>
  `).join('');
}

function clearAll() {
  $('cookie-input').value = '';
  $('site-url').value = '';
  lastCookies = [];
  $('report').classList.add('hidden');
  $('empty-state').classList.remove('hidden');
  $('status').textContent = 'READY';
  $('score').textContent = '—';
  $('risk-label').textContent = 'LOW';
  $('risk-label').className = 'risk-label';
  $('meter-fill').style.width = '0%';
}

$('scan-btn').addEventListener('click', scan);
$('demo-btn').addEventListener('click', () => {
  $('site-url').value = 'https://example.com';
  $('cookie-input').value = demo;
  scan();
});
$('clear-btn').addEventListener('click', clearAll);
$('reveal-toggle').addEventListener('change', renderPreview);
$('cookie-input').addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') scan();
});

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab, .tab-panel').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const target = document.querySelector(`[data-panel="${tab.dataset.tab}"]`);
    if (target) target.classList.add('active');
  });
});
