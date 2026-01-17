export default function MusicTheoryIntermediatePage() {
  const sessions = [
    "Major & Minor Key Analysis",
    "Diatonic Chords in All Keys",
    "Roman Numeral Harmony (Intermediate)",
    "Chord Inversions & Voice Leading",
    "Secondary Dominants",
    "Modulation Basics",
    "Harmonic Rhythm",
    "Non-Chord Tones (Passing, Neighbor, Suspension)",
    "Cadences & Harmonic Resolution",
    "Scale Degrees & Functional Harmony",
    "Circle of Fifths (Practical Use)",
    "Harmonic Analysis of Songs",
    "Rhythm & Meter in Composition",
    "Introduction to Modal Harmony",
    "Ear Training: Chord Progressions",
    "Applied Theory in Performance & Songwriting",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Music Theory – Intermediate
      </h1>

      <p className="text-gray-600 mb-8">
        Strengthen harmonic understanding, analytical skills, and practical
        application of music theory across instruments and genres.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Intermediate Sessions (16)
      </h2>

      <ol className="space-y-3 list-decimal list-inside">
        {sessions.map((session, index) => (
          <li
            key={index}
            className="p-3 border rounded hover:bg-gray-50 transition"
          >
            {session}
          </li>
        ))}
      </ol>
    </main>
  );
}
