"use client";

import { BookOpen, PlayCircle, Lock } from "lucide-react";
import { AffiliateTopBar } from "../shared/components/AffiliateTopBar";

const COURSES = [
  {
    id: 1,
    title: "Affiliate Marketing 101",
    description:
      "Learn the fundamentals of affiliate marketing and how to get started.",
    duration: "45 min",
    locked: false,
  },
  {
    id: 2,
    title: "Building Your Audience",
    description:
      "Strategies to grow your social media presence and drive traffic.",
    duration: "60 min",
    locked: false,
  },
  {
    id: 3,
    title: "Advanced Commission Strategies",
    description: "Maximize your earnings with proven advanced techniques.",
    duration: "90 min",
    locked: true,
  },
  {
    id: 4,
    title: "Content Creation for Affiliates",
    description:
      "Create compelling content that converts visitors into buyers.",
    duration: "75 min",
    locked: true,
  },
];

export const AffiliateCoursesPage = () => (
  <div>
    <AffiliateTopBar
      title="Courses"
      subtitle="Level up your affiliate marketing skills"
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {COURSES.map((course) => (
        <div
          key={course.id}
          className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col gap-3 ${
            course.locked ? "border-gray-100 opacity-70" : "border-gray-100"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-purple-500" />
            </div>
            {course.locked ? (
              <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                <Lock className="w-3 h-3" /> Locked
              </span>
            ) : (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                Available
              </span>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-800">{course.title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
            <span className="text-xs text-gray-400">{course.duration}</span>
            <button
              disabled={course.locked}
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              {course.locked ? "Unlock" : "Start Course"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
