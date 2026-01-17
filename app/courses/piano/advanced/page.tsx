export default function PianoAdvancedPage() {
  const sessions = [
    "Advanced Finger Independence & Velocity Control",
    "Mastering All Major & Minor Scales (4 Octaves)",
    "Advanced Arpeggios & Broken Chord Patterns",
    "Extended Chords (9ths, 11ths, 13ths)",
    "Advanced Chord Voicings & Reharmonization",
    "Complex Rhythm & Polyrhythms",
    "Modal Harmony & Advanced Jazz Concepts",
    "Advanced Gospel & Contemporary Piano Styles",
    "Classical Performance Techniques & Interpretation",
    "Advanced Left-Hand Independence",
    "Improvisation Across All Keys & Styles",
    "Playing Fluently in All 12 Keys",
    "Advanced Dynamics, Touch & Tone Control",
    "Sight-Reading at Performance Level",
    "Advanced Ear Training & Instant Chord Recognition",
    "Transposing Instantly in Real Time",
    "Solo Piano Arranging Techniques",
    "Ensemble Playing & Musical Direction",
    "Stage Performance, Expression & Confidence",
    "Professional Practice, Recording & Career Skills"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Piano / Keyboard — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        This advanced level prepares pianists for professional performance,
        advanced musicianship, and real-world musical applications.
      </p>

      <ul className="space-y-3">
        {sessions.map((session, index) => (
          <li
            key={index}
            className="border rounded px-4 py-3 hover:bg-gray-50"
          >
            <strong>Session {index + 1}:</strong> {session}
          </li>
        ))}
      </ul>
    </main>
  );
}
