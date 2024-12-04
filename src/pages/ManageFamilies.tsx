import React from 'react';
import { Users } from 'lucide-react';
import { AddFamilyForm } from '../components/AddFamilyForm';
import { FamilyList } from '../components/FamilyList';

export const ManageFamilies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-2 mb-8">
        <Users className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Manage Families</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Family</h2>
            <AddFamilyForm />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Family List</h2>
            <FamilyList />
          </div>
        </div>
      </div>
    </div>
  );
};