import { DEX, Token } from '@/types';

// Popular tokens on Ethereum mainnet
export const POPULAR_TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    icon: '🔵',
    price: 2400.50,
    chainId: 1,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6441e98F0dD36b99c33F89C05C73d8E',
    decimals: 6,
    icon: '💵',
    price: 1.00,
    chainId: 1,
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    icon: '💚',
    price: 1.00,
    chainId: 1,
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    decimals: 8,
    icon: '🟠',
    price: 43250.00,
    chainId: 1,
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    decimals: 18,
    icon: '🦄',
    price: 12.45,
    chainId: 1,
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    decimals: 18,
    icon: '🔗',
    price: 18.75,
    chainId: 1,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    icon: '💰',
    price: 1.00,
    chainId: 1,
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    decimals: 18,
    icon: '🟣',
    price: 0.85,
    chainId: 1,
  },
];

// Supported DEX configurations
export const SUPPORTED_DEXES: DEX[] = [
  {
    id: 'uniswap-v3',
    name: 'Uniswap V3',
    logo: '🦄',
    fee: 0.3,
    routerAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    factoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    isActive: true,
  },
  {
    id: 'uniswap-v2',
    name: 'Uniswap V2',
    logo: '🦄',
    fee: 0.3,
    routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    factoryAddress: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    isActive: true,
  },
  {
    id: 'sushiswap',
    name: 'SushiSwap',
    logo: '🍣',
    fee: 0.25,
    routerAddress: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    factoryAddress: '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac',
    isActive: true,
  },
  {
    id: 'pancakeswap',
    name: 'PancakeSwap',
    logo: '🥞',
    fee: 0.25,
    routerAddress: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
    factoryAddress: '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362',
    isActive: true,
  },
  {
    id: '1inch',
    name: '1inch',
    logo: '1️⃣',
    fee: 0.2,
    routerAddress: '0x1111111254fb6c44bAC0beD2854e76F90643097d',
    factoryAddress: '0x0000000000000000000000000000000000000000',
    isActive: true,
  },
  {
    id: 'balancer',
    name: 'Balancer',
    logo: '⚖️',
    fee: 0.1,
    routerAddress: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
    factoryAddress: '0x0000000000000000000000000000000000000000',
    isActive: true,
  },
];

// Mock price data for different DEXes
export const MOCK_DEX_PRICES = {
  'uniswap-v3': {
    'ETH/USDC': 2401.25,
    'WBTC/ETH': 18.02,
    'UNI/ETH': 0.00518,
  },
  'sushiswap': {
    'ETH/USDC': 2400.80,
    'WBTC/ETH': 18.01,
    'UNI/ETH': 0.00517,
  },
  'pancakeswap': {
    'ETH/USDC': 2399.95,
    'WBTC/ETH': 18.00,
    'UNI/ETH': 0.00516,
  },
  '1inch': {
    'ETH/USDC': 2402.10,
    'WBTC/ETH': 18.03,
    'UNI/ETH': 0.00519,
  },
};

// Network configurations
export const NETWORK_CONFIG = {
  1: {
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  137: {
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  56: {
    name: 'BSC',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorerUrl: 'https://bscscan.com',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
  },
};

// Utility functions
export const getTokenBySymbol = (symbol: string): Token | undefined => {
  return POPULAR_TOKENS.find(token => token.symbol === symbol);
};

export const getTokenByAddress = (address: string): Token | undefined => {
  return POPULAR_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
};

export const getDexById = (id: string): DEX | undefined => {
  return SUPPORTED_DEXES.find(dex => dex.id === id);
};

export const getActiveDexes = (): DEX[] => {
  return SUPPORTED_DEXES.filter(dex => dex.isActive);
};

export const formatTokenAmount = (amount: string, decimals: number): string => {
  const value = parseFloat(amount);
  if (isNaN(value)) return '0';
  
  if (value < 0.0001) return value.toExponential(2);
  if (value < 1) return value.toFixed(6);
  if (value < 1000) return value.toFixed(4);
  if (value < 1000000) return value.toFixed(2);
  
  return value.toLocaleString();
};

export const calculatePriceImpact = (inputAmount: number, outputAmount: number, spotPrice: number): number => {
  const executionPrice = inputAmount / outputAmount;
  const priceImpact = ((executionPrice - spotPrice) / spotPrice) * 100;
  return Math.abs(priceImpact);
};