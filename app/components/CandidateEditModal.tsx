"use client";
import React, { useState, useEffect } from "react";
import { CircleX } from "lucide-react";
import axios from "axios";

import { Candidate, CandidatePatchData } from "../types/candidate";
import Modal from "./Modal";
import { useModal } from "../modalContext";
import Navbar from "./Navbar";
import Calendar24 from "../../components/DateAndTime";
import DropdownMenuRadioGroupDemo from "app/components/Dropdown";
import PlacedDropDown from "app/components/PlacedDropDown";

interface CandidateEditModalProps {
  candidate?: CandidatePatchData | null;
  onClose?: () => void;
  onSave?: (data: CandidatePatchData) => void;
}

const initialFormData: CandidatePatchData = {
  user_id: "",
  candidate_name: "",
  mobile_number: "",
  candidate_email: "",
  candidate_resume_link: "",
  placement_status: "Pending",
  frontend_interview_date: "",
  frontend_time_slot: "",
  backend_interview_date: "",
  backend_time_slot: "",
  interview_status: "Scheduled",
  meeting_link: "",
  company: ""
};

export default function CandidateEditModal({ candidate }: CandidateEditModalProps) {
  const { currentModal, closeModal } = useModal();

  const [formData, setFormData] = useState<Candidate>(initialFormData);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState<CandidatePatchData | null>(null);

  const [frontendDate, setFrontendDate] = useState<Date | undefined>();
  const [frontendTime, setFrontendTime] = useState("10:00");
  const [backendDate, setBackendDate] = useState<Date | undefined>();
  const [backendTime, setBackendTime] = useState("10:00");

  const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    const datePart = dateString.split("T")[0];
    const date = new Date(datePart);
    return isNaN(date.getTime()) ? undefined : date;
  };

  useEffect(() => {
    if (candidate) {
      

      setOriginalData(candidate);
      setFrontendDate(parseDate(candidate.frontend_interview_date));
      setFrontendTime(candidate.frontend_time_slot || "10:00");
      setBackendDate(parseDate(candidate.backend_interview_date));
      setBackendTime(candidate.backend_time_slot || "10:00");
    } else {
      setFormData(initialFormData);
      setOriginalData(initialFormData);
    }
  }, [candidate]);

  const handleInputChange = (field: keyof Candidate, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.user_id) {
      setMessage("User ID is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    
  };

  const isOpen = currentModal === "candidate" && !!candidate;
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
            <Navbar />
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-400 cursor-pointer"
            >
              <CircleX className="w-6 h-6" />
            </button>
          </div>


          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">UID *</label>
                <input
                  required
                  type="text"
                  value={formData.user_id}
                  onChange={(e) => handleInputChange("user_id", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  required
                  type="text"
                  value={formData.candidate_name}
                  onChange={(e) => handleInputChange("candidate_name", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              

              <div>
                <label className="block text-sm font-medium text-gray-700">Resume Link</label>
                <input
                  type="url"
                  value={formData.candidate_resume_link}
                  onChange={(e) => handleInputChange("candidate_resume_link", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
              <div className="flex gap-2">
                

            {message && (
              <div className="p-2 bg-green-100 text-green-800 rounded-md">
                {message}
              </div>
            )}

            
          </form>
        </div>
      </div>
    </Modal>
  );
}
