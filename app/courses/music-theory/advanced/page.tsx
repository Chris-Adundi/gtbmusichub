export default function MusicTheoryAdvancedPage() {
  const sessions = [
    "Advanced Harmonic Analysis",
    "Chromatic Harmony",
    "Extended Chords (9ths, 11ths, 13ths)",
    "Altered Dominants",
    "Advanced Modal Harmony",
    "Polytonality & Bitonality",
    "Counterpoint Fundamentals",
    "Advanced Counterpoint Techniques",
    "Advanced Modulation Concepts",
    "Non-Functional Harmony",
    "Advanced Rhythmic Theory",
    "Polyrhythms & Metric Modulation",
    "Voice Leading Mastery",
    "Harmonic Substitution",
    "Jazz Harmony Foundations",
    "Contemporary & Neo-Soul Harmony",
    "Film & Classical Harmonic Techniques",
    "Analytical Listening Skills",
    "Composition-Focused Theory",
    "Professional Application of Music Theory"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Music Theory — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        This level explores deep harmonic concepts, advanced rhythm,
        composition techniques, and professional-level music analysis.
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
