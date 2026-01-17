export default function SoundEngineeringAdvancedPage() {
  const sessions = [
    "Advanced Signal Flow & System Design",
    "Large-Scale PA System Design",
    "Line Arrays & Subwoofer Configuration",
    "Advanced Gain Structure & Headroom Management",
    "Digital Mixing Consoles (Advanced Features)",
    "Advanced EQ Techniques (Surgical & Creative)",
    "Advanced Compression & Dynamics Control",
    "Live Sound Automation & Snapshots",
    "Monitor Engineering for Large Stages",
    "In-Ear Monitor System Design",
    "Wireless Systems Management",
    "Live Recording & Broadcast Mixing",
    "Acoustic Analysis & Room Tuning",
    "System Alignment & Time Correction",
    "Advanced Microphone Techniques",
    "Troubleshooting Live Sound Problems",
    "Touring Sound Engineering Practices",
    "Sound Engineering for Worship & Concerts",
    "Studio-to-Live Workflow Integration",
    "Professional Sound Engineer Career Skills"
  ];

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Sound Engineering & Live Sound — Advanced Level
      </h1>

      <p className="text-gray-600 mb-8">
        Master large-scale sound systems, professional live mixing,
        touring workflows, and advanced studio-to-live integration.
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
