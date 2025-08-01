'use client'
import React from 'react';
import { User, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStudentStore } from '../store/studentStore';



export default function StudentReport() {
  const  student  = useStudentStore((state) => state.student)
  
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
 const skillSections = [
    {
      title: 'Frontend Skills',
      skills: [
        { name: 'HTML & CSS Theory', score: getStudentData(student, 'html_css_theory') },
        { name: 'HTML Coding Easy', score: getStudentData(student, 'html_coding_easy') },
        { name: 'HTML Coding Medium', score: getStudentData(student, 'html_coding_medium') },
        { name: 'HTML Coding Hard', score: getStudentData(student, 'html_coding_hard') },
        { name: 'HTML Overall Rating', score: getStudentData(student, 'html_coding_overall_rating'), isOverall: true },
      ]
    },
    {
      title: 'JavaScript',
      skills: [
        { name: 'JavaScript Theory', score: getStudentData(student, 'javascript_theory') },
        { name: 'JavaScript Easy', score: getStudentData(student, 'javascript_coding_easy') },
        { name: 'JavaScript Medium', score: getStudentData(student, 'javascript_coding_medium') },
        { name: 'JavaScript Hard', score: getStudentData(student, 'javascript_coding_hard') },
        { name: 'JavaScript Overall', score: getStudentData(student, 'javascript_overall_rating'), isOverall: true },
      ]
    },
    {
      title: 'React',
      skills: [
        { name: 'React Theory', score: getStudentData(student, 'react_theory') },
        { name: 'React Easy', score: getStudentData(student, 'react_coding_easy') },
        { name: 'React Medium', score: getStudentData(student, 'react_coding_medium') },
        { name: 'React Hard', score: getStudentData(student, 'react_coding_hard') },
        { name: 'React Overall', score: getStudentData(student, 'react_overall_rating'), isOverall: true },
      ]
    },
    {
      title: 'Backend Skills',
      skills: [
        { name: 'Python Theory', score: getStudentData(student, 'python_theory') },
        { name: 'Python Easy', score: getStudentData(student, 'python_coding_easy') },
        { name: 'Python Medium', score: getStudentData(student, 'python_coding_medium') },
        { name: 'Python Hard', score: getStudentData(student, 'python_coding_hard') },
        { name: 'Python Overall', score: getStudentData(student, 'python_overall_rating'), isOverall: true },
      ]
    },
    {
      title: 'Node.js',
      skills: [
        { name: 'Node Theory', score: getStudentData(student, 'node_theory') },
        { name: 'Node Easy', score: getStudentData(student, 'node_coding_easy') },
        { name: 'Node Medium', score: getStudentData(student, 'node_coding_medium') },
        { name: 'Node Hard', score: getStudentData(student, 'node_coding_hard') },
        { name: 'Node Overall', score: getStudentData(student, 'node_overall_rating'), isOverall: true },
      ]
    },
    {
      title: 'Database',
      skills: [
        { name: 'SQL Theory', score: getStudentData(student, 'sql_theory') },
        { name: 'SQL Easy', score: getStudentData(student, 'sql_coding_easy') },
        { name: 'SQL Medium', score: getStudentData(student, 'sql_coding_medium') },
        { name: 'SQL Hard', score: getStudentData(student, 'sql_coding_hard') },
        { name: 'SQL Overall', score: getStudentData(student, 'sql_overall_rating'), isOverall: true },
      ]
    }
  ];

  const getScoreColor = (score: string) => {
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return 'text-gray-600 bg-gray-50'; // Handle non-numeric scores
    if (numScore >= 4.5) return 'text-green-600 bg-green-50';
    if (numScore >= 3.5) return 'text-blue-600 bg-blue-50';
    if (numScore >= 2.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreWidth = (score: string) => {
    const numScore = parseFloat(score);
    if (isNaN(numScore)) return '0%'; // Handle non-numeric scores
    return `${(numScore / 5) * 100}%`;
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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{student?.candidate_name || 'N/A'}</h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Phone className="w-4 h-4 mr-2" />
                  {student?.mobile_number || 'N/A'}
                </p>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {student?.candidate_email || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Tech Score</h3>
            <div className="text-3xl font-bold text-blue-600">{student?.final_non_tech_score || 'N/A'}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Self Introduction</h3>
            <div className="text-sm text-gray-600 line-clamp-3">{student?.self_introduction || 'N/A'}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
            <div className="text-sm text-gray-600 line-clamp-3">{student?.communication || 'N/A'}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Strongest Skill</h3>
            <div className="text-sm font-medium text-green-600">{student?.strongest_skill || 'N/A'}</div>
          </div>
        </div>

        {/* Skills Assessment */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(skill.score.toString())}`}>
                          {skill.score}/5
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            parseFloat(skill.score.toString()) >= 4.5 ? 'bg-green-500' :
                            parseFloat(skill.score.toString()) >= 3.5 ? 'bg-blue-500' :
                            parseFloat(skill.score.toString()) >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: getScoreWidth(skill.score.toString()) }}
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div> */}

        {/* Feedback Section */}
        
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Interviewer Feedback</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">{student?.final_feedback || 'N/A'}</p>
            </div>
          </div>
      </div>
    </div>
  );
}
