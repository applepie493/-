'use client';

import { useState, useCallback } from 'react';
import { Route, SwapQuote, Token } from '@/types';
import { SUPPORTED_DEXES, MOCK_DEX_PRICES, calculatePriceImpact } from '@/utils/dexConfig';

export function useDexAggregator() {
  const [isLoading, setIsLoading] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [bestQuote, setBestQuote] = useState<SwapQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching routes from multiple DEXes
  const fetchRoutes = useCallback(async (
    fromToken: Token,
    toToken: Token,
    amount: string
  ): Promise<Route[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const pairKey = `${fromToken.symbol}/${toToken.symbol}`;
    const inputAmount = parseFloat(amount);
    
    if (isNaN(inputAmount) || inputAmount <= 0) {
      return [];
    }

    const routes: Route[] = [];

    for (const dex of SUPPORTED_DEXES) {
      if (!dex.isActive) continue;

      // Get mock price for this DEX (with some randomization)
      const basePrice = MOCK_DEX_PRICES[dex.id as keyof typeof MOCK_DEX_PRICES]?.[pairKey as keyof typeof MOCK_DEX_PRICES['uniswap-v3']];
      
      if (!basePrice) {
        // Calculate price based on token prices
        const calculatedPrice = fromToken.price / toToken.price;
        const priceVariation = 0.95 + Math.random() * 0.1; // ±5% variation
        const dexPrice = calculatedPrice * priceVariation;
        
        const outputAmount = inputAmount * dexPrice;
        const priceImpact = calculatePriceImpact(inputAmount, outputAmount, calculatedPrice);
        
        routes.push({
          dex,
          inputToken: fromToken,
          outputToken: toToken,
          inputAmount: amount,
          outputAmount: outputAmount.toFixed(6),
          priceImpact,
          fee: dex.fee,
          gasEstimate: (21000 + Math.random() * 50000).toFixed(0),
          liquidityPool: `$${(5 + Math.random() * 20).toFixed(1)}M`,
          slippage: 0.5 + Math.random() * 2,
        });
      } else {
        const priceVariation = 0.995 + Math.random() * 0.01; // ±0.5% variation
        const dexPrice = basePrice * priceVariation;
        const outputAmount = inputAmount * dexPrice;
        const priceImpact = calculatePriceImpact(inputAmount, outputAmount, basePrice);
        
        routes.push({
          dex,
          inputToken: fromToken,
          outputToken: toToken,
          inputAmount: amount,
          outputAmount: outputAmount.toFixed(6),
          priceImpact,
          fee: dex.fee,
          gasEstimate: (21000 + Math.random() * 50000).toFixed(0),
          liquidityPool: `$${(5 + Math.random() * 20).toFixed(1)}M`,
          slippage: 0.5 + Math.random() * 2,
        });
      }
    }

    // Sort by output amount (best first)
    return routes.sort((a, b) => parseFloat(b.outputAmount) - parseFloat(a.outputAmount));
  }, []);

  // Find the best routes across all DEXes
  const findBestRoutes = useCallback(async (
    fromToken: Token,
    toToken: Token,
    amount: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedRoutes = await fetchRoutes(fromToken, toToken, amount);
      setRoutes(fetchedRoutes);

      if (fetchedRoutes.length === 0) {
        setError('No routes found for this token pair');
        setBestQuote(null);
        return;
      }

      const bestRoute = fetchedRoutes[0];
      const totalGasCost = fetchedRoutes.reduce(
        (sum, route) => sum + parseFloat(route.gasEstimate),
        0
      ).toString();

      // Create price comparison
      const priceComparison = fetchedRoutes.map((route, index) => {
        const price = parseFloat(route.outputAmount) / parseFloat(route.inputAmount);
        const bestPrice = parseFloat(bestRoute.outputAmount) / parseFloat(bestRoute.inputAmount);
        const difference = ((price - bestPrice) / bestPrice) * 100;

        return {
          dexName: route.dex.name,
          price,
          difference,
        };
      });

      const quote: SwapQuote = {
        routes: fetchedRoutes,
        bestRoute,
        totalGasCost,
        estimatedTime: 15 + Math.random() * 30, // 15-45 seconds
        priceComparison,
      };

      setBestQuote(quote);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch routes');
    } finally {
      setIsLoading(false);
    }
  }, [fetchRoutes]);

  // Calculate savings compared to other DEXes
  const calculateSavings = useCallback((quote: SwapQuote): number => {
    if (!quote || quote.routes.length < 2) return 0;

    const bestOutput = parseFloat(quote.bestRoute.outputAmount);
    const averageOutput = quote.routes.reduce(
      (sum, route) => sum + parseFloat(route.outputAmount),
      0
    ) / quote.routes.length;

    return ((bestOutput - averageOutput) / averageOutput) * 100;
  }, []);

  // Estimate total transaction cost (gas + fees)
  const estimateTransactionCost = useCallback((route: Route, ethPrice: number = 2400): number => {
    const gasPrice = 20; // gwei
    const gasCostEth = (parseFloat(route.gasEstimate) * gasPrice) / 1e9;
    const gasCostUsd = gasCostEth * ethPrice;
    
    const tradingFeeUsd = (parseFloat(route.inputAmount) * route.inputToken.price * route.fee) / 100;
    
    return gasCostUsd + tradingFeeUsd;
  }, []);

  // Reset state
  const reset = useCallback(() => {
    setRoutes([]);
    setBestQuote(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    routes,
    bestQuote,
    isLoading,
    error,
    findBestRoutes,
    calculateSavings,
    estimateTransactionCost,
    reset,
  };
}