export default function DrumsCoursePage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Drums & Percussion</h1>

      <p className="text-gray-600 mb-8">
        Master drums and percussion from beginner to advanced level, focusing on
        timing, coordination, groove, technique, and performance.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="/courses/drums/beginner"
          className="border rounded p-4 hover:bg-gray-50"
        >
          Beginner (12 Sessions)
        </a>

        <a
          href="/courses/drums/intermediate"
          className="border rounded p-4 hover:bg-gray-50"
        >
          Intermediate (16 Sessions)
        </a>

        <a
          href="/courses/drums/advanced"
          className="border rounded p-4 hover:bg-gray-50"
        >
          Advanced (20 Sessions)
        </a>
      </div>
    </main>
  );
}
