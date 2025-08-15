'use client';

import { useState, useEffect } from 'react';
import { ArrowDownUp, Search, TrendingUp, Zap, Shield, BarChart3, Wallet, AlertCircle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useDexAggregator } from '@/hooks/useDexAggregator';
import { POPULAR_TOKENS } from '@/utils/dexConfig';
import { Token } from '@/types';

export default function Home() {
  const [fromToken, setFromToken] = useState<Token>(POPULAR_TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(POPULAR_TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('1.0');
  const [toAmount, setToAmount] = useState('2400.50');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Use custom hooks
  const wallet = useWallet();
  const { 
    routes, 
    bestQuote, 
    isLoading, 
    error, 
    findBestRoutes, 
    calculateSavings,
    estimateTransactionCost,
    reset 
  } = useDexAggregator();

  const swapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    reset(); // Clear previous routes
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(Number(value))) {
      const calculatedTo = (Number(value) * fromToken.price / toToken.price).toFixed(6);
      setToAmount(calculatedTo);
    }
    reset(); // Clear previous routes when amount changes
  };

  const handleFindBestRoute = async () => {
    if (!fromAmount || isNaN(Number(fromAmount)) || Number(fromAmount) <= 0) {
      return;
    }
    await findBestRoutes(fromToken, toToken, fromAmount);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              DexAggregator
            </h1>
          </div>
          {!wallet.isConnected ? (
            <button 
              onClick={wallet.connectWallet}
              disabled={wallet.isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Wallet className="w-4 h-4" />
              <span>{wallet.isLoading ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <div className="text-gray-400">Connected</div>
                <div className="font-medium">{wallet.getShortAddress(wallet.address)}</div>
              </div>
              <button 
                onClick={wallet.disconnectWallet}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trading Interface */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Swap Tokens</h2>
              
              {/* From Token */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
                <div className="relative">
                  <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-4">
                    <button
                      onClick={() => setShowFromDropdown(!showFromDropdown)}
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors"
                    >
                      <span className="text-xl">{fromToken.icon}</span>
                      <span className="font-medium">{fromToken.symbol}</span>
                    </button>
                    <input
                      type="text"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      className="flex-1 bg-transparent text-right text-xl font-medium focus:outline-none"
                      placeholder="0.0"
                    />
                  </div>
                  
                                     {showFromDropdown && (
                     <div className="absolute z-20 mt-2 w-full bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
                       {POPULAR_TOKENS.map((token) => (
                         <button
                           key={token.symbol}
                           onClick={() => {
                             setFromToken(token);
                             setShowFromDropdown(false);
                             reset();
                           }}
                           className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors"
                         >
                           <span className="text-xl">{token.icon}</span>
                           <div className="text-left">
                             <div className="font-medium">{token.symbol}</div>
                             <div className="text-sm text-gray-400">{token.name}</div>
                           </div>
                           <div className="ml-auto text-sm text-gray-400">
                             ${token.price.toLocaleString()}
                           </div>
                         </button>
                       ))}
                     </div>
                   )}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={swapTokens}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                >
                  <ArrowDownUp className="w-5 h-5" />
                </button>
              </div>

              {/* To Token */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
                <div className="relative">
                  <div className="flex items-center space-x-4 bg-gray-800/50 rounded-xl p-4">
                    <button
                      onClick={() => setShowToDropdown(!showToDropdown)}
                      className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors"
                    >
                      <span className="text-xl">{toToken.icon}</span>
                      <span className="font-medium">{toToken.symbol}</span>
                    </button>
                    <input
                      type="text"
                      value={toAmount}
                      readOnly
                      className="flex-1 bg-transparent text-right text-xl font-medium focus:outline-none text-gray-400"
                      placeholder="0.0"
                    />
                  </div>
                  
                                     {showToDropdown && (
                     <div className="absolute z-20 mt-2 w-full bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
                       {POPULAR_TOKENS.map((token) => (
                         <button
                           key={token.symbol}
                           onClick={() => {
                             setToToken(token);
                             setShowToDropdown(false);
                             reset();
                           }}
                           className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors"
                         >
                           <span className="text-xl">{token.icon}</span>
                           <div className="text-left">
                             <div className="font-medium">{token.symbol}</div>
                             <div className="text-sm text-gray-400">{token.name}</div>
                           </div>
                           <div className="ml-auto text-sm text-gray-400">
                             ${token.price.toLocaleString()}
                           </div>
                         </button>
                       ))}
                     </div>
                   )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                
                <button
                  onClick={handleFindBestRoute}
                  disabled={isLoading || !fromAmount || Number(fromAmount) <= 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-3 font-medium transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Finding Best Route...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Find Best Route</span>
                    </>
                  )}
                </button>
                
                <button 
                  disabled={!wallet.isConnected || !bestQuote}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl py-3 font-medium transition-colors"
                >
                  {!wallet.isConnected ? 'Connect Wallet to Swap' : 'Execute Swap'}
                </button>
              </div>
            </div>

            {/* Route Comparison */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Best Routes</span>
                {bestQuote && (
                  <span className="text-sm text-green-400 ml-auto">
                    Save {calculateSavings(bestQuote).toFixed(2)}%
                  </span>
                )}
              </h3>
              <div className="space-y-3">
                {routes.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Click "Find Best Route" to compare prices</p>
                  </div>
                ) : (
                  routes.map((route, index) => (
                    <div
                      key={route.dex.id}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer hover:bg-gray-800/50 ${
                        index === 0 
                          ? 'border-green-500 bg-green-500/10' 
                          : 'border-gray-700 bg-gray-800/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium flex items-center space-x-2">
                            <span>{route.dex.logo}</span>
                            <span>{route.dex.name}</span>
                          </div>
                          <div className="text-sm text-gray-400">
                            Fee: {route.fee}% • Gas: ~{Math.round(Number(route.gasEstimate) / 1000)}k • {route.liquidityPool}
                          </div>
                          <div className="text-xs text-gray-500">
                            Price Impact: {route.priceImpact.toFixed(2)}% • Slippage: {route.slippage.toFixed(1)}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{Number(route.outputAmount).toFixed(4)} {toToken.symbol}</div>
                          <div className="text-sm text-gray-400">
                            ${(Number(route.outputAmount) * toToken.price).toLocaleString()}
                          </div>
                          {index === 0 && (
                            <div className="text-sm text-green-400">Best Price</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Why DexAggregator?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Best Prices</div>
                    <div className="text-sm text-gray-400">Compare prices across multiple DEXs</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Secure</div>
                    <div className="text-sm text-gray-400">Non-custodial and decentralized</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Low Fees</div>
                    <div className="text-sm text-gray-400">Optimize for gas and trading fees</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="font-medium">$2.4B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Liquidity</span>
                  <span className="font-medium">$12.8B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Supported DEXs</span>
                  <span className="font-medium">15+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gas Saved</span>
                  <span className="font-medium text-green-400">~15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
