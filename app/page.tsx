import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">GTBMUSICHUB</h1>

      <p className="max-w-xl text-gray-600 mb-8">
        A universal music education platform for musicians, singers, bands,
        and sound engineers — from beginner to advanced.
      </p>

      <Link
        href="/courses"
        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
      >
        Explore Courses
      </Link>
    </main>
  );
}
