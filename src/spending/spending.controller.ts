import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpendingService } from './spending.service';
import { CreateSpendingDto, UpdateSpendingDto } from './dto';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post()
  create(@Body() createSpendingDto: CreateSpendingDto) {
    return this.spendingService.create(createSpendingDto);
  }

  @Get()
  findAll() {
    return this.spendingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spendingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpendingDto: UpdateSpendingDto) {
    return this.spendingService.update(+id, updateSpendingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spendingService.remove(+id);
  }
}
