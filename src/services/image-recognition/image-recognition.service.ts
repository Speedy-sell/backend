import { Injectable } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';

import { ImageAnnotatorResult, LabelAnnotation } from '../../models/item';

@Injectable()
export class ImageRecognitionService {
  imageAnnotatorClient;

  constructor() {
    this.imageAnnotatorClient = new ImageAnnotatorClient({
      keyFilename: 'config/google-cloud-vision.json',
    });
  }

  async getTags(imagePath) {
    try {
      const response: ImageAnnotatorResult[] = await this.imageAnnotatorClient.labelDetection(
        imagePath,
      );
      return this.filterTags(response[0].labelAnnotations);
    } catch {
      return [];
    }
  }

  private filterTags(labelAnnotations: LabelAnnotation[]): string[] {
    return labelAnnotations.map(
      (labelAnnotation) => labelAnnotation.description,
    );
  }
}
