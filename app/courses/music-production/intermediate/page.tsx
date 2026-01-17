export default function MusicProductionIntermediatePage() {
  const sessions = [
    "Advanced DAW Workflow & Shortcuts",
    "Multi-track Recording Techniques",
    "Advanced MIDI Programming & Editing",
    "Layering Synths & Virtual Instruments",
    "Creating Complex Drum Patterns",
    "Chord Progressions and Harmonic Arrangement",
    "Creative Sound Design (Synths & Samplers)",
    "Using Advanced Effects & Plugins (Delay, Modulation, Distortion)",
    "Automation for Dynamics & Expression",
    "Structuring Full Songs: Intro, Verse, Chorus, Bridge, Outro",
    "Vocal Recording & Layering",
    "Intermediate Mixing Techniques (EQ, Compression, Panning)",
    "Using Bussing & Group Channels",
    "Intro to Mastering for Distribution",
    "Collaboration and File Management Best Practices",
    "Preparing Projects for Live Performance or Streaming",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Music Production & Arrangement — Intermediate
      </h1>

      <p className="text-gray-600 mb-8">
        Build on your beginner skills and dive into more advanced production,
        arrangement, and mixing techniques for professional music creation.
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
