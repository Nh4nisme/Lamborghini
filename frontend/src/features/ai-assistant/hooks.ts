import { useMutation, useQueryClient } from '@tanstack/react-query'
import { aiAssistantApi } from './api'
import type { ChatRequest } from './types'

export const useChatMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: ChatRequest) => aiAssistantApi.chat(request),
        onSuccess: () => {
            // Invalidate các query liên quan nếu cần
            queryClient.invalidateQueries({ queryKey: ['ai-chat'] })
        },
    })
}

export const useClearSessionMutation = () => {
    return useMutation({
        mutationFn: (sessionId: string) => aiAssistantApi.clearSession(sessionId),
    })
}
