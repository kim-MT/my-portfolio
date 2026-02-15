import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourseById,
  getSessionsByCourseId,
  getAllVideosInCourse,
  getVideoById,
} from "@/lib/data";
import { VideoPlayer } from "./VideoPlayer";

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ video?: string }>;
}

export default async function WatchPage({
  params,
  searchParams,
}: WatchPageProps) {
  const { id: courseId } = await params;
  const { video: videoId } = await searchParams;

  const course = getCourseById(courseId);
  if (!course) {
    notFound();
  }

  const sessions = getSessionsByCourseId(courseId);
  const allVideos = getAllVideosInCourse(courseId);

  // 表示する動画を決定（videoId が指定されていればその動画、なければ最初の動画）
  const currentVideo = videoId
    ? getVideoById(videoId)
    : allVideos[0];

  // 指定された動画がこのコースに含まれない場合は最初の動画を使用
  const displayVideo =
    currentVideo && allVideos.some((v) => v.id === currentVideo.id)
      ? currentVideo
      : allVideos[0];

  // 次の動画を取得（連続視聴用）
  const currentIndex = displayVideo
    ? allVideos.findIndex((v) => v.id === displayVideo.id)
    : -1;
  const nextVideo = currentIndex >= 0 && currentIndex < allVideos.length - 1
    ? allVideos[currentIndex + 1]
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href={`/courses/${courseId}`}
            className="text-sm text-blue-400 hover:underline"
          >
            ← {course.title}
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 lg:flex-row">
        {/* 動画エリア */}
        <div className="flex-1">
          <div className="aspect-video overflow-hidden rounded-lg bg-black">
            {displayVideo ? (
              <VideoPlayer
                videoId={displayVideo.youtubeVideoId}
                title={displayVideo.title}
                nextVideoId={nextVideo?.id}
                courseId={courseId}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-500">
                動画がありません
              </div>
            )}
          </div>
          {displayVideo && (
            <h2 className="mt-4 text-lg font-semibold text-zinc-100">
              {displayVideo.title}
            </h2>
          )}
        </div>

        {/* セッション・動画一覧 */}
        <aside className="w-full lg:w-80">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <h3 className="mb-4 font-semibold text-zinc-100">
              セッション一覧
            </h3>
            <div className="max-h-[400px] space-y-4 overflow-y-auto">
              {sessions.map((session) => (
                <div key={session.id}>
                  <h4 className="text-sm font-medium text-zinc-300">
                    {session.name}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {session.videos.map((video) => (
                      <li key={video.id}>
                        <Link
                          href={`/courses/${courseId}/watch?video=${video.id}`}
                          className={`block rounded px-2 py-1.5 text-sm transition ${
                            displayVideo?.id === video.id
                              ? "bg-blue-600/30 text-blue-300"
                              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                          }`}
                        >
                          {video.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
