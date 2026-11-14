import type { CarConfiguration, CarbonPackage } from '../types';
import { BASE_VEHICLE_INFO, CARBON_LOWER_OPTIONS, CARBON_UPPER_OPTIONS, EXHAUST_OPTIONS } from '../data/lamborghiniData';

export interface PriceBreakdown {
  basePrice: number;
  exteriorColorPrice: number;
  rimPrice: number;
  caliperPrice: number;
  carbonLowerPrice: number;
  carbonUpperPrice: number;
  exhaustPrice: number;
  interiorTrimPrice: number;
  carbonInteriorPrice: number;
  totalPrice: number;
}

export function getCarbonPackagePrice(pkg: CarbonPackage, type: 'lower' | 'upper', currency: 'VND' | 'USD'): number {
  const options = type === 'lower' ? CARBON_LOWER_OPTIONS : CARBON_UPPER_OPTIONS;
  const found = options.find((o) => o.id === pkg);
  if (!found) return 0;
  return currency === 'USD' ? found.priceUSD : found.priceVND;
}

export function getExhaustPrice(exhaustId: string, currency: 'VND' | 'USD'): number {
  const found = EXHAUST_OPTIONS.find((e) => e.id === exhaustId);
  if (!found) return 0;
  return currency === 'USD' ? found.priceUSD : found.priceVND;
}

export function calculatePriceBreakdown(config: CarConfiguration): PriceBreakdown {
  const isUSD = config.currency === 'USD';
  
  const basePrice = isUSD ? BASE_VEHICLE_INFO.basePriceUSD : BASE_VEHICLE_INFO.basePriceVND;
  const exteriorColorPrice = isUSD ? config.exteriorColor.priceUSD : config.exteriorColor.priceVND;
  const rimPrice = isUSD ? config.rim.priceUSD : config.rim.priceVND;
  const caliperPrice = isUSD ? config.caliper.priceUSD : config.caliper.priceVND;
  const carbonLowerPrice = getCarbonPackagePrice(config.carbonLower, 'lower', config.currency);
  const carbonUpperPrice = getCarbonPackagePrice(config.carbonUpper, 'upper', config.currency);
  const exhaustPrice = getExhaustPrice(config.exhaust, config.currency);
  const interiorTrimPrice = isUSD ? config.interiorTrim.priceUSD : config.interiorTrim.priceVND;
  const carbonInteriorPrice = config.carbonInterior ? (isUSD ? 4500 : 135000000) : 0;

  const totalPrice = 
    basePrice +
    exteriorColorPrice +
    rimPrice +
    caliperPrice +
    carbonLowerPrice +
    carbonUpperPrice +
    exhaustPrice +
    interiorTrimPrice +
    carbonInteriorPrice;

  return {
    basePrice,
    exteriorColorPrice,
    rimPrice,
    caliperPrice,
    carbonLowerPrice,
    carbonUpperPrice,
    exhaustPrice,
    interiorTrimPrice,
    carbonInteriorPrice,
    totalPrice,
  };
}

export function formatCurrency(
  amount: number,
  currency: 'VND' | 'USD',
  language: 'ENG' | 'VIE' = 'ENG',
  compact: boolean = false
): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // VND formatting
  if (compact && amount >= 1000000000) {
    const billions = amount / 1000000000;
    const formatted = billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(2).replace('.', ',');
    return language === 'VIE' ? `${formatted} Tỷ VNĐ` : `${formatted} Bil VND`;
  }

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateConfigCode(config: CarConfiguration): string {
  const cColor = config.exteriorColor.id.slice(0, 3).toUpperCase();
  const cRim = config.rim.id.slice(0, 4).toUpperCase();
  const cCal = config.caliper.id.slice(0, 3).toUpperCase();
  const cLower = config.carbonLower === 'body' ? 'STD' : config.carbonLower === 'matt_carbon' ? 'MCB' : 'SCB';
  const cUpper = config.carbonUpper === 'body' ? 'STD' : config.carbonUpper === 'matt_carbon' ? 'MCB' : 'SCB';
  
  return `LB-REV-${cColor}-${cRim}-${cCal}-${cLower}-${cUpper}`;
}
