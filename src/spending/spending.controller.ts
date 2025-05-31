import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { SpendingService } from './spending.service';
import { CreateSpendingDto, QuerySpendingDto, UpdateSpendingDto } from './dto';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post()
  create(
    @Body() createSpendingDto: CreateSpendingDto,
    @Headers('userId') userId: string,
  ) {
    return this.spendingService.create(createSpendingDto, +userId);
  }

  @Get()
  findAll(@Query() queryParams: QuerySpendingDto) {
    console.log(queryParams)
    return this.spendingService.findAll(queryParams);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.spendingService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateSpendingDto: UpdateSpendingDto,
  ) {
    return this.spendingService.update(+id, updateSpendingDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.spendingService.remove(+id);
  }
}
