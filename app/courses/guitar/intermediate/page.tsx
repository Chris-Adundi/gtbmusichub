export default function GuitarIntermediatePage() {
  const sessions = [
    "Review of Fretboard Notes & Positions",
    "Major Scale Patterns Across the Neck",
    "Minor Scale & Natural Minor Application",
    "Pentatonic Scales (All Positions)",
    "Chord Inversions & Voicings",
    "Barre Chords Mastery",
    "Rhythm Guitar: Strumming & Groove",
    "Fingerstyle & Hybrid Picking",
    "Alternate Picking & Speed Control",
    "Arpeggios & Broken Chords",
    "Introduction to Improvisation",
    "Playing in Different Keys",
    "Basic Lead Guitar Techniques",
    "Dynamics, Tone & Articulation",
    "Playing with a Band or Backing Track",
    "Song Application & Performance Practice",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Guitar – Intermediate
      </h1>

      <p className="text-gray-600 mb-8">
        Develop solid technique, musical confidence, and expressive playing
        across all guitar styles — acoustic, electric, classical, and beyond.
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
