import { Repository, In } from "typeorm";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { AppDataSource } from "../config/datasource";

export class ProductService {
  private productRepository: Repository<Product>;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

 
  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: [
        "category",
        "productItems",
        "productItems.size",
        "productItems.color",
        "productItems.images"
      ]
    });
  }
async countProducts(categoryIds: number[]): Promise<number> {
  const query = AppDataSource.getRepository(Product)
    .createQueryBuilder('product');

  if (categoryIds.length > 0) {
    query.andWhere('product.category_id IN (:...categoryIds)', { categoryIds });
  }

  return await query.getCount();
}

async getProductsPaginated(categoryIds: number[], offset: number, limit: number): Promise<Product[]> {
  const query = AppDataSource.getRepository(Product)
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.productItems', 'productItems')
    .leftJoinAndSelect('productItems.images', 'images')
    .orderBy('product.id', 'DESC')
    .skip(offset)
    .take(limit);

  if (categoryIds.length > 0) {
    query.andWhere('product.category_id IN (:...categoryIds)', { categoryIds });
  }

  return await query.getMany();
}

 
  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
      relations: [
        "category",
        "productItems",
        "productItems.size",
        "productItems.color",
        "productItems.image"
      ]
    });
  }


  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category: { id: categoryId } },
      relations: [
        "category",
        "productItems",
        "productItems.size",
        "productItems.color",
        "productItems.image"
      ]
    });
  }

  
  async getProductsByCategoryIds(matchedCategoryIds: number[]): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        category: {
          id: In(matchedCategoryIds)
        }
      },
      relations: [
        "category",
        "productItems",
        "productItems.size",
        "productItems.color",
        "productItems.image"
      ]
    });
  }


  async createProduct(productData: Partial<Product>): Promise<Product> {
    const category = await this.categoryRepository.findOne({ where: { id: productData.category?.id } });
    if (!category) throw new Error("Category not found");

    const product = this.productRepository.create({
      name: productData.name,
      description: productData.description,
      all_rate: 0,
      category
    });

    return await this.productRepository.save(product);
  }

  
  async updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) return null;

    if (data.category) {
      const category = await this.categoryRepository.findOne({ where: { id: data.category.id } });
      if (category) product.category = category;
    }

    Object.assign(product, data);
    return await this.productRepository.save(product);
  }

  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected !== 0;
  }
}
