import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './cat.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cats')
@Controller()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('cats')
  getAllcats() {
    return this.catsService.getAllcats();
  }

  @Post('cats')
  savecats(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
}
