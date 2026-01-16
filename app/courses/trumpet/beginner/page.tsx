export default function TrumpetBeginnerPage() {
  const sessions = [
    "Introduction to the Trumpet",
    "Assembling and Cleaning the Instrument",
    "Mouthpiece & Embouchure Basics",
    "Breathing and Air Support",
    "Producing Your First Notes",
    "Simple Lip Slurs Exercises",
    "Reading Music Notation for Trumpet",
    "Playing Basic Scales",
    "Rhythm and Timing Exercises",
    "Articulation Techniques",
    "Dynamics and Expression",
    "Playing Your First Simple Song",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Trumpet — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Start your trumpet journey: learn proper technique, breathing, reading music, and play simple melodies with confidence.
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
