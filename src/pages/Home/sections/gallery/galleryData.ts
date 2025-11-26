export interface GalleryImage {
  id: number
  name: string
  description: string
  height: 'short' | 'medium' | 'tall' | 'x-tall'
  width: 'normal' | 'wide'
  url: string
  alt: string
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    name: "Artful Plating",
    description: "Precision and elegance in every presentation",
    height: "tall",
    width: "normal",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
    alt: "Artfully plated dish with careful arrangement"
  },
  {
    id: 2,
    name: "Mood Lighting",
    description: "Atmospheric dining settings",
    height: "short",
    width: "normal",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    alt: "Elegant table setting with mood lighting"
  },
  {
    id: 3,
    name: "Culinary Details",
    description: "The small touches that make moments special",
    height: "medium",
    width: "normal",
    url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=450&fit=crop",
    alt: "Close-up of culinary details and textures"
  },
  {
    id: 4,
    name: "Minimalist Elegance",
    description: "Clean lines and thoughtful composition",
    height: "short",
    width: "normal",
    url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
    alt: "Minimalist food presentation"
  },
  {
    id: 5,
    name: "Textural Harmony",
    description: "Layers of flavor and visual interest",
    height: "medium",
    width: "normal",
    url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=450&fit=crop",
    alt: "Food with varied textures and colors"
  },
  {
    id: 6,
    name: "Atmospheric Dining",
    description: "Complete experiences from kitchen to table",
    height: "x-tall",
    width: "wide",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=800&fit=crop",
    alt: "Elegant dining atmosphere"
  },
  {
    id: 7,
    name: "Precision Craft",
    description: "Every element placed with intention",
    height: "tall",
    width: "normal",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop",
    alt: "Precisely crafted dish"
  },
  {
    id: 8,
    name: "Sensory Experience",
    description: "Where visual beauty meets culinary art",
    height: "short",
    width: "normal",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    alt: "Beautifully presented culinary creation"
  }
]
