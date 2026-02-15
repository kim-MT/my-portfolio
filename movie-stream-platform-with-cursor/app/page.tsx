import { getCourses, getSessionsByCourseId } from "@/lib/data";
import { CourseCard } from "@/components/CourseCard";

export default function HomePage() {
  const courses = getCourses();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200/80 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            動画配信プラットフォーム
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
            コース一覧から学びたいコースを選んでください
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <h2 className="sr-only">コース一覧</h2>
          {courses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  sessionCount={getSessionsByCourseId(course.id).length}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                コースがまだ登録されていません
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
