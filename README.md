<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="CookieScope is a local-first cybersecurity cookie scanner." />
  <meta property="og:title" content="CookieScope — Cookie Security Scanner" />
  <meta property="og:description" content="Local-first cookie security scanner for authorized audits and privacy reviews." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="thumbnail-website.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="CookieScope — Cookie Security Scanner" />
  <meta name="twitter:description" content="Local-first cookie security scanner for authorized audits and privacy reviews." />
  <meta name="twitter:image" content="thumbnail-website.svg" />
  <title>CookieScope — Cookie Security Scanner</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="topbar"><a class="brand" href="."><span class="brand-mark">◈</span> CookieScope</a><span class="badge"><span class="pulse"></span> LOCAL-FIRST SECURITY</span></header>
  <main class="shell">
    <nav class="tabs" aria-label="Sections"><button class="tab active" data-tab="scanner">Scanner</button><button class="tab" data-tab="guide">How it works</button><button class="tab" data-tab="safety">Safety</button></nav>
    <section class="tab-panel active" data-panel="scanner">
      <section class="hero"><p class="eyebrow">COOKIE INTELLIGENCE / 01</p><h1>Know what your<br /><em>cookies</em> know.</h1><p class="lede">Preview an authorized cookie snapshot and review its sensitivity before sharing or analyzing it.</p></section>
      <section class="scanner-grid" aria-label="Cookie scanner">
        <div class="panel input-panel"><div class="panel-heading"><span>01</span><h2>Authorized snapshot</h2></div>
          <label for="site-url">Website URL</label><input id="site-url" type="url" placeholder="https://example.com" autocomplete="url" />
          <label for="snapshot-label">Snapshot context</label><select id="snapshot-label"><option>General audit</option><option>Before sign-in</option><option>After sign-in</option><option>After sign-out</option></select>
          <label for="cookie-input">Cookie header / document.cookie</label><textarea id="cookie-input" rows="7" spellcheck="false" placeholder="session_id=abc123; theme=dark; _ga=GA1.2.123456789.1; cart_id=42; consent=analytics"></textarea>
          <div class="actions"><button id="scan-btn" class="primary">Preview scan <span>→</span></button><button id="demo-btn" class="ghost">Load demo</button><button id="clear-btn" class="icon-button" aria-label="Clear form">✕</button></div>
          <p class="privacy-note">⌁ Local only. Never enter an email, password, or access token.</p><p class="scope-note">The URL is context only. A regular web page cannot read another site's cookies.</p>
        </div>
        <div class="panel result-panel" aria-live="polite"><div class="panel-heading"><span>02</span><h2>Preview report</h2><span id="status" class="status">READY</span></div>
          <div id="empty-state" class="empty-state"><div class="radar">◎</div><p>Your preview will appear here.</p><small>Paste an authorized cookie snapshot and start a local audit.</small></div>
          <div id="report" class="report hidden"><div class="score-row"><div><p class="metric-label">RISK SCORE</p><strong id="score">—</strong><span>/100</span></div><div id="risk-label" class="risk-label">LOW</div></div>
            <div class="preview-head"><h3>Cookie preview</h3><label class="toggle"><input id="reveal-toggle" type="checkbox" /> <span>Show values</span></label></div><p class="preview-warning">Values are masked by default to reduce accidental exposure.</p><ul id="cookie-list" class="cookie-list"></ul></div>
        </div>
      </section>
    </section>
    <section class="tab-panel" data-panel="guide"><div class="content-card"><p class="eyebrow">HOW IT WORKS / 02</p><h2>Preview, don’t probe.</h2><p>Paste a cookie snapshot collected during an authorized audit. CookieScope assesses the names, scope, and signal strength without sending data anywhere.</p><ol><li>Capture a local snapshot from a browser or proxy.</li><li>Paste only the cookie names and values you are authorized to review.</li><li>Inspect the risk summary and investigate suspicious tracking or session identifiers.</li></ol></div></section>
    <section class="tab-panel" data-panel="safety"><div class="content-card safety-card"><p class="eyebrow">SAFETY / 03</p><h2>Keep secrets out of the scanner.</h2><p>Do not enter passwords, email addresses, bearer tokens, or live credentials. CookieScope does not need them.</p><ul><li>Mask sensitive names and flag common tracking IDs.</li><li>Keep analysis local in the browser only.</li><li>Use with authorized internal or defensive security workflows.</li></ul></div></section>
  </main>
  <footer><span>CookieScope / defensive security utility</span><span>Built for authorized audits only</span></footer><script src="app.js"></script>
</body>
</html>
