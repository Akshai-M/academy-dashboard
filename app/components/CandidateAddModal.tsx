"use client";

import React, { useState } from "react";
import { User, Calendar as CalendarIcon, CircleX } from "lucide-react";
import { Candidate } from "../types/candidate";
import axios from "axios";
import Calendar24 from "../../components/DateAndTime";
import DropdownMenuRadioGroupDemo from "../../components/Dropdown";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"


interface CandidateAddModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

type Checked = DropdownMenuCheckboxItemProps["checked"]


export default function CandidateAddModal({
  isModalOpen,
  setIsModalOpen,
}: CandidateAddModalProps) {
  
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [formData, setFormData] = useState<Candidate>({
    user_id: "",
    candidate_name: "",
    mobile_number: "",
    candidate_email: "",
    candidate_resume_link: "",
    placement_status: "",
    frontend_interview_date: "",
    frontend_time_slot: "",
    backend_interview_date: "",
    backend_time_slot: "",
    interview_status: "Scheduled",
    meeting_link: "",
  });

  const [frontendDate, setFrontendDate] = useState<Date | undefined>();
  const [frontendTime, setFrontendTime] = useState("10:00");
  const [backendDate, setBackendDate] = useState<Date | undefined>();
  const [backendTime, setBackendTime] = useState("10:00");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (field: keyof Candidate, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        frontend_interview_date: frontendDate
          ? frontendDate.toISOString().split("T")[0]
          : null,
        frontend_time_slot: frontendTime,
        backend_interview_date: backendDate
          ? backendDate.toISOString().split("T")[0]
          : null,
        backend_time_slot: backendTime,
      };

      const response = await axios.post("/api/addStudent", payload);

      if (response.status === 201) {
        setMessage("Candidate created successfully!");
        setFormData({
          user_id: "",
          candidate_name: "",
          mobile_number: "",
          candidate_email: "",
          candidate_resume_link: "",
          placement_status: "",
          frontend_interview_date: "",
          frontend_time_slot: "",
          backend_interview_date: "",
          backend_time_slot: "",
          interview_status: "Scheduled",
          meeting_link: "",
        });
        setFrontendDate(undefined);
        setBackendDate(undefined);
        setFrontendTime("10:00");
        setBackendTime("10:00");
        setIsModalOpen(false);
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Candidate</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <CircleX className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          

          
            <div>
              <label>Meeting Link</label>
              <input
                type="url"
                value={formData.meeting_link}
                onChange={e => handleInputChange("meeting_link", e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

          {message && <div className="p-2 bg-green-100 text-green-800">{message}</div>}

         
        </form>
      </div>
    </div>
  );
}
