export default function SoundEngineeringBeginnerPage() {
  const sessions = [
    "Introduction to Sound Engineering",
    "Understanding Sound and Acoustics",
    "Signal Flow Basics",
    "Microphone Types & Placement",
    "Mixing Consoles Overview",
    "Digital Audio Interfaces",
    "Basic EQ and Compression",
    "Monitoring and Headphones",
    "Live Sound Setup Fundamentals",
    "Recording Basics in Studio",
    "Introduction to Mixing",
    "Basic Troubleshooting and Safety"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Sound Engineering & Live Sound — Beginner
      </h1>

      <p className="text-gray-600 mb-8">
        Learn the fundamentals of sound engineering for both live performances and studio recording. Perfect for aspiring sound engineers.
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
