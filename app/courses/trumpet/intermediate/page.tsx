export default function TrumpetIntermediatePage() {
  const sessions = [
    "Lip Flexibility & Embouchure Control",
    "Advanced Articulation: Staccato, Marcato, Slurs",
    "Playing in Different Registers",
    "Intermediate Scales & Modes",
    "Tonguing Techniques (Single, Double, Triple)",
    "Dynamics & Expression",
    "Sight Reading Intermediate Pieces",
    "Jazz & Classical Phrasing",
    "Endurance Exercises & Breathing Control",
    "Improvisation Techniques",
    "Playing in Ensembles & Duets",
    "Vibrato Techniques",
    "Intermediate Etudes & Solo Pieces",
    "Transposition & Key Adaptation",
    "Performance Preparation & Expression",
    "Efficient Daily Practice Routine",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Trumpet — Intermediate Level</h1>
      <p className="text-gray-600 mb-8">
        Develop embouchure, articulation, register control, and performance skills for confident trumpet playing.
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
