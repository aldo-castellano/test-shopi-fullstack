import { shopify } from "../core/index.js";

export const productsController = {
  async find(req, res) {
    try {
      const id = req.query.id;
      const {
        locals: {
          shopify: { session },
        },
      } = res;

      const client = new shopify.api.clients.Graphql({ session });

      const {
        body: { data: data },
      } = await client.query({
        data: {
          query: ` query GetProductById($ownerId: ID!) {
        product(id: $ownerId) {
            id
            title
            descriptionHtml
            totalInventory   
            description
            onlineStorePreviewUrl
            onlineStoreUrl
            priceRange {
                maxVariantPrice {
                amount
                }
                minVariantPrice {
                amount
                }
            }
            media(first: 10, query: "media_type:IMAGE", sortKey: POSITION) {
                nodes {
                id
                alt
                    ... on MediaImage {
                    createdAt
                        image {
                            width
                            height
                            url
                        }
                    }
                }
         
            }
        
        }
      }`,
          variables: {
            ownerId: id,
          },
        },
      });
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
};
