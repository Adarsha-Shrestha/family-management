import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Family, FamilyMember, InvitationTemplate } from '../types/Family';

interface FamilyContextType {
  families: Family[];
  templates: InvitationTemplate[];
  selectedTemplate: InvitationTemplate | null;
  addFamily: (headName: string, color: string, members: FamilyMember[]) => void;
  updateFamily: (id: string, updatedFamily: Partial<Family>) => void;
  removeFamily: (id: string) => void;
  sendInvitation: (familyIds: string[]) => void;
  addTemplate: (template: Omit<InvitationTemplate, 'id'>) => void;
  selectTemplate: (templateId: string) => void;
}

const defaultTemplate: InvitationTemplate = {
  id: 'default',
  name: 'Default Template',
  subject: 'Family Gathering Invitation',
  content: 'Dear {familyName},\n\nWe would like to invite your family to join us.\n\nBest regards,\nFamily Manager',
  variables: ['familyName']
};

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [templates, setTemplates] = useState<InvitationTemplate[]>([defaultTemplate]);
  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate | null>(defaultTemplate);

  const addFamily = useCallback((headName: string, color: string, members: FamilyMember[]) => {
    const headMember: FamilyMember = {
      id: uuidv4(),
      name: headName,
      email: '',
      phone: '',
      relationship: 'Head',
    };

    const newFamily: Family = {
      id: uuidv4(),
      headName,
      color,
      members: [headMember, ...members],
      createdAt: new Date(),
    };
    setFamilies((prev) => [...prev, newFamily]);
  }, []);

  const updateFamily = useCallback((id: string, updatedFamily: Partial<Family>) => {
    setFamilies((prev) =>
      prev.map((family) =>
        family.id === id ? { ...family, ...updatedFamily } : family
      )
    );
  }, []);

  const removeFamily = useCallback((id: string) => {
    setFamilies((prev) => prev.filter((family) => family.id !== id));
  }, []);

  const sendInvitation = useCallback((familyIds: string[]) => {
    if (!selectedTemplate) return;
    
    const selectedFamilies = families.filter((family) => familyIds.includes(family.id));
    console.log('Sending invitations using template:', selectedTemplate.name);
    console.log('To families:', selectedFamilies.map(f => f.headName));
  }, [families, selectedTemplate]);

  const addTemplate = useCallback((template: Omit<InvitationTemplate, 'id'>) => {
    const newTemplate = { ...template, id: uuidv4() };
    setTemplates((prev) => [...prev, newTemplate]);
  }, []);

  const selectTemplate = useCallback((templateId: string) => {
    setSelectedTemplate(templates.find((t) => t.id === templateId) || null);
  }, [templates]);

  return (
    <FamilyContext.Provider 
      value={{ 
        families, 
        templates, 
        selectedTemplate,
        addFamily, 
        updateFamily, 
        removeFamily, 
        sendInvitation,
        addTemplate,
        selectTemplate
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamilyContext must be used within a FamilyProvider');
  }
  return context;
};