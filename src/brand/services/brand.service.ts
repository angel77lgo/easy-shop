import { HttpException, Inject, Injectable } from '@nestjs/common';
import { BrandRepository } from '../repository/brand.repository';
import { InjectConnection } from '@nestjs/sequelize';
import { Op, Sequelize, Transaction } from 'sequelize';
import { Brand } from '../model/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectConnection() private readonly sequelize: Sequelize,
    @Inject(BrandRepository) private brandRepository: BrandRepository,
  ) {}

  async createBrand(data: Partial<Brand>, ts?: Transaction): Promise<Brand> {
    const transaction = ts || (await this.sequelize.transaction());
    try {
      const existBrand = await this.brandRepository.findOne({
        where: { brandName: data.brandName },
      });
      if (existBrand) {
        throw new HttpException('Brand already exists', 400);
      }
      const newBrand = await this.brandRepository.create(data, transaction);
      if (!ts) await transaction.commit();
      return newBrand;
    } catch (error) {
      if (!ts) await transaction.rollback();
      throw new HttpException(error, 400);
    }
  }

  /**
   * Find all brands or brands that match the given name
   * @param {string} [name] - Brand name to search for
   * @returns {Promise<Brand[]>} - List of brands
   */
  async findBrands(name?: string): Promise<Brand[]> {
    if (!name) {
      return await this.brandRepository.findAll();
    }

    return await this.brandRepository.findAll({
      where: { brandName: { [Op.iLike]: `%${name}%` } },
    });
  }
}
