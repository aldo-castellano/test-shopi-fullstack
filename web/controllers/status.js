import { shopify } from "../core/index.js";

const QUERY_COUNT = {
  data: `query {
    productsCount(query: "id:>=1000") {
      count
    } 
      customersCount {
    count
    }
     ordersCount(limit: 2000) {
      count
      precision
    }

  }`,
};

export const statusController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @description Retrieve a summary of the integration status
   */
  async summary(req, res) {
    try {
      const {
        locals: {
          shopify: { session },
        },
      } = res;

      const client = new shopify.api.clients.Graphql({ session });

      const {
        body: { data: data },
      } = await client.query(QUERY_COUNT);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
};
