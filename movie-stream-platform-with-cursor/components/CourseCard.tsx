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
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-colors duration-200 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-medium text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
          {course.title}
        </h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {course.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-200/70 pt-4 dark:border-zinc-800">
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
