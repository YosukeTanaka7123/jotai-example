import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <a target="_blank" rel="noopener noreferrer" href="https://jotai.org/">
        <h1 className="text-4xl font-bold underline">Hello Jotai!</h1>
      </a>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">サンプルページ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/basic-example"
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-lg mb-2">Basic Example</h3>
            <p className="text-gray-600 text-sm">Jotaiの基本的な使い方</p>
          </Link>

          <Link
            to="/select-example"
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-lg mb-2">Select Example</h3>
            <p className="text-gray-600 text-sm">
              selectAtomとatomFamilyの使い方
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
