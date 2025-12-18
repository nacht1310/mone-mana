import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  CreateSpendingDto,
  QuerySpendingDto,
  UpdateSpendingDto,
} from './spending.dto';
import { SpendingService } from './spending.service';

@Controller('spending')
export class SpendingController {
  constructor(private readonly spendingService: SpendingService) {}

  @Post('/create')
  create(@Body() createSpendingDto: CreateSpendingDto, @Request() request) {
    return this.spendingService.create(createSpendingDto, request.userId);
  }

  @Get('/list')
  getList(@Query() queryParams: QuerySpendingDto, @Request() request) {
    return this.spendingService.getList(queryParams, request.userId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.spendingService.findOne(+id);
  }

  @Put('/:id')
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
