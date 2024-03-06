import { Request, Response } from "express";
import { knexConnection } from "../database/knex";

interface IBody {
  sizes: { size: string, price: string }[];
}

export default class acaiSizesController {
  async create(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { sizes } = request.body;

    sizes.map(async(item): Promise<void> => {
      await knexConnection("acai_sizes").insert({ size: item.size, price: item.price });
    });

    return response.json();
  }

  async index(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const allSizes = await knexConnection("acai_sizes");
    return response.json(allSizes);
  }

  async delete(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { sizes } = request.body;

    sizes.map(async(item): Promise<void> => {
      await knexConnection("acai_sizes").where({ size: item.size, price: item.price }).delete();
    });

    return response.json();
  }
}