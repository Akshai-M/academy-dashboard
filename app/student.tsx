'use client'
import React from 'react';
import { User, Calendar, Clock, Phone, Mail, ExternalLink, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';



export default function StudentReport() {
  const skillSections = [
    {
      title: 'Frontend Skills',
      skills: [
        { name: 'HTML & CSS Theory', score: "ok" },
        { name: 'HTML Coding Easy', score: "ok" },
        { name: 'HTML Coding Medium', score: "ok" },
        { name: 'HTML Coding Hard', score: "ok" },
        { name: 'HTML Overall Rating', score: "ok", isOverall: true },
      ]
    },
    {
      title: 'JavaScript',
      skills: [
        { name: 'JavaScript Theory', score: "ok" },
        { name: 'JavaScript Easy', score: "ok" },
        { name: 'JavaScript Medium', score: "ok" },
        { name: 'JavaScript Hard', score: "ok" },
        { name: 'JavaScript Overall', score: "ok", isOverall: true },
      ]
    },
    {
      title: 'React',
      skills: [
        { name: 'React Theory', score: "ok" },
        { name: 'React Easy', score: "ok" },
        { name: 'React Medium', score: "ok" },
        { name: 'React Hard', score: "ok" },
        { name: 'React Overall', score: "ok", isOverall: true },
      ]
    },
    {
      title: 'Backend Skills',
      skills: [
        { name: 'Python Theory', score: "ok" },
        { name: 'Python Easy', score: "ok"},
        { name: 'Python Medium', score: "ok" },
        { name: 'Python Hard', score: "ok" },
        { name: 'Python Overall', score: "ok", isOverall: true },
      ]
    },
    {
      title: 'Node.js',
      skills: [
        { name: 'Node Theory', score: "ok" },
        { name: 'Node Easy', score: "ok" },
        { name: 'Node Medium', score: "ok" },
        { name: 'Node Hard', score: "ok" },
        { name: 'Node Overall', score: "ok", isOverall: true },
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'SQL Theory', score: "ok" },
        { name: 'SQL Easy', score: "ok" },
        { name: 'SQL Medium', score: "ok" },
        { name: 'SQL Hard', score: "ok" },
        { name: 'SQL Overall', score: "ok", isOverall: true },
      ]
    }
  ];

  const getScoreColor = (score: string) => {
    const numScore = parseFloat(score);
    if (numScore >= 4.5) return 'text-green-600 bg-green-50';
    if (numScore >= 3.5) return 'text-blue-600 bg-blue-50';
    if (numScore >= 2.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreWidth = (score: string) => {
    const numScore = parseFloat(score);
    return `${(numScore / 5) * 100}%`;
  };

  const router = useRouter()
  function loginPage(){
    router.push('/')
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
                <h1 className="text-3xl font-bold text-gray-900">{"ok"}</h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Phone className="w-4 h-4 mr-2" />
                  {"ok"}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {"ok"}
                </p>
              </div>
            </div>
            {/* <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              "ok" === 'Completed' ? 'bg-green-100 text-green-800' :
              "ok" === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {"ok"}
            </div> */}
          </div>

          {/* Interview Details */}
          
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Tech Score</h3>
            <div className="text-3xl font-bold text-blue-600">{"ok"}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Self Introduction</h3>
            <div className="text-sm text-gray-600 line-clamp-3">{"Includes relevant details and provides a good overviIncludes relevant details and provides a good overviIncludes relevant details and provides a good overviIncludes relevant details and provides a good overvi"}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
            <div className="text-sm text-gray-600 line-clamp-3">{"ok"}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Strongest Skill</h3>
            <div className="text-sm font-medium text-green-600">{"ok"}</div>
          </div>
        </div>

        {/* Skills Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{section.title}</h3>
              <div className="space-y-4">
                {section.skills.map((skill, skillIndex) => (
                  skill.score && (
                    <div key={skillIndex} className={`p-3 rounded-lg ${skill.isOverall ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${skill.isOverall ? 'text-blue-900' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(skill.score)}`}>
                          {skill.score}/5
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            parseFloat(skill.score) >= 4.5 ? 'bg-green-500' :
                            parseFloat(skill.score) >= 3.5 ? 'bg-blue-500' :
                            parseFloat(skill.score) >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: getScoreWidth(skill.score) }}
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        {/* {"ok" && (
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Interviewer Feedback</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">{"ok".finalFeedbackFromInterviewer}</p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}