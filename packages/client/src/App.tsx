import { PrivyProvider } from "@privy-io/react-auth";
import Main from "./components/Main";

const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

const App = () => {
  if (!PRIVY_APP_ID) throw new Error("[App] Missing Privy app id");

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["email", "wallet"],
      }}
    >
      <Main />
    </PrivyProvider>
  );
};

export default App;
