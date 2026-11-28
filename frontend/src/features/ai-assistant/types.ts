export interface ChatRequest {
    message: string
    sessionId?: string
}

export interface ThongTinLienQuan {
    type: string // "dongxe", "xe", "tintuc", "showroom"
    id: number | null
    title: string
    description: string
    imageUrl: string
}

export interface ChatResponse {
    message: string
    sessionId: string
    timestamp: string
    danhSachThongTin: ThongTinLienQuan[]
}

export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    relatedInfo?: ThongTinLienQuan[]
}
