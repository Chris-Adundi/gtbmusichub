export default function ViolinBeginnerPage() {
  const sessions = [
    "Introduction to the Violin",
    "Parts of the Violin & Bow",
    "Proper Posture and Holding the Instrument",
    "Tuning the Violin",
    "Basic Bowing Techniques",
    "Producing Your First Notes",
    "Open Strings Exercises",
    "Reading Music Notation for Violin",
    "Playing Simple Scales",
    "Basic Rhythm Exercises",
    "Dynamics and Expression",
    "Playing Your First Simple Song",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Violin — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Start your violin journey: learn posture, bowing, basic scales, and play simple melodies with confidence.
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
