export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon: string;
  price: number;
  chainId: number;
}

export interface DEX {
  id: string;
  name: string;
  logo: string;
  fee: number;
  routerAddress: string;
  factoryAddress: string;
  isActive: boolean;
}

export interface Route {
  dex: DEX;
  inputToken: Token;
  outputToken: Token;
  inputAmount: string;
  outputAmount: string;
  priceImpact: number;
  fee: number;
  gasEstimate: string;
  liquidityPool: string;
  slippage: number;
}

export interface SwapQuote {
  routes: Route[];
  bestRoute: Route;
  totalGasCost: string;
  estimatedTime: number;
  priceComparison: {
    dexName: string;
    price: number;
    difference: number;
  }[];
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

export interface SwapParams {
  fromToken: Token;
  toToken: Token;
  amount: string;
  slippage: number;
  deadline: number;
  userAddress: string;
}

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  gasUsed?: string;
  gasPrice?: string;
}