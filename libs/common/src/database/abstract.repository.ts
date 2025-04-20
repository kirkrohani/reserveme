import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schemas';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  /**
   * Insert new document into database
   * @param document
   * @returns
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   *  Find one documente from DB given a filter query
   * @param filterQuery
   * @returns
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = this.model.findOne(filterQuery).lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found with filterQuery: ', filterQuery);
      throw new NotFoundException('Doument Was Not Found ');
    }

    return document;
  }

  /**
   * Find a document in DB and update it
   * @param filterQuery
   * @param updateQuery
   * @returns
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = this.model
      .findOneAndUpdate(filterQuery, updateQuery, { new: true })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document not found with filterQuery: ', filterQuery);
      throw new NotFoundException('Doument Was Not Found ');
    }

    return document;
  }

  /**
   * Find multiple documents in the database that match the filter query
   * @param filterQuery
   * @returns
   */
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  /**
   * Find one document and remove it from the database
   * @param filterQuery
   * @returns
   */
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
