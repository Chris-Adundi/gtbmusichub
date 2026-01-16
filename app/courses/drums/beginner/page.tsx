export default function DrumsBeginnerPage() {
  const sessions = [
    "Introduction to Drums & Percussion",
    "Correct Sitting & Stick Grip",
    "Basic Rhythm & Counting",
    "Single Stroke & Control Exercises",
    "Basic Drum Notation",
    "Hi-Hat, Snare & Bass Coordination",
    "First Basic Grooves",
    "Playing with a Metronome",
    "Basic Fills",
    "Introduction to Percussion",
    "Listening & Playing with a Band",
    "Beginner Performance Practice",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Drums — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Learn solid rhythm foundations, coordination, and confidence to play
        drums and percussion in live and studio settings.
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
