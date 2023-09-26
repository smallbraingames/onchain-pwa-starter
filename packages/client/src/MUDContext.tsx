import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SetupResult } from "./mud/setup";
import { useAccount } from "wagmi";
import requestDrip from "./mud/requestDrip";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { useWallets } from "@privy-io/react-auth";

const MUDContext = createContext<SetupResult | null>(null);

type Props = {
  children: ReactNode;
  value: SetupResult;
};

export const MUDProvider = ({ children, value }: Props) => {
  const currentValue = useContext(MUDContext);
  if (currentValue) throw new Error("MUDProvider can only be used once");
  return <MUDContext.Provider value={value}>{children}</MUDContext.Provider>;
};

export const useMUD = () => {
  const value = useContext(MUDContext);

  const [, setDripInterval] = useState<NodeJS.Timer | undefined>(undefined);
  const { wallets } = useWallets();
  const { setActiveWallet } = usePrivyWagmi();
  const { address } = useAccount();

  // Set Privy's active wallet to the first connected wallet
  useEffect(() => {
    if (wallets.length === 0) return;
    setActiveWallet(wallets[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets]);

  // Set drip
  useEffect(() => {
    if (!value || !address) return;
    const faucetServiceUrl = value.network.networkConfig.faucetServiceUrl;
    if (!faucetServiceUrl) return;
    setDripInterval((previousInterval) => {
      if (previousInterval) clearInterval(previousInterval);

      return requestDrip(address, value.network.publicClient, faucetServiceUrl);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  if (!value) throw new Error("Must be used within a MUDProvider");
  return value;
};
