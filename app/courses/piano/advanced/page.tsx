export default function PianoAdvancedPage() {
  const sessions = [
    "Advanced scales & modes",
    "Complex chord voicings",
    "Polyrhythms",
    "Advanced pedaling",
    "Jazz harmony",
    "Classical interpretation",
    "Advanced improvisation",
    "Sight reading at speed",
    "Repertoire mastery",
    "Technical endurance",
    "Tone control",
    "Expressive phrasing",
    "Performance psychology",
    "Accompaniment mastery",
    "Solo performance",
    "Studio piano techniques",
    "Collaborative playing",
    "Transposition",
    "Advanced practice systems",
    "Professional performance prep",
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Piano — Advanced</h1>
      <ul className="space-y-3">
        {sessions.map((s, i) => (
          <li key={i} className="border rounded p-3">
            <strong>Session {i + 1}:</strong> {s}
          </li>
        ))}
      </ul>
    </main>
  );
}
