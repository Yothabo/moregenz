export interface Option {
  key: string;
  label: string;
  description?: string;
}

export interface DecisionNode {
  question: string;
  description?: string;
  options: Option[];
  next?: { [key: string]: string };
}

export interface ServicePath {
  service: string;
  description: string;
  questions: { [key: string]: DecisionNode };
  finalMessage: string;
  requiresReference?: boolean;
}
