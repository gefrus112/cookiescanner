# CookieScope

![CookieScope website preview](thumbnail-website.svg)

A polished, orange-and-white, local-first cybersecurity cookie scanner for defensive and authorized audits.

![CookieScope dashboard preview](thumbnail-dashboard.svg)

## Open the website

This repository is a static website. Open [`index.html`](index.html) directly, or run it locally:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

To publish it as a public website, enable **GitHub Pages** for the `main` branch and the repository root. The site entry point is `index.html`.

## What it does

- Uses orange-and-white tabs for Scanner, How it works, and Safety.
- Accepts an authorized website URL as context and a cookie snapshot for local analysis.
- Supports General audit, Before sign-in, After sign-in, and After sign-out labels.
- Shows a masked cookie preview by default with an optional local **Show values** toggle.
- Highlights potentially sensitive cookie names and displays a risk score.
- Includes two visual thumbnails for the repository README and website preview.

## Safety and privacy

Do **not** enter an email address, password, access token, bearer token, or live credential. CookieScope does not need them. Cookie values are processed in the browser and are not sent to a server.

The URL is context only. A normal webpage cannot read another website's cookies, so this app does not automatically log in, log out, crawl, probe, or scan remote sites. Use only snapshots from systems you own or are explicitly authorized to assess.

For complete cookie-attribute review, inspect authorized browser or proxy data for `Secure`, `HttpOnly`, `SameSite`, `Domain`, and expiration settings. A plain `document.cookie` string does not contain all of those attributes.
