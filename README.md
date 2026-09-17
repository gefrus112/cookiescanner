# CookieScope

A local-first cybersecurity cookie scanner for defensive, authorized audits. Paste a `Cookie` header or `document.cookie` value and get a quick risk report in your browser.

![CookieScope scanner thumbnail](thumbnail.svg)

## Features

- Parses cookie names and values locally — cookie data is never sent to a server.
- Flags names that may represent sessions, authentication tokens, CSRF tokens, or personal data.
- Shows a risk score, findings, cookie count, and a target URL context.
- Responsive dark UI with a demo mode for trying the scanner safely.

## Run it

Open `index.html` directly, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Security scope

This tool is intentionally non-invasive. A website URL is used only as context in the report; the app does not crawl websites, probe endpoints, bypass access controls, or transmit cookie values. Only scan cookies that you own or have explicit permission to audit. For production work, validate cookie attributes from server responses with an authorized browser or proxy-based assessment.
