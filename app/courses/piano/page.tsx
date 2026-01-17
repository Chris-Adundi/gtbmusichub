export default function PianoCoursePage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Piano / Keyboard
      </h1>

      <p className="text-gray-600 mb-8">
        Learn piano from beginner to advanced level, covering technique,
        theory, performance, and musical expression.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <a href="/courses/piano/beginner" className="border rounded p-4 hover:bg-gray-50">
          Beginner (12 Sessions)
        </a>

        <a href="/courses/piano/intermediate" className="border rounded p-4 hover:bg-gray-50">
          Intermediate (16 Sessions)
        </a>

        <a href="/courses/piano/advanced" className="border rounded p-4 hover:bg-gray-50">
          Advanced (20 Sessions)
        </a>
      </div>
    </main>
  );
}
