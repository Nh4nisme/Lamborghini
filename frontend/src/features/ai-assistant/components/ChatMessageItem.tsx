import { User, MessageCircle } from 'lucide-react'
import type { ChatMessage } from '../types'

interface ChatMessageItemProps {
    message: ChatMessage
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
    const isUser = message.role === 'user'

    return (
        <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUser
                        ? 'bg-lambo-primary/20'
                        : 'bg-lambo-primary/20'
                }`}
            >
                {isUser ? (
                    <User className="w-4 h-4 text-lambo-primary" />
                ) : (
                    <MessageCircle className="w-4 h-4 text-lambo-primary" />
                )}
            </div>
            <div
                className={`max-w-[75%] ${
                    isUser
                        ? 'bg-lambo-primary text-lambo-bold-black'
                        : 'bg-lambo-dark text-white'
                } p-3 rounded-lg`}
            >
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                </p>
                <p
                    className={`text-xs mt-2 ${
                        isUser ? 'text-lambo-bold-black/70' : 'text-gray-500'
                    }`}
                >
                    {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>
            </div>
        </div>
    )
}
