import { faqs } from '../data/faqs';
import SectionLabel from './SectionLabel';

export default function FAQ() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <SectionLabel code="FAQ">Before we talk</SectionLabel>
      <h2 id="faq-title">A few useful answers.</h2>
      <div className="faq-list">
        {faqs.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
