# Onchain PWA Starter

A starter kit to create a fully onchain application with a progressive web app (PWA) mobile client. This shows up on a users mobile homescreen. With one command, get a:

- **Mobile client synced to onchain state**: The client syncs and reacts to onchain state updates out of the box using **[MUD](https://mud.dev)**'s client and smart contract libraries
- **Social onboarding**: Simple & easy onboarding for users without wallets using **[Privy](https://privy.io)**'s embedded wallets
- **PWA detection and installation**: Detect a user's environment & guide them to install on mobile, and configure PWA settings however you want using **[Vite PWA](https://vite-pwa-org.netlify.app/)** for PWA configuration

This is a modification of [MUD](https://mud.dev)'s starter template for progressive web apps.

Examples of onchain apps that use PWAs include [friend.tech](https://friend.tech) and [words.art](https://words.art) (no affiliation with this project).

## Get Started

This project uses pnpm workspaces. To install packages and run, simply run

```
pnpm install
pnpm dev
```

This will deploy smart contracts to a local chain and deploy the client. You can also deploy the contracts to the [Lattice Testnet](https://mud.dev/tutorials/emojimon/deploy-to-testnet) by running

```
cd packages/contracts && pnpm deploy:testnet
```

Then, make sure to set `VITE_CHAIN_ID=4242` in `packages/client/.env`, and you have a PWA with synced onchain state deployed on testnet. It will even automagically **drip funds** (using Lattice's [Faucet Service](https://mud.dev/cli#faucet)) to whichever wallet you connect with Privy, so you can submit transactions right away.

### Setup Privy

This starter kit uses [Privy](https://privy.io) for social onboarding & creation of embedded wallets on users' devices. You will need a Privy App ID to get going. Grab one at privy.io

Set this App ID to the `VITE_PRIVY_APP_ID` field in the `packages/client/.env` environment. An example environment is provided.

If you'd like embedded wallet functionality, **make sure the `Create Embedded Wallet on User Login` setting is enabled on your Privy dashboard**.

### Configure Contracts

This project uses [MUD](https://mud.dev), a solidity library and associated set of client libraries, for smart contracts & client-side onchain state syncing. For more info on MUD, look at [mud.dev](https://mud.dev)

## Getting Help

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.
