/**
 * 動画配信プラットフォーム 型定義
 * requirements.md のデータ構造に基づく
 */

/** コース */
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  instructor?: string;
}

/** セッション（章・レッスン単位） */
export interface Session {
  id: string;
  courseId: string;
  name: string;
  order: number;
}

/** 動画 */
export interface Video {
  id: string;
  sessionId: string;
  title: string;
  youtubeVideoId: string;
  order: number;
}

/** セッション + 動画一覧（表示用） */
export interface SessionWithVideos extends Session {
  videos: Video[];
}
