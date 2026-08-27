import Icon from './Icon';
import SectionLabel from './SectionLabel';

/**
 * The in-app empty board.
 *
 * `public/404.html` handles a real server 404 — a path the deploy has never heard of.
 * It cannot handle this one: `#/case/does-not-exist` is a request the server answers
 * with the index, perfectly correctly, because everything after the `#` never reaches
 * it. So a mistyped slug used to render the homepage under a URL that said otherwise,
 * with the homepage's title and OG card attached to it.
 *
 * Same idea as the static page, deliberately not the same file: one is a static
 * document with its own copy of eleven tokens, the other is a route inside the app.
 */
export default function NotFound({ kind, slug }) {
  return (
    <article className="not-found">
      <SectionLabel code="404">Nothing at this address</SectionLabel>

      <h1>
        No {kind === 'note' ? 'note' : 'case'} is <em>rostered</em> under that name.
      </h1>

      <p>
        The board has no unit called <code className="numeric">{slug}</code>. That is a different problem from
        something being broken — the address simply does not map to anything here.
      </p>

      <ul className="not-found-board">
        <li>
          <span className="numeric">—</span> <span>unassigned</span>
        </li>
        <li>
          <span className="numeric">—</span> <span>unassigned</span>
        </li>
        <li>
          <span className="numeric">—</span> <span>unassigned</span>
        </li>
      </ul>

      <a className="button button-primary" href="#work">
        Back to a board with work on it <Icon name="arrow" />
      </a>
    </article>
  );
}
