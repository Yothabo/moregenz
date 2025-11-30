import { DecisionNode } from '../types';

export const chatFlows: DecisionNode[] = [
  {
    question: "Where do you need security coverage?",
    description: "Select all areas that apply to your property",
    options: [
      {
        key: "front-entrance",
        label: "Front Entrance",
        description: "Main door, porch, driveway"
      },
      {
        key: "backyard",
        label: "Backyard & Garden",
        description: "Pool area, patio, garden"
      },
      {
        key: "perimeter",
        label: "Property Perimeter",
        description: "Fencing, gates, boundaries"
      },
      {
        key: "indoor",
        label: "Indoor Areas",
        description: "Living room, bedrooms, hallways"
      },
      {
        key: "garage",
        label: "Garage & Storage",
        description: "Garage, shed, storage areas"
      },
      {
        key: "commercial",
        label: "Commercial Areas",
        description: "Office, warehouse, retail space"
      }
    ],
    multiSelect: true
  }
];
