import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/foreshotering" className="underline">
        go to
      </Link>
    </div>
  );
}
