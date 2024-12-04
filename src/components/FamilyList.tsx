import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import { useFamilyContext } from '../context/FamilyContext';
import { Family, FamilyMember } from '../types/Family';
import { EditFamilyModal } from './EditFamilyModal';

const MemberCard: React.FC<{ member: FamilyMember; color: string }> = ({ member, color }) => (
  <div className="p-3 bg-white rounded-lg shadow-sm">
    <h4 className="font-medium" style={{ color }}>
      {member.name}
    </h4>
    <p className="text-sm text-gray-600">{member.relationship}</p>
    {member.email && (
      <p className="text-sm text-gray-500">
        Email: {member.email}
      </p>
    )}
    {member.phone && (
      <p className="text-sm text-gray-500">
        Phone: {member.phone}
      </p>
    )}
  </div>
);

export const FamilyList: React.FC = () => {
  const { families, removeFamily, updateFamily } = useFamilyContext();
  const [expandedFamilies, setExpandedFamilies] = useState<string[]>([]);
  const [editingFamily, setEditingFamily] = useState<Family | null>(null);

  const toggleFamily = (familyId: string) => {
    setExpandedFamilies((prev) =>
      prev.includes(familyId)
        ? prev.filter((id) => id !== familyId)
        : [...prev, familyId]
    );
  };

  const handleEdit = (family: Family) => {
    setEditingFamily(family);
  };

  const handleSave = (updatedFamily: Family) => {
    updateFamily(updatedFamily.id, updatedFamily);
    setEditingFamily(null);
  };

  return (
    <div className="space-y-6">
      {families.map((family) => (
        <div
          key={family.id}
          className="p-4 rounded-lg shadow-md"
          style={{ backgroundColor: family.color + '20' }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFamily(family.id)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                {expandedFamilies.includes(family.id) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              <h3 className="text-lg font-semibold" style={{ color: family.color }}>
                {family.headName}'s Family
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(family)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit className="w-5 h-5 text-gray-500" />
              </button>
              <button
                onClick={() => removeFamily(family.id)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Members: {family.members.length}</span>
            <span>Created: {family.createdAt.toLocaleDateString()}</span>
          </div>

          {expandedFamilies.includes(family.id) && (
            <div className="mt-4 grid gap-3">
              {family.members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  color={family.color}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {editingFamily && (
        <EditFamilyModal
          family={editingFamily}
          onSave={handleSave}
          onClose={() => setEditingFamily(null)}
        />
      )}
    </div>
  );
};