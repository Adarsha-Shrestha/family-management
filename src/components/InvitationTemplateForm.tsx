import React, { useState } from 'react';
import { useFamilyContext } from '../context/FamilyContext';

export const InvitationTemplateForm: React.FC = () => {
  const { templates, addTemplate, selectTemplate, selectedTemplate } = useFamilyContext();
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: '',
    variables: ['familyName'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTemplate(newTemplate);
    setIsCreating(false);
    setNewTemplate({
      name: '',
      subject: '',
      content: '',
      variables: ['familyName'],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Invitation Template</h3>
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
        >
          {isCreating ? 'Cancel' : 'Create New Template'}
        </button>
      </div>

      {!isCreating && (
        <div className="space-y-4">
          <select
            value={selectedTemplate?.id || ''}
            onChange={(e) => selectTemplate(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>

          {selectedTemplate && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Subject:</strong> {selectedTemplate.subject}
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {selectedTemplate.content}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template Name
            </label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Subject
            </label>
            <input
              type="text"
              value={newTemplate.subject}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, subject: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Content
            </label>
            <textarea
              value={newTemplate.content}
              onChange={(e) =>
                setNewTemplate({ ...newTemplate, content: e.target.value })
              }
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Use {'{familyName}'} to insert the family name in the template.
            </p>
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Template
          </button>
        </form>
      )}
    </div>
  );
};