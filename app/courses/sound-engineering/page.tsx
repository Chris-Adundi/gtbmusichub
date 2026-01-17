export default function SoundEngineeringCoursePage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Sound Engineering & Live Sound</h1>

      <p className="text-gray-600 mb-8">
        Learn the fundamentals and advanced techniques of sound engineering, live sound, and audio production. From recording to mixing and live setups, this course prepares you for real-world audio environments.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <a href="/courses/sound-engineering/beginner" className="border rounded p-4 hover:bg-gray-50">
          Beginner (12 Sessions)
        </a>

        <a href="/courses/sound-engineering/intermediate" className="border rounded p-4 hover:bg-gray-50">
          Intermediate (16 Sessions)
        </a>

        <a href="/courses/sound-engineering/advanced" className="border rounded p-4 hover:bg-gray-50">
          Advanced (20 Sessions)
        </a>
      </div>
    </main>
  );
}
