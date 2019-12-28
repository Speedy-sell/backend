import { ImageAnnotatorClient } from '@google-cloud/vision';

import { ImageAnnotatorResult, LabelAnnotation } from '../models/item';

const imageAnnotatorClient = new ImageAnnotatorClient({
  keyFilename: 'config/google-cloud-vision.json',
});

function filterTags(labelAnnotations: LabelAnnotation[]): string[] {
  return labelAnnotations.map((labelAnnotation) => labelAnnotation.description);
}

export async function getTags(imagePath) {
  try {
    const response: ImageAnnotatorResult[] = await imageAnnotatorClient.labelDetection(
      imagePath,
    );
    return filterTags(response[0].labelAnnotations);
  } catch {
    return [];
  }
}
