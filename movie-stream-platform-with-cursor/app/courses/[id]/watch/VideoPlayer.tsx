"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

interface VideoPlayerProps {
  videoId: string;
  title: string;
  nextVideoId: string | null | undefined;
  courseId: string;
}

export function VideoPlayer({
  videoId,
  title,
  nextVideoId,
  courseId,
}: VideoPlayerProps) {
  const router = useRouter();

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;

  const handleNextVideo = () => {
    if (nextVideoId) {
      router.push(`/courses/${courseId}/watch?video=${nextVideoId}`);
    }
  };

  return (
    <div className="relative h-full w-full">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
      {nextVideoId && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-end">
          <Link
            href={`/courses/${courseId}/watch?video=${nextVideoId}`}
            onClick={(e) => {
              e.preventDefault();
              handleNextVideo();
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            次の動画へ →
          </Link>
        </div>
      )}
    </div>
  );
}
