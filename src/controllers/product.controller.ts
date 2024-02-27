import { Request, Response } from "express";
import { knexConnection } from "../database/knex";
import DiskStorage from "../providers/DiskStorage";
import { ParsedUrlQuery } from "querystring";

interface IBody {
  img: Express.Multer.File;
  newImg?: Express.Multer.File;
  newName?: string;
  newCategory?: string;
}

interface IQuery extends ParsedUrlQuery {
  id: string;
  name: string;
  category: string;
}

export default class ProductController {
  async create(request: Request<{}, {}, IBody, IQuery>, response: Response): Promise<Response> {
    const { name, category } = request.query;
    const img = request.file!;
    const diskStorage = new DiskStorage();

    const filename = await diskStorage.saveFile(img.filename);
    await knexConnection("products").insert({ name, category, image: filename });

    return response.json();
  }

  async index(request: Request, response: Response): Promise<Response> {
    const allProducts = await knexConnection("products");

    return response.json(allProducts);
  }

  async update(request: Request<{}, {}, IBody, IQuery>, response: Response): Promise<Response> {
    const { id } = request.query;
    const newImg = request.file;
    const { newName, newCategory } = request.body;
    const diskStorage = new DiskStorage();

    const product = await knexConnection("products").where({ id }).first();
    const patchName = newName ?? product.name;
    const patchCategory = newCategory ?? product.category;

    await knexConnection("products").update({ name: patchName, category: patchCategory }).where({ id });

    if(newImg) {
      await diskStorage.deleteFile(product.image);
      const filename = await diskStorage.saveFile(newImg.filename);
      await knexConnection("products").update({ image: filename }).where({ id });
    }

    return response.json();
  }

  async delete(request: Request<{}, {}, {}, IQuery>, response: Response): Promise<Response> {
    const { id } = request.query;
    const diskStorage = new DiskStorage();

    const product_image = (await knexConnection("products").where({ id }).first()).image;

    await diskStorage.deleteFile(product_image);
    await knexConnection("products").where({ id }).delete();

    return response.json();
  }
}