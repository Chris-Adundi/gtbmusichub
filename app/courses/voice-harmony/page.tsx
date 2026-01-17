export default function VoiceHarmonyCoursePage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Voice & Harmony</h1>

      <p className="text-gray-600 mb-8">
        Develop your voice from beginner to advanced level, covering vocal
        technique, harmony singing, lead and backing vocals.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="/courses/voice-harmony/beginner"
          className="border rounded p-4 hover:bg-gray-50"
        >
          Beginner (12 Sessions)
        </a>

        <a
          href="/courses/voice-harmony/intermediate"
          className="border rounded p-4 hover:bg-gray-50"
        >
          Intermediate (16 Sessions)
        </a>

        <a
          href="/courses/voice-harmony/advanced"
          className="border rounded p-4 hover:bg-gray-50"
        >
          Advanced (20 Sessions)
        </a>
      </div>
    </main>
  );
}
