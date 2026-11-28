/**
 * Automobili Lamborghini Configurator - Types & Specifications
 * Combines Backend API responses and 3D Studio Configuration
 */

// --- Backend API Types ---
export interface TuyChon {
    maTuyChon: number
    nhomTuyChon?: number
    maNhomTuyChon?: number
    tenTuyChon: string
    thuocTinhPhu: string | null
    hinhAnh: string | null
    giaCongThem: number
    trangThai?: string
    tenNhomTuyChon?: string
}

export interface XeConfigurator {
    maXe: number
    tenPhienBan: string
    giaKhoiDiem: number
    dongCo: string
    congSuat: number
    tocDoToiDa: number
    hinhAnh: string
    moTa?: string
    trangThai?: string
    giaToc?: number
    tocDoDongCo?: number
    phanKhoi?: number
}

export type PaintType = 'Metallic' | 'Solid' | 'Matt'

export interface SelectedConfig {
    color: TuyChon | null
    wheel: TuyChon | null
    trim: TuyChon | null
}

// --- 3D Studio Scene & Material Types ---
export type ViewMode = 'exterior' | 'interior'

export type ColorCategory = 
  | 'sportiva' 
  | 'contemporanea' 
  | 'classica' 
  | 'eclettica' 
  | 'tecnica'
  | 'ad_personam'

export type PaintFinish = 'shiny' | 'matt' | 'pearl'

export interface PaintColor {
  id: string
  name: string
  category: ColorCategory
  hex: string
  finish: PaintFinish
  paintGroup?: string
  priceUSD: number
  priceVND: number
  description: string
  roughness: number
  metalness: number
  clearcoat: number
}

export interface RimOption {
  id: string
  name: string
  size: string
  finish: string
  hex: string
  spokeColor: string
  priceUSD: number
  priceVND: number
}

export interface CaliperOption {
  id: string
  name: string
  hex: string
  priceUSD: number
  priceVND: number
}

/** Tyre option from option group 6 (`Lốp xe`). Only some cars carry this group. */
export interface TireOption {
  id: string
  name: string
  /** Free-text attribute from `thuoc_tinh_phu`, shown as-is. */
  finish: string
  priceUSD: number
  priceVND: number
}

export type CarbonPackage = 'body' | 'matt_carbon' | 'shiny_carbon'

export interface CarbonOption {
  id: CarbonPackage
  name: string
  priceUSD: number
  priceVND: number
  description: string
}

export type ExhaustOption = 'matt_black' | 'titanium' | 'chrome'

export type SpoilerPosition = 'retracted' | 'downforce' | 'corsa'

export type StudioEnvironment = 'envstudionewnight' | 'daylight' | 'cyber' | 'golden_hour'

export interface InteriorTrim {
  id: string
  name: string
  primaryLeatherHex: string
  secondaryLeatherHex: string
  stitchingHex: string
  priceUSD: number
  priceVND: number
  description: string
}

export type CameraPreset = 
  | 'three_quarter_front'
  | 'side_profile'
  | 'rear_three_quarter'
  | 'top_down'
  | 'front_fascia'
  | 'wheel_closeup'
  | 'cockpit'

export interface CarConfiguration {
  model: string
  exteriorColor: PaintColor
  rim: RimOption
  caliper: CaliperOption
  /** Selected tyre; null when the car has no tyre options. */
  tire?: TireOption | null
  carbonLower: CarbonPackage
  carbonUpper: CarbonPackage
  exhaust: ExhaustOption
  spoilerPosition: SpoilerPosition
  doorsOpen: boolean
  lightsOn: boolean
  engineStarted: boolean
  interiorTrim: InteriorTrim
  contrastStitchingHex: string
  carbonInterior: boolean
  environment: StudioEnvironment
  currency: 'VND' | 'USD'
  language: 'ENG' | 'VIE'
  loungeMode: boolean
  activeTab: 'colors' | 'rims' | 'carbon' | 'interior' | 'options'
  viewMode: ViewMode
  customModelUrl?: string | null
  customModelName?: string | null
}

export interface SaveConfigRequest {
  maXe: number
  tenCauHinh: string
  tongGia: number
  danhSachMaTuyChon: number[]
}

export interface SaveConfigResponse {
  message: string
  maChiaSe: string
}

export interface SendShareEmailRequest {
  email: string
  ho: string
  ten: string
  maChiaSe: string
}

export interface SavedConfigurationDTO {
  maCauHinh: number
  tenCauHinh: string
  tongGia: number
  ngayTao: string
  maChiaSe: string | null
}

export interface SharedConfigurationDetail {
  maCauHinh: number
  tenCauHinh: string
  tongGia: number
  maChiaSe: string
  maXe: number
  danhSachMaTuyChon: number[]
}
