"use client";

import { useAffiliateCourses } from "./hooks/useAffiliateCourses";
import { BookOpen, PlayCircle, Lock, Loader2 } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";
import { Course } from "@/types/course.types";

export const AffiliateCoursesPage = () => {
  const { courses, isLoading, error } = useAffiliateCourses();

  const handlePlayCourse = (course: Course) => {
    if (course.youtubeUrl) {
      window.open(course.youtubeUrl, "_blank", "noopener,noreferrer");
    }
  };

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

              {course.thumbnailUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.youtubeUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                <span className="text-xs text-gray-400">
                  {course.duration ? `${course.duration} min` : "Duration N/A"}
                </span>
                <button
                  disabled={!course.isActive || !course.youtubeUrl}
                  onClick={() => handlePlayCourse(course)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <PlayCircle className="w-4 h-4" />
                  {course.youtubeUrl ? "Watch Course" : "Coming Soon"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
