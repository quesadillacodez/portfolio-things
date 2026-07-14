import Icon from './Icon';

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Back to top">HQ<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#process">Process</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        <Icon name={theme === 'light' ? 'moon' : 'sun'} />
      </button>
    </header>
  );
}
