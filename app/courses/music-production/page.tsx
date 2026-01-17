export default function MusicProductionCoursePage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Music Production & Arrangement</h1>

      <p className="text-gray-600 mb-8">
        Learn how to produce, arrange, and mix your own music tracks. From creating beats to mastering full songs, this course takes you from beginner to advanced levels.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <a href="/courses/music-production/beginner" className="border rounded p-4 hover:bg-gray-50">
          Beginner (12 Sessions)
        </a>

        <a href="/courses/music-production/intermediate" className="border rounded p-4 hover:bg-gray-50">
          Intermediate (16 Sessions)
        </a>

        <a href="/courses/music-production/advanced" className="border rounded p-4 hover:bg-gray-50">
          Advanced (20 Sessions)
        </a>
      </div>
    </main>
  );
}
