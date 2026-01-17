export default function GuitarAdvancedPage() {
  const sessions = [
    "Advanced Fretboard Mastery (All Positions)",
    "Advanced Scale Applications & Modes",
    "Advanced Lead Guitar Techniques",
    "Sweep Picking & Economy Picking",
    "Advanced Fingerstyle & Hybrid Picking",
    "Chord Extensions & Voicings",
    "Advanced Rhythm Guitar Techniques",
    "Polyrhythms & Complex Strumming",
    "Advanced Improvisation Concepts",
    "Jazz Guitar Foundations",
    "Fusion & Progressive Guitar Styles",
    "Advanced Tone Shaping & Effects",
    "Studio Guitar Recording Techniques",
    "Live Performance & Stage Presence",
    "Advanced Sight-Reading for Guitar",
    "Advanced Harmonics & Textures",
    "Guitar Solo Construction & Expression",
    "Musical Direction & Band Leadership",
    "Session Guitarist Skills",
    "Professional Practice & Career Development"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Guitar — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        This advanced guitar course prepares players for professional studio work,
        live performance, advanced improvisation, and musical leadership.
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
