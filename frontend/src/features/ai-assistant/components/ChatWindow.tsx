import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Trash2 } from 'lucide-react'
import { useChatMutation, useClearSessionMutation } from '../hooks'
import type { ChatMessage } from '../types'
import { ChatMessageItem } from './ChatMessageItem'
import { RelatedInfoCard } from './RelatedInfoCard'

interface ChatWindowProps {
    showAfter?: number // Số pixel scroll trước khi hiện button (default: 400)
}

export function ChatWindow({ showAfter = 400 }: ChatWindowProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [inputValue, setInputValue] = useState('')
    const [sessionId, setSessionId] = useState<string | undefined>()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const chatMutation = useChatMutation()
    const clearSessionMutation = useClearSessionMutation()

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > showAfter) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [showAfter])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [isOpen])

    if (!isVisible) {
        return null
    }

    const handleSend = async () => {
        if (!inputValue.trim() || chatMutation.isPending) return

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue('')

        try {
            const response = await chatMutation.mutateAsync({
                message: inputValue,
                sessionId,
            })

            setSessionId(response.sessionId)

            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.message,
                timestamp: new Date(response.timestamp),
                relatedInfo: response.danhSachThongTin,
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, errorMessage])
            console.error('Chat error:', error)
        }
    }

    const handleClearChat = async () => {
        if (sessionId) {
            try {
                await clearSessionMutation.mutateAsync(sessionId)
            } catch (error) {
                console.error('Clear session error:', error)
            }
        }
        setMessages([])
        setSessionId(undefined)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-lambo-bold-black rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
                aria-label="Mở chat AI"
            >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-lambo-dark-light border border-lambo-primary/30 rounded-lg shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-lambo-primary/30 bg-lambo-dark">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lambo-primary rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-lambo-bold-black" />
                    </div>
                    <div>
                        <h3 className="font-barlow text-lg font-semibold text-white">
                            Trợ lý AI
                        </h3>
                        <p className="text-xs text-gray-400">Lamborghini Vietnam</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {messages.length > 0 && (
                        <button
                            onClick={handleClearChat}
                            className="p-2 text-gray-400 hover:text-lambo-primary transition-colors"
                            aria-label="Xóa cuộc hội thoại"
                            disabled={clearSessionMutation.isPending}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Đóng chat"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6">
                        <div className="w-20 h-20 bg-lambo-primary/10 rounded-full flex items-center justify-center mb-4">
                            <MessageCircle className="w-10 h-10 text-lambo-primary" />
                        </div>
                        <h4 className="font-barlow text-xl font-semibold text-white mb-2">
                            Xin chào!
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Tôi là trợ lý AI của Lamborghini. Tôi có thể giúp bạn tìm hiểu về các dòng xe, tin tức, showroom và dịch vụ.
                        </p>
                        <div className="mt-6 space-y-2 w-full">
                            <button
                                onClick={() => setInputValue('Cho tôi biết về dòng xe Revuelto')}
                                className="w-full p-3 bg-lambo-dark hover:bg-lambo-dark-light border border-lambo-primary/20 hover:border-lambo-primary/50 rounded text-sm text-left text-gray-300 transition-all"
                            >
                                Cho tôi biết về dòng xe Revuelto
                            </button>
                            <button
                                onClick={() => setInputValue('Showroom ở đâu?')}
                                className="w-full p-3 bg-lambo-dark hover:bg-lambo-dark-light border border-lambo-primary/20 hover:border-lambo-primary/50 rounded text-sm text-left text-gray-300 transition-all"
                            >
                                Showroom ở đâu?
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <div key={msg.id}>
                                <ChatMessageItem message={msg} />
                                {msg.relatedInfo && msg.relatedInfo.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {msg.relatedInfo.map((info, idx) => (
                                            <RelatedInfoCard key={idx} info={info} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {chatMutation.isPending && (
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-lambo-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="w-4 h-4 text-lambo-primary" />
                                </div>
                                <div className="bg-lambo-dark p-3 rounded-lg">
                                    <Loader2 className="w-5 h-5 text-lambo-primary animate-spin" />
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-lambo-primary/30 bg-lambo-dark">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập tin nhắn..."
                        rows={1}
                        maxLength={500}
                        className="flex-1 bg-lambo-dark-light border border-lambo-primary/20 focus:border-lambo-primary rounded-lg px-4 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-lambo-primary/50 transition-all"
                        disabled={chatMutation.isPending}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || chatMutation.isPending}
                        className="p-2 bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed disabled:bg-lambo-disabled disabled:cursor-not-allowed text-lambo-bold-black rounded-lg transition-all duration-300 flex items-center justify-center"
                        aria-label="Gửi tin nhắn"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {inputValue.length}/500 ký tự
                </p>
            </div>
        </div>
    )
}
