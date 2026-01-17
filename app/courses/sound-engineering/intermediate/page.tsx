export default function SoundEngineeringIntermediatePage() {
  const sessions = [
    "Intermediate Signal Flow & Patch Bays",
    "Advanced Microphone Techniques",
    "Recording Multiple Instruments Simultaneously",
    "Mixing Intermediate Tracks",
    "Compression & Dynamics Processing",
    "EQ Techniques for Clarity",
    "Using Effects Creatively",
    "Monitor Mixing for Live Shows",
    "Stage Setup & Signal Routing",
    "Troubleshooting Common Issues",
    "Working with MIDI & DAWs",
    "Recording Vocals with Effects",
    "Multi-Track Editing",
    "Intermediate Mastering Concepts",
    "Live Sound Setup Practice",
    "Mixing a Small Band Session",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Sound Engineering — Intermediate</h1>

      <ul className="space-y-3">
        {sessions.map((s, i) => (
          <li key={i} className="border rounded p-3">
            <strong>Session {i + 1}:</strong> {s}
          </li>
        ))}
      </ul>
    </main>
  );
}
