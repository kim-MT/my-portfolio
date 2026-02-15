import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  sessionCount?: number;
}

export function CourseCard({ course, sessionCount }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          {course.instructor && (
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              講師: {course.instructor}
            </span>
          )}
          {sessionCount !== undefined && sessionCount > 0 && (
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {sessionCount} セッション
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
