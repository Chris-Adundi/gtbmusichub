export default function VoiceHarmonyAdvancedPage() {
  const sessions = [
    "Advanced Vocal Control & Consistency",
    "Extreme Range Management",
    "Advanced Harmony Structures",
    "Complex Chord Voicing for Vocals",
    "Lead Vocal Interpretation",
    "Advanced Vocal Runs & Melismas",
    "Vocal Improvisation Mastery",
    "Choir & Ensemble Direction Skills",
    "Studio Vocal Recording Techniques",
    "Microphone & Monitoring Mastery",
    "Vocal Effects & Processing",
    "Stylistic Mastery Across Genres",
    "Vocal Arrangement Writing",
    "Vocal Stamina for Live Performance",
    "Advanced Ear Training for Harmony",
    "Live Performance Leadership",
    "Stage Presence & Audience Engagement",
    "Vocal Coaching Fundamentals",
    "Professional Vocal Branding",
    "Career Development for Vocalists"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Voice & Harmony — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        Master professional-level vocal performance, harmony construction,
        recording, leadership, and career development.
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
