export default function ViolinCoursePage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Violin</h1>

      <p className="text-gray-600 mb-8">
        Learn violin from beginner to advanced levels, focusing on posture, bowing, fingering, scales, and performance.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <a href="/courses/violin/beginner" className="border rounded p-4 hover:bg-gray-50">
          Beginner (12 Sessions)
        </a>

        <a href="/courses/violin/intermediate" className="border rounded p-4 hover:bg-gray-50">
          Intermediate (16 Sessions)
        </a>

        <a href="/courses/violin/advanced" className="border rounded p-4 hover:bg-gray-50">
          Advanced (20 Sessions)
        </a>
      </div>
    </main>
  );
}
