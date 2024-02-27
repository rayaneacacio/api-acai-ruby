import { Request, Response } from "express";
import { knexConnection } from "../database/knex";
import { AppError } from "../utils/AppError";

interface IBody {
  id: string;
  product_id: string;
  size: string;
  price: string;
  idList: string[];
}

export default class ProductsSizesController {
  async create(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { product_id, size, price } = request.body;

    const product = await knexConnection("products").where({ id: product_id }).first();
    if(!product_id || !product) {
      throw new AppError("o produto não existe");
    }

    await knexConnection("products_sizes").insert({ product_id, size, price });
    return response.json();
  }

  async index(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { product_id } = request.body;
    const allSizes = await knexConnection("products_sizes").where({ product_id });
    return response.json(allSizes);
  }

  async delete(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { idList } = request.body;

    idList.map(async(id: string): Promise<void> => {
      await knexConnection("products_sizes").where({ id }).delete();
    });

    return response.json();
  }
}