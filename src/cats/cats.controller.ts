import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('cats')
  getAllcats() {
    return this.catsService.getAllcats();
  }

  @Post('cats')
  savecats(@Body() body) {
    return this.catsService.create(body);
  }
}
