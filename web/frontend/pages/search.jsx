import { useState } from "react";

import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  TextField,
  Form,
  Image,
  Link,
} from "@shopify/polaris";

export default function Search() {
  const [idProduct, setIdProduct] = useState("");
  const [product, setProduct] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    setError(false);
    try {
      const response = await fetch(`/api/products?id=${idProduct}`);
      const responseProduct = await response.json();

      setProduct(responseProduct.data.product);
    } catch (error) {
      setError(true);
    }
  };
  const handleChange = (e) => {
    setIdProduct(e);
  };

  return (
    <Page title="Buscar Product por id" narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <Form>
              <InlineStack blockAlign="end" align="center">
                <TextField
                  error={error}
                  label="Search"
                  onChange={handleChange}
                  value={idProduct}
                  autoComplete="off"
                />
                <Button size="large" onClick={handleSubmit}>
                  Buscar
                </Button>
              </InlineStack>{" "}
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
      <Layout>
        <Layout.Section>
          {error && (
            <Card>
              <Layout.Section>
                <p style={{ color: "red" }}>No se encontro el producto</p>
              </Layout.Section>
            </Card>
          )}
          {product && !error && (
            <Card>
              <Layout.Section>
                <InlineStack blockAlign="start" align="space-around" gap="lg">
                  <div>
                    <p>
                      <strong>Nombre: </strong> {product.title}
                    </p>
                    <p>
                      <strong>Unidades disponibles: </strong>{" "}
                      {product.totalInventory}
                    </p>
                    <p>
                      <strong> Rando de precio: </strong>
                      {product.priceRange.maxVariantPrice.amount / 100} EUR a{" "}
                      {product.priceRange.minVariantPrice.amount / 100} EUR
                    </p>
                    <p>
                      <strong> Url del producto: </strong>
                      <Link url={product?.onlineStorePreviewUrl}>Product</Link>
                    </p>
                  </div>{" "}
                  <Image
                    width={200}
                    source={
                      product.images?.edges?.[0]?.node?.src ||
                      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    alt={product?.images?.edges?.alt || "img"}
                  />
                </InlineStack>
              </Layout.Section>
            </Card>
          )}
        </Layout.Section>
      </Layout>{" "}
    </Page>
  );
}
