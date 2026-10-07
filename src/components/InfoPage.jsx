import { site } from '../data/site';
import Breadcrumbs from './Breadcrumbs';

export default function InfoPage({ kind }) {
  const title = kind === 'privacy' ? 'Privacy' : kind === 'terms' ? 'Terms of use' : 'Thank you';
  return (
    <article className="info-page">
      <Breadcrumbs title={title} />
      <h1>{title}</h1>
      {kind !== 'thank-you' && <p className="utility-muted">Updated {site.lastUpdated}</p>}
      {kind === 'privacy' ? (
        <>
          <h2>Who runs this site</h2>
          <p>
            This is Hadi Qusyairi’s personal portfolio. For privacy questions, email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Your preferences</h2>
          <p>
            Your browser can remember your theme and analytics choice in local storage. These preferences are
            used to operate the site. Search queries stay in your browser. Contact form submissions are sent
            to my inbox so I can respond.
          </p>
          <h2>Optional analytics</h2>
          <p>
            Google Analytics is only loaded when it is configured and you choose “Allow analytics”. Without
            that choice, no Google Analytics script or analytics cookies are loaded. When enabled, analytics
            measures page visits and campaign labels from UTM links. Advertising signals are disabled. Form
            contents and search queries are not sent to analytics.
          </p>
          <p>
            You can change your choice using “Privacy choices” in the footer. Rejecting analytics stops
            collection and removes accessible analytics cookies on this site. Your browser’s privacy controls
            can also clear site data. Google’s processing is described in its{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              privacy policy
            </a>
            .
          </p>
          <h2>Contact and hosting</h2>
          <p>
            Contact form submissions are sent through Formspree, a form-delivery provider, to my inbox. The
            form is not for sensitive information; please leave out details that are unnecessary for your
            enquiry.
          </p>
          <p>
            Vercel hosts this site and may process request information such as IP addresses and browser
            details to deliver and secure it. External links open sites with their own privacy practices. This
            portfolio has no accounts or file uploads.
          </p>
        </>
      ) : kind === 'terms' ? (
        <>
          <h2>About the material</h2>
          <p>
            This portfolio describes projects and learning experiences. Examples may use demo data or
            projections, as labelled. They are not a promise of future results or a production service.
          </p>
          <h2>Code, images, and third-party work</h2>
          <p>
            Code shared in linked repositories is governed by the licence in each repository. Project
            screenshots, personal photographs, team contributions, and third-party names may carry separate
            rights. Contact me before reusing material if the permission is unclear.
          </p>
          <h2>Using the site</h2>
          <p>
            You are welcome to read, share links, and try the browser demos. Please do not use contact details
            for spam or attempt to disrupt the site. External websites and downloads are provided for context;
            their availability and terms may differ.
          </p>
          <h2>Questions or corrections</h2>
          <p>
            If something is inaccurate or inaccessible, contact{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </>
      ) : (
        <>
          <p>
            Your inquiry has been sent to my inbox. I’ll reply to the email address you provided when I can.
          </p>
          <p>
            If you need to add anything, send another inquiry or email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> directly.
          </p>
          <a className="button button-primary" href="/#contact">
            Back to contact
          </a>
        </>
      )}
    </article>
  );
}
