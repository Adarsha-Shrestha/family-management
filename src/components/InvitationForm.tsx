import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useFamilyContext } from '../context/FamilyContext';

export const InvitationForm: React.FC = () => {
  const { families, sendInvitation } = useFamilyContext();
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFamilies.length > 0) {
      sendInvitation(selectedFamilies);
      setSelectedFamilies([]);
    }
  };

  const toggleFamily = (familyId: string) => {
    setSelectedFamilies((prev) =>
      prev.includes(familyId)
        ? prev.filter((id) => id !== familyId)
        : [...prev, familyId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {families.map((family) => (
          <div
            key={family.id}
            className={`p-4 rounded-lg shadow-md cursor-pointer transition-colors ${
              selectedFamilies.includes(family.id)
                ? 'ring-2 ring-indigo-500'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => toggleFamily(family.id)}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFamilies.includes(family.id)}
                onChange={() => toggleFamily(family.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <h3 className="text-lg font-semibold" style={{ color: family.color }}>
                {family.headName}'s Family
              </h3>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={selectedFamilies.length === 0}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5 mr-2" />
        Send Invitations
      </button>
    </form>
  );
};