/**
 * The board's section marker.
 *
 * Every section on this site is a unit on the board, and it is named the way the
 * roster demo names a station: a short code in a bordered mono chip, then what the
 * section is. That is the point of the codes — the demo further down the page uses
 * A04, A07, A09, and the site around it should already be speaking that language by
 * the time you reach it, rather than switching into it for one interactive block.
 *
 * Letters only, deliberately. Numbering them 01–07 would collide with the hero's
 * contents list, which numbers the four sections it links to 01–04; a reader hitting
 * "NTS-05" in the fourth slot of that list would reasonably think something was
 * broken. Two systems, two registers, no arithmetic to reconcile.
 */
export default function SectionLabel({ code, reveal = false, children }) {
  return (
    <p className="section-label" {...(reveal ? { 'data-reveal': '' } : {})}>
      <span className="section-code">{code}</span>
      <span>{children}</span>
    </p>
  );
}
