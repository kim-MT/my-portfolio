import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseById } from "@/lib/data";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200/80 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            ← コース一覧に戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-7 sm:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {course.title}
            </h1>
            {course.instructor && (
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                講師: {course.instructor}
              </p>
            )}
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
              {course.description}
            </p>
            <div className="mt-8">
              <Link
                href={`/courses/${course.id}/watch`}
                className="inline-flex items-center justify-center rounded-lg border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-zinc-800 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                コースを見る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
