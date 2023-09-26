/*
 * This file sets up all the definitions required for a MUD client.
 */

import createClientComponents from "./createClientComponents";
import createSystemCalls from "./createSystemCalls";
import setupNetwork from "./setupNetwork";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

const setup = async () => {
  const network = await setupNetwork();
  const components = createClientComponents(network);
  const systemCalls = createSystemCalls(network, components);

  return {
    network,
    components,
    systemCalls,
  };
};

export default setup;
