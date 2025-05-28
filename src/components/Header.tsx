import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="p-4 shadow">
      <nav className="flex flex-row divide-x divide-gray-400 *:px-4 -mx-4">
        <div className="font-bold">
          <Link to="/">Home</Link>
        </div>
        <div className="font-bold">
          <Link to="/basic-example">Basic</Link>
        </div>
        <div className="font-bold">
          <Link to="/select-example">Selector</Link>
        </div>
      </nav>
    </header>
  );
}
