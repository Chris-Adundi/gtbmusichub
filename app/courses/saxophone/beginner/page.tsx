export default function SaxophoneBeginnerPage() {
  const sessions = [
    "Introduction to the Saxophone",
    "Holding the Instrument Properly",
    "Mouthpiece & Embouchure Basics",
    "Breathing Techniques",
    "Producing Your First Notes",
    "Playing Simple Scales",
    "Reading Music Notation for Saxophone",
    "Rhythm and Timing Basics",
    "Simple Melodies Practice",
    "Tonguing Techniques",
    "Articulation and Dynamics",
    "Putting It All Together: Simple Song",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Saxophone — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Learn the basics of playing the saxophone: proper technique, breathing, reading music, and playing simple songs.
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
