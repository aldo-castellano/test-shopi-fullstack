import { Spinner } from "@shopify/polaris";
import { useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import ERPForm from "../components/erp/erpForm";
import { useQuery } from "react-query";

export default function ERPSettings() {
  const [newData, setNewData] = useState();
  const { isLoading } = useQuery({
    queryFn: async () => {
      const shopify = useAppBridge();

      const response = await fetch(`/api/settings?shop=${shopify.config.shop}`);
      const responseData = await response.json();

      if (!responseData?.findSettings) {
        return setNewData({ ip: null, port: null, user: null, password: null });
      }
      return setNewData(responseData?.findSettings);
    },
  });

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ERPForm data={newData} setData={setNewData} />
      )}
    </>
  );
}
