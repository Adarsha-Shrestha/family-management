import React from 'react';
import { Mail } from 'lucide-react';
import { InvitationForm } from '../components/InvitationForm';
import { InvitationTemplateForm } from '../components/InvitationTemplateForm';

export const SendInvitations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-2 mb-8">
        <Mail className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Send Invitations</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Invitation Template</h2>
          <InvitationTemplateForm />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Select Families to Invite</h2>
          <InvitationForm />
        </div>
      </div>
    </div>
  );
};