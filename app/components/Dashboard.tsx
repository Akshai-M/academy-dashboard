// import "./app/globals.css"
import { Calendar, Download, Eye, Filter, LogOut, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function Dashboard(){

  const [statusFilter, setStatusFilter] = useState<String>('all')
    return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Interview Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage candidate interviews and assessments</p>
            </div>
            
          </div>
        </div>
      </div>

      

     

      

      

      
    </div>
  );
}