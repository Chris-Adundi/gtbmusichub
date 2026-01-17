export default function ViolinIntermediatePage() {
  const sessions = [
    "Shifting Between Positions",
    "Advanced Bowing Techniques (Spiccato, Legato)",
    "Vibrato Development",
    "Playing in Higher Positions",
    "Intermediate Etudes & Exercises",
    "Double Stops & Harmonics",
    "Dynamics & Phrasing",
    "Sight Reading Intermediate Pieces",
    "Orchestra/Ensemble Playing",
    "Expressive Techniques for Solo Pieces",
    "Intonation & Tuning Accuracy",
    "Intermediate Scales & Arpeggios",
    "Playing Classical Repertoire",
    "Improvisation & Folk Styles",
    "Performance Preparation & Stage Presence",
    "Efficient Practice Techniques",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Violin — Intermediate Level</h1>
      <p className="text-gray-600 mb-8">
        Expand your violin skills with advanced bowing, shifting, vibrato, and performance techniques.
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
