export interface Option {
  key: string;
  label: string;
  description?: string;
}

export interface DecisionNode {
  question: string;
  description?: string;
  options?: Option[]; // Made optional for text input questions
  next?: { [key: string]: string };
  multiSelect?: boolean;
  requiresTextInput?: boolean;
}

export interface ServicePath {
  service: string;
  description: string;
  questions: { [key: string]: DecisionNode };
  finalMessage: string;
  requiresReference?: boolean;
}
