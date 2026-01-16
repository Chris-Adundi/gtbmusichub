export default function GuitarBeginnerPage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Guitar — Beginner Level
      </h1>

      <p className="text-gray-600 mb-8">
        This level introduces guitar fundamentals including posture, chords,
        rhythm, strumming, and basic song performance.
      </p>

      <div className="grid gap-4">
        <Session number={1} title="Introduction to the Guitar & Parts Identification" />
        <Session number={2} title="Posture, Finger Placement & String Names" />
        <Session number={3} title="Basic Rhythm & Strumming Techniques" />
        <Session number={4} title="Open Chords (C, G, D, Em, Am)" />
        <Session number={5} title="Chord Transitions & Timing" />
        <Session number={6} title="Introduction to Tabs & Simple Riffs" />
        <Session number={7} title="Strumming Patterns & Groove Control" />
        <Session number={8} title="Introduction to Scales (Major Scale)" />
        <Session number={9} title="Basic Finger Exercises & Dexterity" />
        <Session number={10} title="Playing Simple Songs" />
        <Session number={11} title="Basic Ear Training for Guitarists" />
        <Session number={12} title="Beginner Performance & Practice Strategy" />
      </div>
    </main>
  );
}

function Session({ number, title }: { number: number; title: string }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold">Session {number}</h2>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}
