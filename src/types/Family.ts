export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface Family {
  id: string;
  headName: string;
  color: string;
  members: FamilyMember[];
  createdAt: Date;
}

export interface InvitationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
}