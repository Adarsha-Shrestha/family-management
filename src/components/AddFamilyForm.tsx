import React, { useState } from 'react';
import { UserPlus, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useFamilyContext } from '../context/FamilyContext';
import { FamilyMember } from '../types/Family';
import { MemberForm } from './MemberForm';

export const AddFamilyForm: React.FC = () => {
  const [headMember, setHeadMember] = useState<FamilyMember>({
    id: uuidv4(),
    name: '',
    email: '',
    phone: '',
    relationship: 'Head',
  });
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [color, setColor] = useState('#4F46E5');
  const { addFamily } = useFamilyContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headMember.name.trim()) {
      addFamily(headMember.name.trim(), color, members);
      setHeadMember({
        id: uuidv4(),
        name: '',
        email: '',
        phone: '',
        relationship: 'Head',
      });
      setMembers([]);
      setColor('#4F46E5');
    }
  };

  const addMember = () => {
    setMembers([
      ...members,
      {
        id: uuidv4(),
        name: '',
        email: '',
        phone: '',
        relationship: '',
      },
    ]);
  };

  const updateMember = (index: number, updatedMember: FamilyMember) => {
    const newMembers = [...members];
    newMembers[index] = updatedMember;
    setMembers(newMembers);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Family Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-10 w-full mt-1"
        />
      </div>

      <MemberForm
        member={headMember}
        onChange={setHeadMember}
        onRemove={() => {}}
        isHead={true}
      />

      {members.map((member, index) => (
        <MemberForm
          key={member.id}
          member={member}
          onChange={(updated) => updateMember(index, updated)}
          onRemove={() => removeMember(index)}
        />
      ))}

      <button
        type="button"
        onClick={addMember}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Family Member
      </button>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Create Family
      </button>
    </form>
  );
};