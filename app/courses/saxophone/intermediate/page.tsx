export default function SaxophoneIntermediatePage() {
  const sessions = [
    "Advanced Fingerings & Alternate Notes",
    "Breath Control Techniques",
    "Articulation: Staccato, Legato & Slurs",
    "Tone Production & Consistency",
    "Playing in Different Registers",
    "Intermediate Scales & Modes",
    "Jazz & Blues Phrasing",
    "Sight Reading Intermediate Pieces",
    "Playing Duets & Ensemble Skills",
    "Improvisation Techniques",
    "Dynamics & Expression",
    "Vibrato Techniques",
    "Playing Chromatic Scales Smoothly",
    "Embouchure Adjustments & Comfort",
    "Solo Performance Preparation",
    "Practice Strategies for Mastery",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Saxophone — Intermediate Level</h1>
      <p className="text-gray-600 mb-8">
        Build on beginner skills with advanced fingerings, tone control, ensemble playing, and improvisation techniques.
      </p>
      <ul className="space-y-3">
        {sessions.map((session, index) => (
          <li key={index} className="border rounded px-4 py-3 hover:bg-gray-50">
            <strong>Session {index + 1}:</strong> {session}
          </li>
        ))}
      </ul>
    </main>
  );
}
