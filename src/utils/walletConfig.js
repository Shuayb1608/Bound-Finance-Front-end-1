import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'



const chains = [ goerli ]
export const projectId = process.env.PROJECT_ID_WALLETCONNECT;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1,projectId, chains }),
  publicClient
})

export const ethereumClient = new EthereumClient(wagmiConfig, chains)


