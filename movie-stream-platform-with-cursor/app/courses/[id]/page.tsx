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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← コース一覧に戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {course.title}
            </h1>
            {course.instructor && (
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                講師: {course.instructor}
              </p>
            )}
            <p className="mt-4 text-zinc-700 dark:text-zinc-300">
              {course.description}
            </p>
            <div className="mt-8">
              <Link
                href={`/courses/${course.id}/watch`}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
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
