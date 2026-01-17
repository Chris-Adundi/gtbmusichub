export default function PianoBeginnerPage() {
  const sessions = [
    "Introduction to the Keyboard",
    "Posture & Finger Numbers",
    "Note Names & Octaves",
    "Basic Rhythm & Counting",
    "Right Hand Melodies",
    "Left Hand Basics",
    "Reading Treble Clef",
    "Reading Bass Clef",
    "C Major Scale",
    "Basic Chords",
    "Hands Together",
    "Beginner Performance Skills",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Piano — Beginner Level
      </h1>

      <ul className="space-y-3">
        {sessions.map((session, index) => (
          <li key={index} className="border rounded px-4 py-3">
            <strong>Session {index + 1}:</strong> {session}
          </li>
        ))}
      </ul>
    </main>
  );
}
