export default function DrumsIntermediatePage() {
  const sessions = [
    "Advanced Stick Control & Coordination",
    "Independence Between Hands & Feet",
    "Intermediate Groove Variations",
    "Ghost Notes & Dynamic Control",
    "Fills, Transitions & Groove Flow",
    "Time Signatures Beyond 4/4",
    "Syncopation & Polyrhythms (Intro)",
    "Playing with Click & Tempo Control",
    "Drum Kit Tuning & Sound Balance",
    "Percussion Layering with Drum Kit",
    "Groove Adaptation Across Music Styles",
    "Linear Drumming Concepts",
    "Playing with Bass & Rhythm Section",
    "Dynamics in Live Performance",
    "Improvisation within Structure",
    "Song Application & Performance Practice",
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Drums & Percussion – Intermediate
      </h1>

      <p className="text-gray-600 mb-8">
        Develop independence, groove depth, rhythmic awareness, and performance
        confidence across drum kit and percussion settings.
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
