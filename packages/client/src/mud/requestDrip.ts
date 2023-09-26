import { createFaucetService } from "@latticexyz/services/faucet";
import { PublicClient, parseEther } from "viem";

const requestDrip = (
  address: `0x${string}`,
  publicClient: PublicClient,
  faucetServiceUrl: string
) => {
  console.info("[Dev Faucet]: Player address -> ", address);
  const faucet = createFaucetService(faucetServiceUrl);

  const requestDrip = async () => {
    const balance = await publicClient.getBalance({ address });
    console.info(`[Dev Faucet]: Player balance -> ${balance}`);
    const lowBalance = balance < parseEther("1");
    if (lowBalance) {
      console.info("[Dev Faucet]: Balance is low, dripping funds to player");
      // Double drip
      await faucet.dripDev({ address });
      await faucet.dripDev({ address });
    }
  };
  requestDrip();
  // Request a drip every 20 seconds
  return setInterval(requestDrip, 20000);
};

export default requestDrip;
