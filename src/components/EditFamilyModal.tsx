import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Family, FamilyMember } from '../types/Family';
import { MemberForm } from './MemberForm';
import { v4 as uuidv4 } from 'uuid';

interface EditFamilyModalProps {
  family: Family;
  onSave: (updatedFamily: Family) => void;
  onClose: () => void;
}

export const EditFamilyModal: React.FC<EditFamilyModalProps> = ({
  family,
  onSave,
  onClose,
}) => {
  const [editedFamily, setEditedFamily] = useState<Family>({ ...family });

  const updateMember = (index: number, updatedMember: FamilyMember) => {
    const newMembers = [...editedFamily.members];
    newMembers[index] = updatedMember;
    setEditedFamily({ ...editedFamily, members: newMembers });
  };

  const addMember = () => {
    setEditedFamily({
      ...editedFamily,
      members: [
        ...editedFamily.members,
        {
          id: uuidv4(),
          name: '',
          email: '',
          phone: '',
          relationship: '',
        },
      ],
    });
  };

  const removeMember = (index: number) => {
    if (index === 0) return; // Prevent removing head
    const newMembers = editedFamily.members.filter((_, i) => i !== index);
    setEditedFamily({ ...editedFamily, members: newMembers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedFamily);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Family</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Family Color
              </label>
              <input
                type="color"
                value={editedFamily.color}
                onChange={(e) =>
                  setEditedFamily({ ...editedFamily, color: e.target.value })
                }
                className="h-10 w-full mt-1"
              />
            </div>

            {editedFamily.members.map((member, index) => (
              <MemberForm
                key={member.id}
                member={member}
                onChange={(updated) => updateMember(index, updated)}
                onRemove={() => removeMember(index)}
                isHead={index === 0}
              />
            ))}

            <button
              type="button"
              onClick={addMember}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Add Family Member
            </button>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};