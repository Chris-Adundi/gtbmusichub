export default function VoiceHarmonyCoursePage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Voice & Harmony</h1>
      <p className="text-gray-600 mb-8">
        Train your voice, identify keys, build harmonies, and perform as lead or backup vocalist.
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        <Level title="Beginner" sessions={12} />
        <Level title="Intermediate" sessions={16} />
        <Level title="Advanced" sessions={20} />
      </div>
    </main>
  );
}

function Level({ title, sessions }: { title: string; sessions: number }) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <p className="font-medium">{sessions} Sessions</p>
    </div>
  );
}
