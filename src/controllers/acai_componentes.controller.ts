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

  async index(request: Request, response: Response): Promise<Response> {
    const cremes = await knexConnection("acai_componentes").where({ type: "cremes" });
    const complementos = await knexConnection("acai_componentes").where({ type: "complementos" }); 
    const coberturas = await knexConnection("acai_componentes").where({ type: "coberturas" });
    const extras = await knexConnection("acai_componentes").where({ type: "extras" });

    const components = {
      cremes: cremes,
      complementos: complementos,
      coberturas: coberturas,
      extras: extras
    }

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