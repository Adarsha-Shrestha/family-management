import React from 'react';
import { X } from 'lucide-react';
import { FamilyMember } from '../types/Family';

interface MemberFormProps {
  member: FamilyMember;
  onChange: (member: FamilyMember) => void;
  onRemove: () => void;
  isHead?: boolean;
}

export const MemberForm: React.FC<MemberFormProps> = ({
  member,
  onChange,
  onRemove,
  isHead = false,
}) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg mb-4">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-medium text-gray-900">
          {isHead ? 'Family Head' : 'Family Member'}
        </h4>
        {!isHead && (
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => onChange({ ...member, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={member.email}
            onChange={(e) => onChange({ ...member, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={member.phone}
            onChange={(e) => onChange({ ...member, phone: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {!isHead && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Relationship
            </label>
            <select
              value={member.relationship}
              onChange={(e) => onChange({ ...member, relationship: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};