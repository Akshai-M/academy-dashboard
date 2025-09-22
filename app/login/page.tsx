"use client";
import React, { useState } from "react";
import { Phone, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useStudentStore } from "../store/studentStore";

export default function LoginForm() {
  

  
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">
            Enter your registered mobile number to continue
          </p>
        </div>

        
      </div>
    </div>
  );
}
