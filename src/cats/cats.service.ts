import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    cats = {
        name: "puppy"
    }
    getAllcats() {
        return this.cats;
    }
}
