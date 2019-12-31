import { Injectable } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';

import { ImageAnnotatorResult, LabelAnnotation } from '../../models/item';
import { config } from '../../../config/app.config';

@Injectable()
export class ImageRecognitionService {
  imageAnnotatorClient;

  constructor() {
    this.imageAnnotatorClient = new ImageAnnotatorClient({
      keyFilename: 'config/google-cloud-vision.json',
    });
  }

  async getTags(imagePath) {
    /** Mock response */
    if (config.enableMockResponse) {
      return ['Furniture', 'Electronic', 'Toys', 'Food'];
    }
    /** Real response */
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
