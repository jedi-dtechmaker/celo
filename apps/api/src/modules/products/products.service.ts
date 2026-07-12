import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto, sellerId: string) {
    return this.prisma.product.create({
      data: {
        ...dto,
        sellerId,
        minimumOrder: dto.minimumOrder ?? 1,
      },
      include: {
        seller: { select: { id: true, fullName: true, trustScore: true } },
        category: true,
        images: true,
      },
    });
  }

  async findAll(query: QueryProductsDto) {
    const where: Prisma.ProductWhereInput = {
      status: 'ACTIVE',
    };

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.country) where.country = query.country;
    if (query.minPrice || query.maxPrice) {
      where.unitPrice = {};
      if (query.minPrice) where.unitPrice.gte = query.minPrice;
      if (query.maxPrice) where.unitPrice.lte = query.maxPrice;
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (query.sort === 'price_asc') orderBy.unitPrice = 'asc';
    else if (query.sort === 'price_desc') orderBy.unitPrice = 'desc';
    else if (query.sort === 'newest') orderBy.createdAt = 'desc';
    else orderBy.createdAt = 'desc';

    const skip = ((query.page ?? 1) - 1) * (query.limit ?? 20);

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: query.limit ?? 20,
        include: {
          seller: { select: { id: true, fullName: true, trustScore: true } },
          category: true,
          images: { orderBy: { position: 'asc' }, take: 1 },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      meta: {
        total,
        page: query.page ?? 1,
        limit: query.limit ?? 20,
        totalPages: Math.ceil(total / (query.limit ?? 20)),
      },
    };
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: { id: true, fullName: true, trustScore: true, sellerProfile: true },
        },
        category: true,
        images: { orderBy: { position: 'asc' } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findBySeller(sellerId: string) {
    return this.prisma.product.findMany({
      where: { sellerId },
      include: { category: true, images: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
