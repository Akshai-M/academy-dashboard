'use client'
import React from 'react';
import { User, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStudentStore } from '../store/studentStore';



export default function StudentReport() {
  const  student  = useStudentStore((state) => state.student)
  const skillColor = {
    "1": "red",
    "2": "red",
    "3": "yellow",
    "4": "blue",
  "5": "green"
  }
  
 






  const router = useRouter();
  function loginPage() {
    router.push('/');
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
       

        {/* Performance Overview */}
       

        {/* Skills Assessment */}
        

        {/* Feedback Section */}
        
          
      </div>
    </div>
  );
}
