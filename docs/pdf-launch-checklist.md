# PDF launch checklist — implementation record

Source: 118133.pdf, four screenshot pages, 80 entries including duplicates.

Status reflects this portfolio repository, not the apps described by its case studies. No analytics ID, form endpoint, public visiting address, named testimonial, or response-time commitment was supplied. No production deployment is claimed.

## Page 1 — Content and discoverability

| #   | PDF entry                | Status                          | Implementation / reason                                                                                         |
| --- | ------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 1   | Custom 404 page          | Existing + fixed                | Standalone HTTP 404 retained; unknown hash routes now render NotFound.                                          |
| 2   | CTA above the fold       | Existing                        | Hero action plus a persistent mobile contact action.                                                            |
| 3   | Internal links           | Improved                        | Real page URLs and root-section links work from nested pages.                                                   |
| 4   | Thank-you page           | Adapted                         | /thank-you explains completing the email draft; never claims server delivery.                                   |
| 5   | Breadcrumbs              | Added                           | Case studies, notes, colophon, privacy and terms; generated breadcrumb schema.                                  |
| 6   | Case studies             | Existing + fixed                | Two existing case studies retained; corrected project email subjects and PulseOps-only demo.                    |
| 7   | Five FAQs                | Added                           | Five answers based on existing portfolio content.                                                               |
| 8   | Response-time promise    | Needs owner information         | No reliable response time was supplied. Copy says “I’ll reply when I can”.                                      |
| 9   | Sticky mobile CTA        | Added                           | Persistent “Let’s talk” link to contact.                                                                        |
| 10  | robots.txt               | Existing                        | Allows crawling and points to the sitemap.                                                                      |
| 11  | Unique page titles       | Improved                        | Ten generated HTML documents have unique titles before JavaScript runs.                                         |
| 12  | Meta descriptions        | Improved                        | Generated per-page descriptions and live legacy-route updates.                                                  |
| 13  | Social sharing image     | Existing + improved             | Existing 1200×630 image retained; page titles, descriptions and canonical URLs generated into HTML.             |
| 14  | Maps and directions      | Not applicable / needs location | Singapore is stated, but no public visiting address was provided. No home address or invented office published. |
| 15  | Real reviews             | Needs owner information         | Existing clearly labelled paraphrased feedback retained. A named, approved quote is still needed.               |
| 16  | Image alt text           | Existing                        | Picture component and content provide alt text; decorative alternate portrait has empty alt.                    |
| 17  | Local schema             | Adapted                         | Existing Person schema describes Singapore; a personal portfolio is not mislabelled as a LocalBusiness.         |
| 18  | PP page (privacy policy) | Added                           | /privacy describes actual browser preferences, hosting, email, and optional analytics.                          |
| 19  | Google Analytics         | Ready, disabled                 | VITE_GA_ID is empty because the owner has no measurement ID. No analytics requests by default.                  |
| 20  | Team photo               | Adapted                         | Existing real portrait retained for this personal portfolio. No invented team photo.                            |

## Page 2 — Security

| #   | PDF entry                 | Status                                   | Implementation / reason                                                                                                                |
| --- | ------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hide API keys             | Checked                                  | No private keys found in checked sources; optional GA ID is intentionally public. .env files stay ignored.                             |
| 2   | Purge Git secrets         | Checked; no purge needed                 | Known-pattern scan of 693 historical blobs found no matches. This is a heuristic, not a guarantee; history was not rewritten.          |
| 3   | Use public database key   | Not applicable                           | Portfolio has no database client. Technologies described in case studies are separate projects.                                        |
| 4   | Enable row-level security | Not applicable                           | No database in this portfolio.                                                                                                         |
| 5   | Encrypt sensitive data    | Adapted                                  | No server-side form storage. Email is handed to the visitor’s mail app; HTTPS/HSTS protects hosted site transport.                     |
| 6   | Enforce server-side auth  | Not applicable                           | No accounts, protected pages, or server actions.                                                                                       |
| 7   | Lock record access        | Not applicable                           | No private records or CRUD API.                                                                                                        |
| 8   | Block field tampering     | Adapted                                  | Composer accepts only name, email and message; it has no privileged state or server writes.                                            |
| 9   | Secure session cookies    | Not applicable                           | No authentication sessions. Optional analytics is explicitly gated.                                                                    |
| 10  | Hash passwords            | Not applicable                           | No passwords are collected or stored.                                                                                                  |
| 11  | Rate-limit login          | Not applicable                           | No login endpoint.                                                                                                                     |
| 12  | Add bot protection        | Not applicable to current architecture   | No public message-submission endpoint. Mailbox spam filtering is handled by the email provider.                                        |
| 13  | Parameterize queries      | Not applicable                           | No SQL queries.                                                                                                                        |
| 14  | Validate all input        | Added                                    | Composer checks required fields, email syntax and length; search is bounded.                                                           |
| 15  | Escape user content       | Checked + added                          | React renders input as text; mailto fields are URI-encoded; generated metadata is HTML-escaped.                                        |
| 16  | Restrict file uploads     | Not applicable                           | No file upload control or endpoint.                                                                                                    |
| 17  | Trim API responses        | Not applicable                           | No application API; search uses public portfolio content locally.                                                                      |
| 18  | Security headers          | Improved                                 | CSP, HSTS and DENY framing added to existing nosniff, referrer and permissions policies; tested locally with headers.                  |
| 19  | Force HTTPS               | Configured / hosting check on deployment | Vercel handles HTTP-to-HTTPS redirects; HSTS added. Local HTTP preview is only for development.                                        |
| 20  | Scan dependencies         | Fixed + ongoing                          | Sharp updated to 0.35.4; js-yaml lockfile fixed; npm audit reports zero vulnerabilities. Audit in CI and weekly Dependabot configured. |

## Page 3 — Launch essentials

| #   | PDF entry                    | Status                      | Implementation / reason                                                                                                                   |
| --- | ---------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Privacy policy               | Added                       | See page 1 item 18.                                                                                                                       |
| 2   | Terms and conditions         | Added                       | /terms covers portfolio examples, reuse and external links.                                                                               |
| 3   | Secrets off frontend         | Checked                     | See page 2 item 1.                                                                                                                        |
| 4   | Force HTTPS                  | Configured                  | See page 2 item 19.                                                                                                                       |
| 5   | Cookie consent banner        | Added, conditional          | Appears only when GA is configured and no choice is saved. Reject and allow have equal controls; settings remain accessible.              |
| 6   | Meta titles and descriptions | Improved                    | See page 1 items 11–12.                                                                                                                   |
| 7   | Social preview image         | Existing + improved         | See page 1 item 13.                                                                                                                       |
| 8   | Favicon                      | Existing                    | SVG, ICO and Apple touch icon retained.                                                                                                   |
| 9   | Sitemap and robots.txt       | Improved                    | Build generates a sitemap containing nine real page URLs; the draft-help page is noindex and excluded.                                    |
| 10  | Alt text on images           | Existing                    | See page 1 item 16.                                                                                                                       |
| 11  | Compress images              | Existing + dependency fixed | Responsive AVIF/WebP/JPEG pipeline retained; Sharp patched.                                                                               |
| 12  | Check page load speed        | Checked locally             | Production build measured; initial JS is about 90 kB gzip and CSS about 11 kB. Local timing is not a production/mobile-network benchmark. |
| 13  | Fix colour contrast          | Preserved + checked         | New controls reuse the existing high-contrast theme tokens; both themes inspected in-browser.                                             |
| 14  | Mobile friendly              | Improved + checked          | 390px layout checked; menu now traps focus with a native dialog and closes on Escape or desktop resize.                                   |
| 15  | Custom 404                   | Existing + fixed            | See page 1 item 1.                                                                                                                        |
| 16  | Fix broken links             | Improved + checked          | Internal page URLs, legacy routes and local assets checked. External profile destinations are owner-provided and outside this change.     |
| 17  | Form validation              | Added                       | Required fields, length bounds and inline errors; unit and browser checks.                                                                |
| 18  | Spam protection              | Architecture-dependent      | No server-side contact submission to spam. A future delivery endpoint requires server validation, throttling and bot verification.        |
| 19  | Set up analytics             | Ready, disabled             | See page 1 item 19.                                                                                                                       |
| 20  | One clear CTA                | Existing + added            | “Start a conversation” stays primary; persistent contact access reinforces it.                                                            |

## Page 4 — Interface and usability

| #   | PDF entry                  | Status              | Implementation / reason                                                                                                              |
| --- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Dark mode toggle           | Existing + hardened | Preferences now tolerate blocked local storage; explicit theme choices override later OS changes.                                    |
| 2   | Simple cookie banner       | Added, conditional  | See page 3 item 5.                                                                                                                   |
| 3   | Site search                | Added               | Accessible modal searches project, note and FAQ text locally, with result counts and no-result state.                                |
| 4   | Back-to-top button         | Existing            | Respects reduced motion.                                                                                                             |
| 5   | Mobile menus               | Improved            | See page 3 item 14.                                                                                                                  |
| 6   | Loading animations         | Existing            | Existing hero/reveal/loading behavior retained with reduced-motion support; no fake spinner for synchronous draft preparation.       |
| 7   | Hover states               | Existing + added    | New links, summaries and buttons have hover and keyboard-focus feedback.                                                             |
| 8   | Scroll progress bars       | Existing            | CSS timeline with requestAnimationFrame fallback retained.                                                                           |
| 9   | Copy button                | Existing + added    | Existing note copy links retained; contact email copy has a visible failure fallback.                                                |
| 10  | Print stylesheet           | Added               | Readable document colours; removes menus, floating controls and form UI; exposes link URLs.                                          |
| 11  | Sticky headers             | Existing            | Retained.                                                                                                                            |
| 12  | Skip to content            | Existing + fixed    | Focusable main landmark and legacy-route handling prevent skip links from losing the current page.                                   |
| 13  | Password visibility toggle | Not applicable      | No password input.                                                                                                                   |
| 14  | UTM tracking               | Ready, disabled     | Opt-in analytics accepts bounded campaign labels; arbitrary query strings, referrers, search and draft text are not explicitly sent. |
| 15  | Form success state         | Adapted             | Draft-ready state with an email-app link; not a delivery confirmation.                                                               |
| 16  | Form error state           | Added               | Field-level errors and first-invalid-field focus.                                                                                    |
| 17  | Confirmation modals        | Added               | Native dialog before discarding an unsent draft, with a keep-writing option.                                                         |
| 18  | Last-updated date          | Updated             | Shared date reflects this change; existing historical content dates remain factual.                                                  |
| 19  | Expandable FAQ             | Added               | Five native details/summary disclosures.                                                                                             |
| 20  | Floating contact           | Added               | Desktop/mobile contact shortcut.                                                                                                     |

## Validation and remaining setup

- Build, ESLint, Prettier and route/contact/metadata tests pass.
- Dependency audit: zero known vulnerabilities after fixes.
- Browser: desktop and 390px mobile, light/dark themes, search, draft errors/readiness, discard confirmation, FAQ, menu Escape, privacy settings, legacy routes, supporting pages, and 404 checked.
- Local preview also serves configured security headers; no browser console errors observed in checked flows.
- No real emails were sent. No analytics account was created or enabled. Configured Google Analytics delivery remains unverified until an owner-provided ID is available.
- For analytics: set VITE_GA_ID to the public G-… ID and rebuild. In the GA web-stream settings, disable enhanced measurement (especially form interactions and automatic page views) so only the explicitly coded, consent-gated page-view event is used. Do not put personal information in campaign labels. Verify accept, reject, revocation and network requests on a preview before production.
- If server-delivered contact is added later, it needs its own provider configuration, server-side validation, anti-abuse measures, delivery acknowledgement, retention settings, and updated privacy text. Current client validation is usability, not a server security boundary.
- Confirm production HTTPS redirects and actual deployed headers after merging/deploying. The repository continues to deploy as static files; there is no catch-all SPA rewrite masking missing paths with HTTP 200.
