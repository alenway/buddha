import Link from "next/link";

const thisIsUnusedAndWillBreakLint = "test";
export default function Home() {
  return (
    <div>
      <Link href="/foreshotering">go to</Link>
    </div>
  );
}
