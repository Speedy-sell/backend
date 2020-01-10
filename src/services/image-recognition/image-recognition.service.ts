import { Injectable } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';

import { ImageAnnotatorResult, LabelAnnotation } from '../../models';
import { config } from '../../../config';

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
      // tslint:disable-next-line: no-console
      console.log(
        'Mock Response Sent. To disable, set `enableMockResponse` to `false` in the config file ',
      );
      return ['Furniture', 'Electronic', 'Toys', 'Food', 'Mock', 'Response'];
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
