export default function TrumpetAdvancedPage() {
  const sessions = [
    "Advanced Tone Projection",
    "Extended Range Mastery",
    "Endurance & Stamina Training",
    "Advanced Lip Flexibility",
    "Double & Triple Tonguing",
    "Fast Technical Passages",
    "Advanced Scale Systems",
    "Jazz Harmony for Trumpet",
    "Bebop Language & Patterns",
    "Modal Improvisation",
    "Advanced Articulation Styles",
    "Complex Rhythmic Interpretation",
    "Transcription & Solo Analysis",
    "Orchestral Trumpet Techniques",
    "Lead Trumpet Playing",
    "Ensemble Leadership Skills",
    "Studio Recording Techniques",
    "Microphone & Amplification Use",
    "Live Performance Control",
    "Professional Trumpet Development"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Trumpet — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        Develop professional-level trumpet technique, range, articulation,
        improvisation, and performance mastery.
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
