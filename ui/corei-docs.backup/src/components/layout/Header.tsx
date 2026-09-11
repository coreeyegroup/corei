import SearchBox from '../search/SearchBox';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border-color px-6 py-3 flex items-center justify-between">
      <div className="text-sm text-text-muted">COREI Documentation Portal</div>
      <SearchBox />
    </header>
  );
}
