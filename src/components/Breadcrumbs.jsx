export default function Breadcrumbs({ title, section }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        {section && (
          <li>
            <a href={`/#${section === 'Work' ? 'work' : 'notes'}`}>{section}</a>
          </li>
        )}
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}
