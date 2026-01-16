export default function VoiceHarmonyBeginnerPage() {
  const sessions = [
    "Introduction to the Voice",
    "Breathing Techniques for Singing",
    "Pitch & Ear Awareness",
    "Vocal Warm-ups & Exercises",
    "Basic Music Keys for Singers",
    "Singing in Tune",
    "Introduction to Harmony",
    "Simple Two-Part Harmony",
    "Listening & Blending Voices",
    "Timing & Rhythm for Vocalists",
    "Microphone Basics for Singers",
    "Beginner Performance Practice",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Voice & Harmony — Beginner</h1>

      <p className="text-gray-600 mb-8">
        Build a strong vocal foundation, develop pitch accuracy, and learn how
        to sing confidently as a lead or harmony vocalist.
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
