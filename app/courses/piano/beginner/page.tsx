export default function PianoBeginnerPage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Piano / Keyboard — Beginner Level
      </h1>

      <p className="text-gray-600 mb-8">
        This level introduces foundational piano skills, basic music reading,
        hand coordination, and simple performance techniques for beginners.
      </p>

      <div className="grid gap-4">
        <Session number={1} title="Introduction to the Piano & Keyboard Layout" />
        <Session number={2} title="Finger Numbers, Posture & Hand Position" />
        <Session number={3} title="Understanding Notes, Octaves & Middle C" />
        <Session number={4} title="Basic Rhythm & Counting (4/4 Time)" />
        <Session number={5} title="Playing Simple Melodies with the Right Hand" />
        <Session number={6} title="Left Hand Basics & Simple Bass Notes" />
        <Session number={7} title="Reading Treble & Bass Clefs" />
        <Session number={8} title="Introduction to Scales (C Major)" />
        <Session number={9} title="Basic Chords (Major & Minor)" />
        <Session number={10} title="Hands Together: Simple Coordination" />
        <Session number={11} title="Playing Simple Songs & Exercises" />
        <Session number={12} title="Beginner Performance & Practice Techniques" />
      </div>
    </main>
  );
}

function Session({ number, title }: { number: number; title: string }) {
  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold">
        Session {number}
      </h2>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}
