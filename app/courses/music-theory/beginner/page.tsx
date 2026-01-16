export default function MusicTheoryBeginnerPage() {
  const sessions = [
    "Introduction to Music Theory",
    "Understanding Notes & Pitches",
    "Scales: Major & Minor",
    "Intervals and Their Sounds",
    "Chords: Major and Minor",
    "Basic Rhythm & Note Values",
    "Time Signatures & Meter",
    "Key Signatures Introduction",
    "Simple Melodies & Harmonies",
    "Reading Music Notation",
    "Ear Training Basics",
    "Putting Theory into Practice",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Music Theory — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Build a solid foundation in music theory: reading notes, understanding rhythm, and developing your ear for music.
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
