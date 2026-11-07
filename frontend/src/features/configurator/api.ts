import { http } from '../../api/http'
import type { TuyChon, XeConfigurator } from './types'

// UC004.2: Lấy danh sách màu của xe theo loại màu (@GetMapping("/{maXe}/color"))
export const getDanhSachMauCuaXeTheoLoaiMau = (maXe: number, loaiMau: string): Promise<TuyChon[]> =>
    http<TuyChon[]>(`/configurator/${maXe}/color?loaiMau=${encodeURIComponent(loaiMau)}`)

// UC004: Lấy danh sách tùy chọn của xe theo mã nhóm tùy chọn (@GetMapping("/{maXe}/options"))
export const getDanhSachTuyChonCuaXeTheoMaNhom = (maXe: number, maNhomTuyChon: number): Promise<TuyChon[]> =>
    http<TuyChon[]>(`/configurator/${maXe}/options?maNhomTuyChon=${maNhomTuyChon}`)

// UC003: Lấy thông tin xe theo id (@GetMapping("/{maXe}"))
export const getXeTheoId = (maXe: number): Promise<XeConfigurator> =>
    http<XeConfigurator>(`/configurator/${maXe}`)
