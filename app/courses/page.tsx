export default function CoursesPage() {
  const courses = [
    { name: "Piano / Keyboard", slug: "piano" },
    { name: "Guitar", slug: "guitar" },
    { name: "Voice & Harmony", slug: "voice-harmony" },
    { name: "Drums & Percussion", slug: "drums" },
    { name: "Music Theory", slug: "music-theory" },
    { name: "Saxophone", slug: "saxophone" },
    { name: "Trumpet", slug: "trumpet" },
    { name: "Violin", slug: "violin" },
    { name: "Music Production & Arrangement", slug: "music-production" },
    { name: "Sound Engineering & Live Sound", slug: "sound-engineering" },
  ];

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      <ul className="grid gap-4 sm:grid-cols-2">
        {courses.map(course => (
          <li key={course.slug}>
            <a
              href={`/courses/${course.slug}`}
              className="block border rounded p-4 hover:bg-gray-50"
            >
              {course.name}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
