"use client";

import { useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
import { useCourses } from "./hooks/useCourses";
import { CoursesTable } from "./components/CoursesTable";
import CourseFormModal from "./components/CourseFormModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { CoursesPagination } from "./components/CoursesPagination";
import { Course, COURSE_CATEGORIES } from "@/types/course.types";

export default function CoursesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState<boolean | "">("");
  const [isActive, setIsActive] = useState<boolean | "">("");

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);

  const { courses, meta, isLoading, error, refetch } = useCourses({
    page,
    limit: 10,
    search: search || undefined,
    category: category || undefined,
    isPremium: isPremium === "" ? undefined : isPremium,
    isActive: isActive === "" ? undefined : isActive,
  });

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDelete = (course: Course) => {
    setDeletingCourse(course);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleFormSuccess = () => {
    refetch();
  };

  const handleDeleteSuccess = () => {
    refetch();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage courses (YouTube videos) for the affiliate dashboard
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-w-[150px]"
        >
          <option value="">All Categories</option>
          {COURSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={isPremium === "" ? "" : String(isPremium)}
          onChange={(e) => {
            setIsPremium(
              e.target.value === "" ? "" : e.target.value === "true",
            );
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-w-[120px]"
        >
          <option value="">All Access</option>
          <option value="true">Premium</option>
          <option value="false">Free</option>
        </select>

        <select
          value={isActive === "" ? "" : String(isActive)}
          onChange={(e) => {
            setIsActive(e.target.value === "" ? "" : e.target.value === "true");
            setPage(1);
          }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white min-w-[120px]"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-5 py-4">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-emerald-600" />
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <CoursesTable
            courses={courses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {meta && <CoursesPagination meta={meta} onPageChange={setPage} />}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <CourseFormModal
          course={editingCourse}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Modal */}
      {deletingCourse && (
        <DeleteConfirmModal
          course={deletingCourse}
          onClose={() => setDeletingCourse(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
