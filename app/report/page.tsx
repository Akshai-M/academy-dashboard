"use client";
import React from "react";
import { User, Phone, Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStudentStore } from "../store/studentStore";

export default function StudentReport() {
  const student = useStudentStore((state) => state.student);

  function getSkillColor(score: string | undefined) {
    if (!score) return "w-0";
    const skillPercentage: Record<string, string> = {
      "1": "w-1/5",
      "2": "w-2/5",
      "3": "w-3/5",
      "4": "w-4/5",
      "5": "w-full",
    };
    const key = String(score)[0];
    return skillPercentage[key] ?? "w-0";
  }

  const getOverallRating = (
    ht: number,
    he: number,
    hm: number,
    hh: number
  ): number => {
    if (!student) return 0;
    if (!ht || !he || !hm || !hh) return 0;
    const rating = Math.round(((ht + he + hm + hh) / 4) * 10) / 10;

    return rating;
  };
  console.log(
    getOverallRating(
      Number(student?.html_css_theory),
      Number(student?.html_coding_easy),
      Number(student?.html_coding_medium),
      Number(student?.html_coding_hard)
    ).toString()
  );

  const router = useRouter();
  function loginPage() {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-6 flex items-center px-4 py-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors"
          onClick={loginPage}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Login
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {student?.candidate_name || "N/A"}
                </h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Phone className="w-4 h-4 mr-2" />
                  {student?.mobile_number || "N/A"}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {student?.candidate_email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Non-Tech Score
            </h3>
            <div className="text-3xl font-bold text-blue-600">
              {student?.fr_project_explanation_rating || "N/A"}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Self Introduction
            </h3>
            <div className="text-sm text-gray-600 line-clamp-3">
              {student?.fr_self_introduction || "N/A"}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Communication
            </h3>
            <div className="text-sm text-gray-600 line-clamp-3">
              {student?.fr_communication || "N/A"}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Strongest Skill
            </h3>
            <div className="text-sm font-medium text-green-600">
              {getOverallRating(
                (student?.html_css_theory &&
                  Number(student?.html_css_theory[0])) ||
                  0,
                (student?.html_coding_easy &&
                  Number(student?.html_coding_easy[0])) ||
                  0,
                (student?.html_coding_medium &&
                  Number(student?.html_coding_medium[0])) ||
                  0,
                (student?.html_coding_hard &&
                  Number(student?.html_coding_hard[0])) ||
                  0
              ) > 4
                ? "HTML & CSS"
                : getOverallRating(
                    (student?.javascript_theory &&
                      Number(student?.javascript_theory[0])) ||
                      0,
                    (student?.javascript_coding_easy &&
                      Number(student?.javascript_coding_easy[0])) ||
                      0,
                    (student?.javascript_coding_medium &&
                      Number(student?.javascript_coding_medium[0])) ||
                      0,
                    (student?.javascript_coding_hard &&
                      Number(student?.javascript_coding_hard[0])) ||
                      0
                  ) > 4
                ? "JavaScript"
                : getOverallRating(
                    (student?.react_theory &&
                      Number(student?.react_theory[0])) ||
                      0,
                    (student?.react_coding_easy &&
                      Number(student?.react_coding_easy[0])) ||
                      0,
                    (student?.react_coding_medium &&
                      Number(student?.react_coding_medium[0])) ||
                      0,
                    (student?.react_coding_hard &&
                      Number(student?.react_coding_hard[0])) ||
                      0
                  ) > 4
                ? "React"
                : getOverallRating(
                    (student?.python_theory &&
                      Number(student?.python_theory[0])) ||
                      0,
                    (student?.python_coding_easy &&
                      Number(student?.python_coding_easy[0])) ||
                      0,
                    (student?.python_coding_medium &&
                      Number(student?.python_coding_medium[0])) ||
                      0,
                    (student?.python_coding_hard &&
                      Number(student?.python_coding_hard[0])) ||
                      0
                  ) > 4
                ? "Python"
                : getOverallRating(
                    (student?.node_theory && Number(student?.node_theory[0])) ||
                      0,
                    (student?.node_coding_easy &&
                      Number(student?.node_coding_easy[0])) ||
                      0,
                    (student?.node_coding_medium &&
                      Number(student?.node_coding_medium[0])) ||
                      0,
                    (student?.node_coding_hard &&
                      Number(student?.node_coding_hard[0])) ||
                      0
                  ) > 4
                ? "Node.js"
                : getOverallRating(
                    (student?.sql_theory && Number(student?.sql_theory[0])) ||
                      0,
                    (student?.sql_coding_easy &&
                      Number(student?.sql_coding_easy[0])) ||
                      0,
                    (student?.sql_coding_medium &&
                      Number(student?.sql_coding_medium[0])) ||
                      0,
                    (student?.sql_coding_hard &&
                      Number(student?.sql_coding_hard[0])) ||
                      0
                  ) > 4
                ? "SQL"
                : "No strong skills"}
            </div>
          </div>
        </div>

        {/* Skills Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              HTML & CSS
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium text-blue-900`}>
                    React Theory
                  </span>
                  <div>
                    <span
                      className={` ${
                        student?.html_css_theory &&
                        Number(student?.html_css_theory[0]) >= 4.5
                          ? "bg-green-100/90"
                          : student?.html_css_theory &&
                            Number(student?.html_css_theory[0]) >= 3.5
                          ? "bg-blue-100/90"
                          : student?.html_css_theory &&
                            Number(student?.html_css_theory[0])
                          ? "bg-yellow-100/90"
                          : "bg-red-100/90"
                      }
                          ${
                            student?.html_css_theory &&
                            Number(student?.html_css_theory[0]) >= 4.5
                              ? "text-green-600"
                              : student?.html_css_theory &&
                                Number(student?.html_css_theory[0]) >= 3.5
                              ? "text-blue-600"
                              : student?.html_css_theory &&
                                Number(student?.html_css_theory[0])
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                          px-2 py-1 rounded text-xs font-medium }`}
                    >
                      {student?.html_css_theory?.slice(3)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium }`}>
                      {student?.html_css_theory &&
                        Number(student?.html_css_theory?.[0])}
                      /5
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(
                      student?.html_css_theory
                    )} ${
                      student?.html_css_theory &&
                      Number(student?.html_css_theory[0]) >= 4.5
                        ? "bg-green-500"
                        : student?.html_css_theory &&
                          Number(student?.html_css_theory[0]) >= 3.5
                        ? "bg-blue-500"
                        : student?.html_css_theory &&
                          Number(student?.html_css_theory[0])
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium text-blue-900`}>
                    React Easy
                  </span>
                  <div>
                    <span
                      className={` ${
                        student?.html_coding_easy &&
                        Number(student?.html_coding_easy[0]) >= 4.5
                          ? "bg-green-100/90"
                          : student?.html_coding_easy &&
                            Number(student?.html_coding_easy[0]) >= 3.5
                          ? "bg-blue-100/90"
                          : student?.html_coding_easy &&
                            Number(student?.html_coding_easy[0])
                          ? "bg-yellow-100/90"
                          : "bg-red-100/90"
                      }
                          ${
                            student?.html_coding_easy &&
                            Number(student?.html_coding_easy[0]) >= 4.5
                              ? "text-green-600"
                              : student?.html_coding_easy &&
                                Number(student?.html_coding_easy[0]) >= 3.5
                              ? "text-blue-600"
                              : student?.html_coding_easy &&
                                Number(student?.html_coding_easy[0])
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                          px-2 py-1 rounded text-xs font-medium }`}
                    >
                      {student?.html_coding_easy?.slice(3)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium }`}>
                      {student?.html_coding_easy &&
                        Number(student?.html_coding_easy?.[0])}
                      /5
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(
                      student?.html_coding_easy
                    )} ${
                      student?.html_coding_easy &&
                      Number(student?.html_coding_easy[0]) >= 4.5
                        ? "bg-green-500"
                        : student?.html_coding_easy &&
                          Number(student?.html_coding_easy[0]) >= 3.5
                        ? "bg-blue-500"
                        : student?.html_coding_easy &&
                          Number(student?.html_coding_easy[0])
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium text-blue-900`}>
                    React Medium
                  </span>
                  <div>
                    <span
                      className={` ${
                        student?.html_coding_medium &&
                        Number(student?.html_coding_medium[0]) >= 4.5
                          ? "bg-green-100/90"
                          : student?.html_coding_medium &&
                            Number(student?.html_coding_medium[0]) >= 3.5
                          ? "bg-blue-100/90"
                          : student?.html_coding_medium &&
                            Number(student?.html_coding_medium[0])
                          ? "bg-yellow-100/90"
                          : "bg-red-100/90"
                      }
                          ${
                            student?.html_coding_medium &&
                            Number(student?.html_coding_medium[0]) >= 4.5
                              ? "text-green-600"
                              : student?.html_coding_medium &&
                                Number(student?.html_coding_medium[0]) >= 3.5
                              ? "text-blue-600"
                              : student?.html_coding_medium &&
                                Number(student?.html_coding_medium[0])
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                          px-2 py-1 rounded text-xs font-medium }`}
                    >
                      {student?.html_coding_medium?.slice(3)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium }`}>
                      {student?.html_coding_medium &&
                        Number(student?.html_coding_medium?.[0])}
                      /5
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(
                      student?.html_coding_medium
                    )} ${
                      student?.html_coding_medium &&
                      Number(student?.html_coding_medium[0]) >= 4.5
                        ? "bg-green-500"
                        : student?.html_coding_medium &&
                          Number(student?.html_coding_medium[0]) >= 3.5
                        ? "bg-blue-500"
                        : student?.html_coding_medium &&
                          Number(student?.html_coding_medium[0])
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium text-blue-900`}>
                    React Hard
                  </span>
                  <div>
                    <span
                      className={` ${
                        student?.html_coding_hard &&
                        Number(student?.html_coding_hard[0]) >= 4.5
                          ? "bg-green-100/90"
                          : student?.html_coding_hard &&
                            Number(student?.html_coding_hard[0]) >= 3.5
                          ? "bg-blue-100/90"
                          : student?.html_coding_hard &&
                            Number(student?.html_coding_hard[0])
                          ? "bg-yellow-100/90"
                          : "bg-red-100/90"
                      }
                          ${
                            student?.html_coding_hard &&
                            Number(student?.html_coding_hard[0]) >= 4.5
                              ? "text-green-600"
                              : student?.html_coding_hard &&
                                Number(student?.html_coding_hard[0]) >= 3.5
                              ? "text-blue-600"
                              : student?.html_coding_hard &&
                                Number(student?.html_coding_hard[0])
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                          px-2 py-1 rounded text-xs font-medium }`}
                    >
                      {student?.html_coding_hard?.slice(3)}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium }`}>
                      {student?.html_coding_hard &&
                        Number(student?.html_coding_hard?.[0])}
                      /5
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillColor(
                      student?.html_coding_hard
                    )} ${
                      student?.html_coding_hard &&
                      Number(student?.html_coding_hard[0]) >= 4.5
                        ? "bg-green-500"
                        : student?.html_coding_hard &&
                          Number(student?.html_coding_hard[0]) >= 3.5
                        ? "bg-blue-500"
                        : student?.html_coding_hard &&
                          Number(student?.html_coding_hard[0])
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`p-3 rounded-lg bg-blue-50 border border-blue-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium text-blue-900`}>
                    React Overall Rating
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium }`}>
                    {getOverallRating(
                      (student?.html_css_theory &&
                        Number(student?.html_css_theory[0])) ||
                        0,
                      (student?.html_coding_easy &&
                        Number(student?.html_coding_easy[0])) ||
                        0,
                      (student?.html_coding_medium &&
                        Number(student?.html_coding_medium[0])) ||
                        0,
                      (student?.html_coding_hard &&
                        Number(student?.html_coding_hard[0])) ||
                        0
                    )}
                    /5
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 
                      ${getSkillColor(
                        Math.round(
                          getOverallRating(
                            (student?.html_css_theory &&
                              Number(student?.html_css_theory[0])) ||
                              0,
                            (student?.html_coding_easy &&
                              Number(student?.html_coding_easy[0])) ||
                              0,
                            (student?.html_coding_medium &&
                              Number(student?.html_coding_medium[0])) ||
                              0,
                            (student?.html_coding_hard &&
                              Number(student?.html_coding_hard[0])) ||
                              0
                          )
                        ).toString()
                      )}
                    ${
                      getOverallRating(
                        (student?.html_css_theory &&
                          Number(student?.html_css_theory[0])) ||
                          0,
                        (student?.html_coding_easy &&
                          Number(student?.html_coding_easy[0])) ||
                          0,
                        (student?.html_coding_medium &&
                          Number(student?.html_coding_medium[0])) ||
                          0,
                        (student?.html_coding_hard &&
                          Number(student?.html_coding_hard[0])) ||
                          0
                      ) >= 4
                        ? "bg-blue-500"
                        : getOverallRating(
                            (student?.html_css_theory &&
                              Number(student?.html_css_theory[0])) ||
                              0,
                            (student?.html_coding_easy &&
                              Number(student?.html_coding_easy[0])) ||
                              0,
                            (student?.html_coding_medium &&
                              Number(student?.html_coding_medium[0])) ||
                              0,
                            (student?.html_coding_hard &&
                              Number(student?.html_coding_hard[0])) ||
                              0
                          ) >= 3
                        ? "bg-yellow-500"
                        : getOverallRating(
                            (student?.html_css_theory &&
                              Number(student?.html_css_theory[0])) ||
                              0,
                            (student?.html_coding_easy &&
                              Number(student?.html_coding_easy[0])) ||
                              0,
                            (student?.html_coding_medium &&
                              Number(student?.html_coding_medium[0])) ||
                              0,
                            (student?.html_coding_hard &&
                              Number(student?.html_coding_hard[0])) ||
                              0
                          ) >= 1
                        ? "bg-red-500"
                        : "bg-red-500"
                    } 
                    
                    `}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Frontend Interview Feedback
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              {student?.frontend_feedback || "N/A"}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Backend Interview Feedback
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed">
              {student?.backend_feedback || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
