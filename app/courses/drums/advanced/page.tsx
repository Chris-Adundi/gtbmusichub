export default function DrumsAdvancedPage() {
  const sessions = [
    "Advanced Hand & Foot Independence",
    "Mastering All Rudiments on the Drum Kit",
    "Polyrhythms & Advanced Subdivisions",
    "Odd Time Signatures (5/4, 7/8, 9/8)",
    "Advanced Ghost Notes & Dynamic Control",
    "Advanced Linear Drumming",
    "Speed, Endurance & Control Development",
    "Advanced Gospel & Fusion Grooves",
    "Jazz & Swing Drumming Techniques",
    "Latin & Afro-Cuban Rhythms",
    "Advanced Fill Construction & Musicality",
    "Playing with Click Tracks & Loops",
    "Studio Drumming Techniques",
    "Live Performance & Stage Control",
    "Advanced Groove Interpretation",
    "Sight-Reading at Performance Level",
    "Drum Solo Construction & Expression",
    "Musical Direction & Band Leadership",
    "Advanced Improvisation Concepts",
    "Professional Practice, Touring & Career Skills"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Drums & Percussion — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        This advanced level prepares drummers for professional performance,
        studio work, live shows, and musical leadership.
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
