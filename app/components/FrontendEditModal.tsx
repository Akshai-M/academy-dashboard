"use client";
import React, { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { CandidatePatchData } from "../types/candidate";
import Modal from "./Modal";
import { useModal } from "../modalContext";
import Navbar from "./Navbar";
import axios from "axios";

interface FrontendEditModalProps {
  candidate?: CandidatePatchData | null;
  onClose?: () => void;
  onSave?: (data: CandidatePatchData) => void;
}

export default function FrontendEditModal({
  candidate,
  onSave,
}: FrontendEditModalProps) {
  const { currentModal, closeModal } = useModal();

  // ---------- INITIAL STATE ----------
  const initialFrontendFormData: CandidatePatchData = {
    fr_self_introduction: "",
    fr_communication: "",
    html_css_theory: "",
    html_coding_easy: "",
    html_coding_medium: "",
    html_coding_hard: "",
    javascript_theory: "",
    javascript_coding_easy: "",
    javascript_coding_medium: "",
    javascript_coding_hard: "",
    react_theory: "",
    react_coding_easy: "",
    react_coding_medium: "",
    react_coding_hard: "",
    frontend_feedback: "",
  };

  const [formData, setFormData] = useState<CandidatePatchData>(initialFrontendFormData);
  const [originalData, setOriginalData] = useState<CandidatePatchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------- EFFECT ----------
  useEffect(() => {
    if (candidate) {
      setFormData({
        fr_self_introduction: candidate.fr_self_introduction || "",
        fr_communication: candidate.fr_communication || "",
        html_css_theory: candidate.html_css_theory || "",
        html_coding_easy: candidate.html_coding_easy || "",
        html_coding_medium: candidate.html_coding_medium || "",
        html_coding_hard: candidate.html_coding_hard || "",
        javascript_theory: candidate.javascript_theory || "",
        javascript_coding_easy: candidate.javascript_coding_easy || "",
        javascript_coding_medium: candidate.javascript_coding_medium || "",
        javascript_coding_hard: candidate.javascript_coding_hard || "",
        react_theory: candidate.react_theory || "",
        react_coding_easy: candidate.react_coding_easy || "",
        react_coding_medium: candidate.react_coding_medium || "",
        react_coding_hard: candidate.react_coding_hard || "",
        frontend_feedback: candidate.frontend_feedback || "",
      });
      setOriginalData(candidate);
    } else {
      setFormData(initialFrontendFormData);
      setOriginalData(null);
    }
    setMessage("");
  }, [candidate]);

  // ---------- INPUT CHANGE ----------
  const handleInputChange = (
    field: keyof CandidatePatchData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ---------- PATCH ONLY CHANGED FIELDS ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate?.user_id) {
      setMessage("User ID missing.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Compare formData with originalData → keep only changed keys
         const changedFields: Partial<CandidatePatchData> = {};
      (Object.keys(formData) as Array<keyof CandidatePatchData>).forEach((key) => {
        if (formData[key] !== originalData?.[key]) {
          (changedFields as Record<string, string | number | undefined>)[key] = formData[key];
        }
      });

      if (Object.keys(changedFields).length === 0) {
        setMessage("No changes detected.");
        setLoading(false);
        return;
      }

      const res = await axios.patch(`/api/addStudent/${candidate.user_id}`, changedFields);

      if (res.status === 200) {
        setMessage("Changes saved successfully!");
        onSave?.(res.data.updated);
        setTimeout(() => closeModal(), 1200);
      } else {
        setMessage("Failed to update candidate details.");
      }
    } catch (error) {
      console.error("Error updating candidate:", error);
      setMessage("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- RENDER ----------
  const isOpen = currentModal === "frontend" && !!candidate;
  if (!isOpen) return null;

  const selectOptions = [
    "1. Lacks basic details and context",
    "2. Basic introduction with limited details.",
    "3. Clear introduction with minimal details.",
    "4. Includes relevant details and provides a good overview",
    "5. Well-organized, engaging, and detailed introduction.",
  ];

  const renderSelect = (label: string, field: keyof CandidatePatchData) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={formData[field] || ""}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
      >
        <option value="">Select rating...</option>
        {selectOptions.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-opacity-50 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
            <Navbar />
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-400">
              <CircleX className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* --- FORM CONTENT --- */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-800 border-b pb-2">Non-Technical</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderSelect("Self Introduction", "fr_self_introduction")}
                  {renderSelect("Communication", "fr_communication")}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-800 border-b pb-2">Technical</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {renderSelect("HTML & CSS Theory", "html_css_theory")}
                  {renderSelect("HTML & CSS Easy", "html_coding_easy")}
                  {renderSelect("HTML & CSS Medium", "html_coding_medium")}
                  {renderSelect("HTML & CSS Hard", "html_coding_hard")}
                  {renderSelect("JavaScript Theory", "javascript_theory")}
                  {renderSelect("JavaScript Easy", "javascript_coding_easy")}
                  {renderSelect("JavaScript Medium", "javascript_coding_medium")}
                  {renderSelect("JavaScript Hard", "javascript_coding_hard")}
                  {renderSelect("React Theory", "react_theory")}
                  {renderSelect("React Easy", "react_coding_easy")}
                  {renderSelect("React Medium", "react_coding_medium")}
                  {renderSelect("React Hard", "react_coding_hard")}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frontend Final Feedback
                </label>
                <textarea
                  value={formData.frontend_feedback || ""}
                  onChange={(e) => handleInputChange("frontend_feedback", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Enter feedback"
                />
              </div>
            </div>

            {/* --- STATUS MESSAGE --- */}
            {message && (
              <div
                className={`p-3 rounded-md ${
                  message.includes("success")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            {/* --- ACTIONS --- */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
