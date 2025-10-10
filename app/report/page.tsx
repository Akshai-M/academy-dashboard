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
  
  const getStudentData = (student, key) => {
  if (!student) return 'N/A';
  // Standardize key to match student object properties
  const standardizedKey = key
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/&/g, '')
    .replace('html_&_css_theory', 'html_css_theory') // Special case for HTML & CSS
    .replace('html_overall_rating', 'html_coding_overall_rating')
    .replace('javascript_overall', 'javascript_overall_rating')
    .replace('react_overall', 'react_overall_rating')
    .replace('python_overall', 'python_overall_rating')
    .replace('node_overall', 'node_overall_rating')
    .replace('sql_overall', 'sql_overall_rating');

  return student[standardizedKey] || 'N/A';
};






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
