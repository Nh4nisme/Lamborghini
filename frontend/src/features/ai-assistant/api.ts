import { http } from '../../api/http'
import type { ChatRequest, ChatResponse } from './types'

export const aiAssistantApi = {
    chat: (request: ChatRequest) =>
        http<ChatResponse>('/ai-assistant/chat', {
            method: 'POST',
            body: JSON.stringify(request),
        }),

    clearSession: (sessionId: string) =>
        http<void>(`/ai-assistant/session/${sessionId}`, {
            method: 'DELETE',
        }),

    // Streaming endpoint - trả về EventSource để nhận data streaming
    getChatStreamUrl: (message: string, sessionId: string) => {
        const params = new URLSearchParams({ message, sessionId })
        return `/api/ai-assistant/chat/stream?${params}`
    },
}
