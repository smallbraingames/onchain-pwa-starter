/*
 * Create the system calls that the client can use to ask
 * for changes in the World state (using the System contracts).
 */

import { Hex } from "viem";

import { ClientComponents } from "./createClientComponents";
import IWorldAbi from "../../../contracts/out/IWorld.sol/IWorld.abi.json";
import { SetupNetworkResult } from "./setupNetwork";
import { createContract } from "@latticexyz/common";
import { getComponentValue } from "@latticexyz/recs";
import { getWalletClient } from "wagmi/actions";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

const createSystemCalls = (
  /*
   * The parameter list informs TypeScript that:
   *
   * - The first parameter is expected to be a
   *   SetupNetworkResult, as defined in setupNetwork.ts
   *
   * - Out of this parameter, we only care about two fields:
   *   - worldContract (which comes from createContract, see
   *     https://github.com/latticexyz/mud/blob/26dabb34321eedff7a43f3fcb46da4f3f5ba3708/templates/react/packages/client/src/mud/setupNetwork.ts#L31).
   *   - waitForTransaction (which comes from syncToRecs, see
   *     https://github.com/latticexyz/mud/blob/26dabb34321eedff7a43f3fcb46da4f3f5ba3708/templates/react/packages/client/src/mud/setupNetwork.ts#L39).
   *
   * - From the second parameter, which is a ClientComponent,
   *   we only care about Counter. This parameter comes to use
   *   through createClientComponents.ts, but it originates in
   *   syncToRecs (https://github.com/latticexyz/mud/blob/26dabb34321eedff7a43f3fcb46da4f3f5ba3708/templates/react/packages/client/src/mud/setupNetwork.ts#L39).
   */
  { waitForTransaction, networkConfig, publicClient }: SetupNetworkResult,
  { Counter }: ClientComponents
) => {
  const getWorldContract = async () => {
    const walletClient = await getWalletClient({
      chainId: networkConfig.chain.id,
    });
    if (walletClient?.account === undefined) {
      console.warn(
        "[Create System Calls] Wallet client is undefined",
        walletClient
      );
      return undefined;
    }
    const worldContract = createContract({
      address: networkConfig.worldAddress as Hex,
      abi: IWorldAbi,
      publicClient,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      walletClient,
    });
    return worldContract;
  };

  const increment = async () => {
    /*
     * Because IncrementSystem
     * (https://mud.dev/tutorials/walkthrough/minimal-onchain#incrementsystemsol)
     * is in the root namespace, `.increment` can be called directly
     * on the World contract.
     */
    const tx = await (
      await getWorldContract()
    )?.write.increment({
      chain: networkConfig.chain,
    });
    if (!tx) return;
    await waitForTransaction(tx);
    return getComponentValue(Counter, singletonEntity);
  };

  return {
    increment,
  };
};

export default createSystemCalls;
