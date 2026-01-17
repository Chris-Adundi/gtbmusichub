export default function VoiceHarmonyIntermediatePage() {
  const sessions = [
    "Vocal Range Expansion Techniques",
    "Breath Control for Sustained Phrases",
    "Vocal Placement & Resonance",
    "Pitch Accuracy & Intonation Control",
    "Harmony Structures (3-Part & 4-Part)",
    "Singing in Different Keys",
    "Lead vs Backup Vocal Roles",
    "Blend & Balance in Group Singing",
    "Ear Training for Harmonies",
    "Vocal Dynamics & Expression",
    "Harmony Arrangement Basics",
    "Call & Response Techniques",
    "Microphone Technique for Vocalists",
    "Vocal Health & Endurance",
    "Intervals Applied to Harmony Singing",
    "Live Performance Harmony Practice",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Voice & Harmony – Intermediate
      </h1>

      <p className="text-gray-600 mb-8">
        Develop vocal control, harmony confidence, and group singing skills for
        both lead and backup vocalists.
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
