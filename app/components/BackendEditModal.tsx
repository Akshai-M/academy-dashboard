"use client";
import React, { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import { CandidatePatchData } from "../types/candidate";
import Modal from "./Modal";
import { useModal } from "../modalContext";
import Navbar from "./Navbar";
import axios from "axios";

const initialBackendFormData: CandidatePatchData = {
  be_self_introduction: "",
  be_communication: "",
  python_theory: "",
  python_coding_easy: "",
  python_coding_medium: "",
  python_coding_hard: "",
  python_overall_rating: 0,
  node_theory: "",
  node_coding_easy: "",
  node_coding_medium: "",
  node_coding_hard: "",
  node_overall_rating: 0,
  sql_theory: "",
  sql_coding_easy: "",
  sql_coding_medium: "",
  sql_coding_hard: "",
  sql_overall_rating: 0,
  backend_feedback: "",
};

interface BackendEditModalProps {
  candidate?: CandidatePatchData | null;
  onClose?: () => void;
  onSave?: (data: CandidatePatchData) => void;
}

export default function BackendEditModal({
  candidate,
  onSave,
}: BackendEditModalProps) {
  const { currentModal, closeModal } = useModal();
  const [formData, setFormData] = useState<CandidatePatchData>(
    initialBackendFormData
  );
  const [originalData, setOriginalData] =
    useState<CandidatePatchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isOpen = currentModal === "backend" && !!candidate;

  
  useEffect(() => {
    if (candidate) {
      setFormData({
        be_self_introduction: candidate.be_self_introduction || "",
        be_communication: candidate.be_communication || "",
        python_theory: candidate.python_theory || "",
        python_coding_easy: candidate.python_coding_easy || "",
        python_coding_medium: candidate.python_coding_medium || "",
        python_coding_hard: candidate.python_coding_hard || "",
        python_overall_rating: candidate.python_overall_rating || 0,
        node_theory: candidate.node_theory || "",
        node_coding_easy: candidate.node_coding_easy || "",
        node_coding_medium: candidate.node_coding_medium || "",
        node_coding_hard: candidate.node_coding_hard || "",
        node_overall_rating: candidate.node_overall_rating || 0,
        sql_theory: candidate.sql_theory || "",
        sql_coding_easy: candidate.sql_coding_easy || "",
        sql_coding_medium: candidate.sql_coding_medium || "",
        sql_coding_hard: candidate.sql_coding_hard || "",
        sql_overall_rating: candidate.sql_overall_rating || 0,
        backend_feedback: candidate.backend_feedback || "",
      });
      setOriginalData(candidate);
    } else {
      setFormData(initialBackendFormData);
      setOriginalData(null);
    }
    setMessage("");
  }, [candidate]);

  const handleInputChange = (
    field: keyof CandidatePatchData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate?.user_id) {
      setMessage("User ID missing.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
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

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-opacity-50 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
            <Navbar />
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-400 cursor-pointer"
            >
              <CircleX className="w-6 h-6" />
            </button>
          </div>


          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="space-y-6">
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-gray-800 border-b pb-2">
                  Non-Technical
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderSelect("Self Introduction", "be_self_introduction")}
                  {renderSelect("Communication", "be_communication")}
                </div>
              </div>

              


              
            </div>


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


           
          </form>
        </div>
      </div>
    </Modal>
  );
}
