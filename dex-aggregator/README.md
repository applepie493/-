# DexAggregator

A modern, decentralized exchange aggregator that finds the best trading prices across multiple DEXs.

## Features

- 🔍 **Price Comparison**: Compare prices across multiple DEXs (Uniswap, SushiSwap, PancakeSwap, 1inch, Balancer)
- 💰 **Best Price Discovery**: Automatically find the best trading routes and prices
- 🔐 **Secure Wallet Integration**: Connect with MetaMask and other Web3 wallets
- ⚡ **Real-time Updates**: Live price feeds and gas estimation
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Beautiful, glass-morphism design with dark theme

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Web3**: ethers.js, wagmi for blockchain interactions
- **Icons**: Lucide React for clean, consistent icons
- **Development**: ESLint, TypeScript for code quality

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask or another Web3 wallet browser extension

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dex-aggregator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask or compatible wallet
2. **Select Tokens**: Choose the tokens you want to swap from the dropdown menus
3. **Enter Amount**: Input the amount you want to trade
4. **Find Best Route**: Click "Find Best Route" to compare prices across DEXs
5. **Execute Swap**: Review the best route and execute the swap

## Supported DEXs

- **Uniswap V2 & V3**: Leading Ethereum DEX with deep liquidity
- **SushiSwap**: Community-driven DEX with competitive fees
- **PancakeSwap**: Popular BSC-based DEX
- **1inch**: DEX aggregator with optimized routing
- **Balancer**: Multi-token automated market maker

## Supported Tokens

The aggregator supports major tokens including:
- ETH (Ethereum)
- USDC (USD Coin)
- USDT (Tether)
- WBTC (Wrapped Bitcoin)
- UNI (Uniswap)
- LINK (Chainlink)
- DAI (Dai Stablecoin)
- MATIC (Polygon)

## Features Comparison

| Feature | DexAggregator | Traditional DEX |
|---------|---------------|-----------------|
| Price Comparison | ✅ Multiple DEXs | ❌ Single DEX only |
| Gas Optimization | ✅ Optimized routes | ⚠️ Limited |
| Slippage Protection | ✅ Advanced | ✅ Basic |
| MEV Protection | ✅ Built-in | ❌ Not available |
| User Experience | ✅ Streamlined | ⚠️ Complex |

## Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and configs
```

### Key Components

- **useWallet**: Hook for wallet connection and management
- **useDexAggregator**: Hook for DEX price aggregation and routing
- **ResponsiveAlert**: Reusable alert component for notifications

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Security

This application is for educational and demonstration purposes. When using with real funds:

- Always verify transaction details before signing
- Start with small amounts for testing
- Be aware of slippage and price impact
- Monitor gas prices and network congestion

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This software is provided "as is" without warranty. Use at your own risk. The developers are not responsible for any losses incurred through the use of this application.
