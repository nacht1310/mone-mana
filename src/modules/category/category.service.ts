import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.category.findMany();

    return categories;
  }

  async recommendCategory(description: string) {
    const categories = await this.getAllCategories();
    const categoryMap = new Map<number, number>();

    for (const category of categories) {
      let count = 0;

      const regExp = new RegExp(`\\b(${category.keywords.join('|')})\\b`, 'gi');
      count = description.match(regExp)?.length || 0;

      categoryMap.set(category.id, count);
    }

    return categoryMap;
  }
}
