export interface AuditResult {
  headline: string;
  strategy: string;
  score: number;
  steps: string[];
}

export interface FunnelStep {
  id: string;
  title: string;
  description: string;
}

export enum Section {
  HERO = 'hero',
  PROBLEM = 'problem',
  AUDIT = 'audit',
  PROOF = 'proof',
  BOOKING = 'booking'
}