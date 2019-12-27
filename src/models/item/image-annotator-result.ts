export interface ImageAnnotatorResult {
  faceAnnotations: any[];
  landmarkAnnotations: any[];
  logoAnnotations: any[];
  labelAnnotations: LabelAnnotation[];
  textAnnotations: any[];
  localizedObjectAnnotations: any[];
  safeSearchAnnotation?: any;
  imagePropertiesAnnotation?: any;
  error?: any;
  cropHintsAnnotation?: any;
  fullTextAnnotation?: any;
  webDetection?: any;
  productSearchResults?: any;
  context?: any;
}

export interface LabelAnnotation {
  locations: any[];
  properties: any[];
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly?: any;
}
