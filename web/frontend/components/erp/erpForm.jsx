import {
  Box,
  Button,
  Card,
  Form,
  FormLayout,
  InlineStack,
  Layout,
  Page,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { ViewIcon, HideIcon } from "@shopify/polaris-icons";
import { SaveBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";

export default function ERPForm({ data, setData }) {
  const [ip, setIp] = useState(data?.ip);
  const [port, setPort] = useState(data?.port);
  const [user, setUser] = useState(data?.user);
  const [password, setPassword] = useState(data?.password);
  const [showPassword, setShowPassword] = useState(false);
  const shopify = useAppBridge();

  const handleChange = {
    ip: (e) => {
      setIp(e);
    },
    port: (e) => {
      setPort(e);
    },
    user: (e) => {
      setUser(e);
    },
    password: (e) => {
      setPassword(e);
    },
  };

  useEffect(() => {
    const dirtyVerify = () => {
      ip != data.ip ||
      port != data.port ||
      user != data.user ||
      password != data.password
        ? shopify.saveBar.show("my-save-bar")
        : shopify.saveBar.hide("my-save-bar");
    };
    dirtyVerify();
  }, [handleChange]);

  const handleSubmit = async () => {
    const postData = {
      shopName: shopify.config.shop,
      ip: ip,
      port: port,
      user: user,
      password: password,
    };

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const responseData = await response.json();

      setData(responseData.data);
    } catch (error) {
      console.error("Error saving settings:", error);

      alert("Hubo un error al guardar los datos. Intenta nuevamente.");
    }
    shopify.saveBar.hide("my-save-bar");
  };
  return (
    <Page title="ERP settings" narrowWidth>
      <SaveBar id="my-save-bar">
        <button variant="primary" onClick={handleSubmit}></button>
        <button onClick={() => shopify.saveBar.hide("my-save-bar")}></button>
      </SaveBar>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            {" "}
            <Form>
              <FormLayout.Group>
                <Box padding="300">
                  {" "}
                  <TextField
                    label="IP"
                    onChange={handleChange.ip}
                    value={ip || ""}
                    autoComplete="off"
                  />{" "}
                </Box>
                <Box padding="300">
                  <TextField
                    label="Port"
                    onChange={handleChange.port}
                    value={port || ""}
                    autoComplete="off"
                  />{" "}
                </Box>
                <Box padding="300">
                  <TextField
                    label="User"
                    onChange={handleChange.user}
                    value={user || ""}
                    autoComplete="off"
                  />{" "}
                </Box>
                <Box padding="300">
                  <InlineStack
                    align={"start"}
                    gap={"200"}
                    blockAlign="end"
                    wrap={false}
                  >
                    <TextField
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      onChange={handleChange.password}
                      value={password || ""}
                      autoComplete="off"
                    />
                    <div>
                      {!showPassword ? (
                        <Button
                          size="large"
                          icon={ViewIcon}
                          accessibilityLabel="Add theme"
                          onClick={() => setShowPassword(true)}
                        />
                      ) : (
                        <Button
                          fullWidth
                          size="large"
                          icon={HideIcon}
                          accessibilityLabel="Add theme"
                          onClick={() => setShowPassword(false)}
                        />
                      )}
                    </div>
                  </InlineStack>
                </Box>
              </FormLayout.Group>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
