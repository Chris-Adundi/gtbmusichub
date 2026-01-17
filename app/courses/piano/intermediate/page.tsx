export default function PianoIntermediatePage() {
  const sessions = [
    "Intermediate Scales & Key Signatures",
    "Arpeggios & Chord Inversions",
    "Sight Reading Intermediate Pieces",
    "Playing with Dynamics and Expression",
    "Finger Independence Exercises",
    "Intermediate Rhythm & Syncopation",
    "Hanon Exercises for Strength & Agility",
    "Improvisation in Simple Styles (Jazz/Blues)",
    "Transposition & Modulation",
    "Accompaniment Patterns for Both Hands",
    "Intermediate Chord Progressions",
    "Playing Classical & Contemporary Pieces",
    "Introduction to Pedaling Techniques",
    "Intermediate Ear Training & Recognition",
    "Performance Techniques & Phrasing",
    "Practicing Efficiently for Mastery",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Piano / Keyboard — Intermediate Level
      </h1>

      <p className="text-gray-600 mb-8">
        This level builds upon foundational skills, introducing more advanced techniques, expression, sight reading, improvisation, and coordination for confident piano performance.
      </p>

      <ul className="space-y-3">
        {sessions.map((session, index) => (
          <li key={index} className="border rounded px-4 py-3 hover:bg-gray-50">
            <strong>Session {index + 1}:</strong> {session}
          </li>
        ))}
      </ul>
    </main>
  );
}
