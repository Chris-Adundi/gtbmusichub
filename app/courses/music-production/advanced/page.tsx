export default function MusicProductionAdvancedPage() {
  const sessions = [
    "Advanced Sound Design & Synthesis",
    "Advanced Sampling Techniques",
    "Advanced Drum Programming & Percussion Design",
    "Orchestration & Advanced Arrangement",
    "Harmonic Depth & Advanced Chord Theory",
    "Advanced Automation & Dynamic Control",
    "Creative Mixing Techniques",
    "Advanced Bussing & Routing",
    "Parallel Processing & Advanced FX",
    "Professional Vocal Production",
    "Advanced Beat Transitions & Energy Control",
    "Mixing for Streaming Platforms",
    "Mastering Fundamentals",
    "Advanced Mastering Chains",
    "Loudness, Dynamics & Clarity Control",
    "Studio Workflow Optimization",
    "Collaboration with Artists & Labels",
    "Music Production for Film & Media",
    "Live Performance & Hybrid Setups",
    "Professional Music Production Career"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Music Production & Arrangement — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        This advanced level focuses on professional music production,
        advanced mixing and mastering, sound design, and industry-ready workflows.
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
