/**
 * コース・セッション・動画データの取得
 * 静的JSONから読み込み（デモ版）
 */

import type { Course, Session, Video, SessionWithVideos } from "./types";
import data from "@/data/courses.json";

interface DataFile {
  courses: Course[];
  sessions: Session[];
  videos: Video[];
}

const dataFile = data as DataFile;

/** 全コース一覧を取得 */
export function getCourses(): Course[] {
  const { courses } = dataFile;
  return [...courses].sort((a, b) => a.id.localeCompare(b.id));
}

/** コースIDでコースを取得 */
export function getCourseById(id: string): Course | undefined {
  return getCourses().find((c) => c.id === id);
}

/** コースのセッション一覧（動画含む）を取得 */
export function getSessionsByCourseId(courseId: string): SessionWithVideos[] {
  const { sessions, videos } = dataFile;
  const courseSessions = sessions
    .filter((s) => s.courseId === courseId)
    .sort((a, b) => a.order - b.order);

  return courseSessions.map((session) => ({
    ...session,
    videos: videos
      .filter((v) => v.sessionId === session.id)
      .sort((a, b) => a.order - b.order),
  }));
}

/** 動画IDで動画を取得 */
export function getVideoById(videoId: string): Video | undefined {
  const { videos } = dataFile;
  return videos.find((v) => v.id === videoId);
}

/** コース内の全動画を順序付きで取得 */
export function getAllVideosInCourse(courseId: string): Video[] {
  const sessions = getSessionsByCourseId(courseId);
  return sessions.flatMap((s) => s.videos);
}
