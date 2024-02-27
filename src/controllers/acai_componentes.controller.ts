import { Request, Response } from "express";
import { knexConnection } from "../database/knex";

interface IBody {
  components: string[];
  type: string;
  componentsId: number[];
}

export default class AcaiComponentesController {
  async create(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { components, type } = request.body;

    components.map(async(name: string): Promise<void> => {
      await knexConnection("acai_componentes").insert({ name, type });
    });

    return response.json();
  }

  async index(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { type } = request.body;
    const components = await knexConnection("acai_componentes").where({ type });
    return response.json(components);
  }

  async delete(request: Request<{}, {}, IBody>, response: Response): Promise<Response> {
    const { componentsId } = request.body;

    componentsId.map(async(id: number): Promise<void> => {
      await knexConnection("acai_componentes").where({ id }).delete();
    });

    return response.json();
  }
}