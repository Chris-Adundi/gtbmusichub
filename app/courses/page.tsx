import Link from "next/link";

const courses = [
  "piano",
  "guitar",
  "voice-harmony",
  "drums",
  "music-theory",
  "saxophone",
  "trumpet",
  "violin",
  "music-production",
  "sound-engineering",
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      <ul className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <li key={course}>
            <Link
              href={`/courses/${course}/beginner`}
              className="block border rounded px-4 py-3 hover:bg-gray-50"
            >
              {course.replace("-", " ").toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
