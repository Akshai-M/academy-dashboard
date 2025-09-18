'use client'
import React, { useState } from 'react';
import { Phone, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useStudentStore } from './store/studentStore';


interface LoginFormProps {
  onLogin: (mobile: string, userType: 'student' | 'admin') => void;
}

export default function LoginForm() {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const MOBILE_NUMBER = process.env.NEXT_PUBLIC_MOBILE_NUMBER
  const ADMIN_NUMBER = process.env.NEXT_PUBLIC_ADMIN_NUMBER
  const router = useRouter()
  const { setStudent } = useStudentStore();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const res = await axios.post('/api/data', { mobile });

    if (res.status === 200) {
      setStudent(res.data);
      router.push('/students')
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      setError('No record found for this mobile number.');
    } else {
      setError('Something went wrong. Try again.');
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Enter your registered mobile number to continue</p>
        </div>

        
      </div>
    </div>
  );
}