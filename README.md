# CookieScope

![CookieScope landing page](thumbnail-landing.svg)

A polished, local-first cookie security scanner for defensive and authorized audits.

## Screenshots

| Scanner | Risk report |
| --- | --- |
| ![CookieScope scanner](thumbnail-website.svg) | ![CookieScope risk report](thumbnail-dashboard.svg) |

| Security motion system | Privacy workflow |
| --- | --- |
| ![CookieScope animated security interface](thumbnail-security.svg) | ![CookieScope privacy workflow](thumbnail-privacy.svg) |

## Website

CookieScope is a static website and can be published with GitHub Pages:

1. Open **Settings → Pages** in the repository.
2. Choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder.
4. Save and open `https://gefrus112.github.io/cookiescanner/`.

No build step or server is required. To run locally:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Features

- Local-only cookie snapshot analysis with no backend or remote fetches.
- Masked values by default to reduce accidental disclosure.
- Risk signals for session, authentication, CSRF, JWT, tracking, consent, and unusually long values.
- Animated security dashboard with reduced-motion support.
- Features and security-notes tabs for audit workflow guidance.
- Responsive layout for desktop and mobile screens.

## Safety rules

CookieScope is a defensive review aid, not an exploitation or credential-recovery tool.

- Only inspect websites, systems, and cookie snapshots you own or are explicitly authorized to assess.
- Never paste passwords, API keys, bearer tokens, email addresses, payment data, or live production credentials.
- Treat cookie values as secrets. Keep the preview masked and use the reveal switch only when necessary.
- The website URL is context only. CookieScope does not log in, crawl, probe, bypass controls, or read another site's cookies.
- Verify cookie attributes such as `Secure`, `HttpOnly`, `SameSite`, `Domain`, expiry, and scope using an authorized browser or proxy workflow.
- Do not use findings to access an account, impersonate a user, or evade security controls.
- Delete exported snapshots after the approved review and follow your organization's retention policy.

## Privacy model

The scanner processes pasted text in the browser memory. It has no application server and does not intentionally upload scan data. Refreshing or closing the page clears the working state. Network requests may still be made by the optional Google Fonts stylesheet; remove that stylesheet for a fully offline deployment.

## License

Use this project responsibly and only within the permissions of the system owner.
