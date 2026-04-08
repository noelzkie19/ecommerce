"use client";

import { useAffiliateCourses } from "./hooks/useAffiliateCourses";
import { BookOpen, Lock, Loader2 } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";

function getYouTubeId(url: string): string | null {
  const match =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/.exec(
      url,
    );
  return match ? match[1] : null;
}

const DEFAULT_THUMBNAIL = "/images/thumbnail.jpg";

function CourseEmbed({
  youtubeUrl,
  thumbnailUrl,
  title,
}: {
  readonly youtubeUrl?: string;
  readonly thumbnailUrl?: string | null;
  readonly title: string;
}) {
  const videoId = youtubeUrl ? getYouTubeId(youtubeUrl) : null;

  if (videoId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  const thumbnailSrc = thumbnailUrl || DEFAULT_THUMBNAIL;
  return (
    <img
      src={thumbnailSrc}
      alt={title}
      className="w-full h-full object-cover"
    />
  );
}

export const AffiliateCoursesPage = () => {
  const { courses, isLoading, error } = useAffiliateCourses();

  if (isLoading) {
    return (
      <div>
        <AffiliateTopBar
          title="Courses"
          subtitle="Level up your affiliate marketing skills"
        />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <AffiliateTopBar
          title="Courses"
          subtitle="Level up your affiliate marketing skills"
        />
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <AffiliateTopBar
        title="Courses"
        subtitle="Level up your affiliate marketing skills"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No courses available at the moment.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-3 ${
                course.isActive
                  ? "border-gray-100"
                  : "border-gray-100 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                </div>
                {course.isActive ? (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                    Available
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3" /> Unavailable
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <CourseEmbed
                  youtubeUrl={course.youtubeUrl}
                  thumbnailUrl={course.thumbnailUrl}
                  title={course.title}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
