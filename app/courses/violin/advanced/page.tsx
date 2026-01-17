export default function ViolinAdvancedPage() {
  const sessions = [
    "Advanced Bow Control & Tone Projection",
    "Extended Position Mastery",
    "Fast Passage Technique",
    "Advanced Vibrato Styles",
    "Complex Double Stops",
    "Chordal Playing Techniques",
    "Advanced Scale Systems",
    "Advanced Arpeggios & Sequences",
    "Articulation Variations",
    "Rhythmic Precision at High Tempos",
    "Orchestral Violin Techniques",
    "Chamber Music Performance",
    "Solo Repertoire Interpretation",
    "Stylistic Performance (Baroque, Romantic, Modern)",
    "Advanced Sight Reading",
    "Improvisation for Violin",
    "Recording Techniques for Violin",
    "Amplification & Effects Use",
    "Stage Presence & Performance Control",
    "Professional Violin Development"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Violin — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        Master advanced violin techniques, expressive performance,
        professional repertoire, and recording skills.
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
