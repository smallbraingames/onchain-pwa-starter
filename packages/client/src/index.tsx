import ReactDOM from "react-dom/client";
import App from "./App";
import setup from "./mud/setup";
import { MUDProvider } from "./MUDContext";
import { PrivyProvider } from "@privy-io/react-auth";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import getNetworkConfig from "./mud/getNetworkConfig";

const chain = getNetworkConfig().chain;
const configureChainsConfig = configureChains([chain], [publicProvider()]);

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

setup().then(async (result) => {
  root.render(
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        additionalChains: [chain],
        loginMethods: ["wallet", "email", "apple", "google", "twitter"],
      }}
    >
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <MUDProvider value={result}>
          <App />
        </MUDProvider>
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
});
