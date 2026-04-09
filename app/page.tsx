import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome to Buddha</h1>
      Update this link to point to your jj tool path
      <Link
        href="/bookmark"
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
      >
        Open Jujutsu Playground
      </Link>
      <Link href="/foreshotering" className="underline text-gray-400">
        Go to Foreshotering
      </Link>
    </div>
  );
}
