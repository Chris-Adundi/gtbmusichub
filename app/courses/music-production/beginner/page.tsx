export default function MusicProductionBeginnerPage() {
  const sessions = [
    "Introduction to Music Production",
    "Understanding DAWs (Digital Audio Workstations)",
    "Setting up Your Home Studio",
    "Basics of MIDI and Audio Tracks",
    "Using Virtual Instruments",
    "Recording Audio & MIDI",
    "Editing Basics",
    "Introduction to Effects (EQ, Compression, Reverb)",
    "Building Your First Beat",
    "Arranging a Simple Song",
    "Mixing Fundamentals",
    "Exporting Your First Track",
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Music Production & Arrangement — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Learn how to produce, arrange, and mix your first music tracks using a DAW. Perfect for aspiring music producers.
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
