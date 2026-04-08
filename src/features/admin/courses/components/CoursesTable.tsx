"use client";

import { Edit, Trash2 } from "lucide-react";
import type { Course } from "@/types/course.types";

interface CoursesTableProps {
  readonly courses: Course[];
  readonly onEdit: (course: Course) => void;
  readonly onDelete: (course: Course) => void;
}

function getYouTubeId(url: string): string | null {
  const match =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/.exec(
      url,
    );
  return match ? match[1] : null;
}

const DEFAULT_THUMBNAIL = "/images/thumbnail.jpg";

function CoursePreview({ course }: { readonly course: Course }) {
  const videoId = getYouTubeId(course.youtubeUrl);

  if (videoId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={course.title}
        className="w-40 h-24 rounded-lg"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  const thumbnailSrc = course.thumbnailUrl || DEFAULT_THUMBNAIL;
  return (
    <img
      src={thumbnailSrc}
      alt={course.title}
      className="w-16 h-12 object-cover rounded-lg"
    />
  );
}

export function CoursesTable({ courses, onEdit, onDelete }: CoursesTableProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No courses found. Click "Add New" to create one.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Preview
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Title
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Category
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Premium
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">
              Status
            </th>
            <th className="text-right py-3 px-4 font-medium text-gray-600 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr
              key={course.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">
                <CoursePreview course={course} />
              </td>
              <td className="py-3 px-4">
                <div className="font-medium text-gray-900">{course.title}</div>
                {course.description && (
                  <div className="text-xs text-gray-500 truncate max-w-[200px]">
                    {course.description}
                  </div>
                )}
              </td>
              <td className="py-3 px-4 text-gray-600 text-sm">
                {course.category || "-"}
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    course.isPremium
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {course.isPremium ? "Premium" : "Free"}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    course.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {course.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(course)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(course)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
