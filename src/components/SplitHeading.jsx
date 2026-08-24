import { Fragment, useEffect, useRef, useState } from 'react';

// Items 03 + 13: the h1 and the 6.8rem section headings were the largest, most
// expensive elements on the page and every one of them was completely static.
// This splits a heading into words and staggers them in — on load for the hero,
// on entry for everything below it.
//
// The markup keeps real text: each word is a span, the sentence stays selectable and
// readable to a screen reader in one pass, and nothing is injected character by
// character (which is what breaks copy-paste and pronunciation on other sites).
//
// Item 14: with reduced motion the words render with no transform and no delay.
export default function SplitHeading({
  as: Tag = 'h2',
  text,
  emphasis,
  className = '',
  immediate = false,
  reducedMotion = false,
  step = 55,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(immediate || reducedMotion);

  useEffect(() => {
    if (shown) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  // `emphasis` is the tail of the line that gets the serif italic treatment, kept as
  // a separate string so the data stays plain text rather than embedded markup.
  const lead = text.split(' ').filter(Boolean);
  const tail = emphasis ? emphasis.split(' ').filter(Boolean) : [];

  // The space between words is a real text node between the spans, not generated
  // content. CSS ::after would render visually but is invisible to innerText, so the
  // heading would copy and be announced as "Iturnoperationalfriction".
  const render = (words, offset, em) =>
    words.map((word, index) => (
      <Fragment key={`${em ? 'em' : 'w'}-${index}-${word}`}>
        <span className="sh-word">
          <span
            className="sh-inner"
            style={reducedMotion ? undefined : { transitionDelay: `${(offset + index) * step}ms` }}
          >
            {em ? <em>{word}</em> : word}
          </span>
        </span>{' '}
      </Fragment>
    ));

  return (
    <Tag
      ref={ref}
      className={`split-heading ${shown ? 'is-shown' : ''} ${reducedMotion ? 'no-motion' : ''} ${className}`.trim()}
    >
      {render(lead, 0, false)}
      {tail.length > 0 && render(tail, lead.length, true)}
    </Tag>
  );
}
