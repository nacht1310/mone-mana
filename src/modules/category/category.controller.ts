import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  findAll() {
    return this.categoryService.getAllCategories();
  }

  @Get('/recommended')
  recommendCategory(@Query() queryParams: { description: string }) {
    return this.categoryService.recommendCategory(queryParams.description);
  }
}
