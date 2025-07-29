"use client"

import React, { useState, useRef, useEffect } from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  MessageCircle, 
  X, 
  Send, 
  ChevronDown, 
  ChevronRight,
  Bot,
  User,
  Loader2,
  Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: 'user' | 'assistant'
  content: string
  thinking?: string
  isStreaming?: boolean
  streamingThinking?: boolean
}

interface AIResponse {
  answer: string
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedThinking, setExpandedThinking] = useState<number | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null)

  // Auto-focus textarea when opened
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isOpen])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Clear all messages
  const clearAllMessages = () => {
    setMessages([])
    setExpandedThinking(null)
    setStreamingMessageIndex(null)
  }

  // Typewriter effect for streaming text
  const streamText = (text: string, callback: (streamedText: string) => void, onComplete?: () => void) => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        // Ensure we don't skip past the end
        const increment = Math.floor(Math.random() * 8) + 5
        currentIndex = Math.min(currentIndex + increment, text.length)
        callback(text.slice(0, currentIndex))
        
        // If we've reached the end, complete immediately
        if (currentIndex >= text.length) {
          clearInterval(interval)
          if (onComplete) onComplete()
        }
      } else {
        clearInterval(interval)
        if (onComplete) onComplete()
      }
    }, 50 + Math.random() * 50) // Random delay between 50-100ms
    
    return interval // Return interval for manual cleanup if needed
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage
    }
    
    setMessages(prev => [...prev, newUserMessage])

    try {
      // Extract only user messages for the API call
      const previousUserMessages = messages
        .filter(msg => msg.role === 'user')
        .map(msg => msg.content)

      const response = await fetch('https://ad-mybackend.vercel.app/ask', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage,
          previous_convo: [previousUserMessages]
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AIResponse = await response.json()
      
      // Parse thinking and answer from the response
      const thinkingMatch = data.answer.match(/<think>([\s\S]*?)<\/think>/)
      const thinking = thinkingMatch ? thinkingMatch[1].trim() : ""
      const answer = data.answer.replace(/<think>[\s\S]*?<\/think>/, "").trim()

      // Create initial streaming message
      const messageIndex = messages.length + 1
      setStreamingMessageIndex(messageIndex)
      
      const initialMessage: Message = {
        role: 'assistant',
        content: "",
        thinking: "",
        streamingThinking: true,
        isStreaming: true
      }
      
      setMessages(prev => [...prev, initialMessage])

      // Auto-expand thinking section for streaming
      if (thinking) {
        setExpandedThinking(messageIndex)
      }

             // Stream thinking first if it exists
       if (thinking) {
         await new Promise<void>((resolve) => {
           streamText(
             thinking, 
             (streamedThinking) => {
               setMessages(prev => prev.map((msg, idx) => 
                 idx === messageIndex 
                   ? { ...msg, thinking: streamedThinking }
                   : msg
               ))
             },
             () => {
               // Complete thinking streaming when done
               setMessages(prev => prev.map((msg, idx) => 
                 idx === messageIndex 
                   ? { ...msg, streamingThinking: false }
                   : msg
               ))
               resolve()
             }
           )
         })
       }

       // Show the answer instantly after thinking is complete
       setMessages(prev => prev.map((msg, idx) => 
         idx === messageIndex 
           ? { ...msg, content: answer, isStreaming: false }
           : msg
       ))
       setStreamingMessageIndex(null)
    } catch (error) {
      console.error('Error calling AI API:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
      setStreamingMessageIndex(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleThinking = (messageIndex: number) => {
    setExpandedThinking(expandedThinking === messageIndex ? null : messageIndex)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5" />
          AI Assistant
        </CardTitle>
        <div className="flex items-center gap-1">
                     <Button
             variant="ghost"
             size="icon"
             onClick={clearAllMessages}
             className="h-8 w-8"
             disabled={messages.length === 0}
           >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Clear chat</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close AI Assistant</span>
          </Button>
        </div>
      </CardHeader>
 
       <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
         <ScrollArea 
           ref={scrollAreaRef}
           className="flex-1 px-4 py-4"
         >
           <div className="space-y-4">
             {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Hello! I'm your AI assistant.</p>
                <p className="text-sm">Ask me anything to get started.</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                
                                 <div className={cn(
                   "max-w-[260px] rounded-lg px-3 py-2 break-words",
                   message.role === 'user' 
                     ? "bg-primary text-primary-foreground ml-auto" 
                     : "bg-muted"
                 )}>
                   {message.role === 'user' && (
                     <div className="flex items-center gap-2 mb-1">
                       <User className="h-3 w-3" />
                       <span className="text-xs opacity-70">You</span>
                     </div>
                   )}
                   
                   {/* Thinking section - shown above response for assistant messages */}
                   {message.role === 'assistant' && (message.thinking || message.streamingThinking) && (
                     <div className="mb-3">
                       <Collapsible 
                         open={expandedThinking === index}
                         onOpenChange={() => toggleThinking(index)}
                       >
                         <CollapsibleTrigger asChild>
                           <Button
                             variant="ghost"
                             size="sm"
                             className="h-6 px-2 text-xs"
                           >
                             {expandedThinking === index ? (
                               <ChevronDown className="h-3 w-3 mr-1" />
                             ) : (
                               <ChevronRight className="h-3 w-3 mr-1" />
                             )}
                             {message.streamingThinking ? (
                               <span className="flex items-center gap-1">
                                 <Loader2 className="h-3 w-3 animate-spin" />
                                 Thinking...
                               </span>
                             ) : (
                               "Show thinking"
                             )}
                           </Button>
                         </CollapsibleTrigger>
                                                                             <CollapsibleContent>
                            <div className="mt-2 p-2 bg-background/50 rounded text-xs text-muted-foreground border">
                              <div className="font-medium mb-1">Thinking process:</div>
                              <div className="h-32 w-full border rounded">
                                <ScrollArea className="h-full w-full">
                                  <div className="whitespace-pre-wrap break-words p-2">
                                    {message.thinking}
                                    {message.streamingThinking && (
                                      <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1" />
                                    )}
                                  </div>
                                </ScrollArea>
                              </div>
                            </div>
                          </CollapsibleContent>
                       </Collapsible>
                     </div>
                   )}
                   
                                       {/* Response content */}
                    <div className="text-sm whitespace-pre-wrap break-words">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold my-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-semibold my-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-sm font-semibold my-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          code: ({node, inline, className, children, ...props}: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <div className="my-2 bg-black/80 rounded-md">
                                <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-600">
                                  <span className="text-xs text-gray-300">{match[1]}</span>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigator.clipboard.writeText(String(children))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                  </Button>
                                </div>
                                <code className="block p-3 text-sm text-white overflow-x-auto" {...props}>
                                  {children}
                                </code>
                              </div>
                            ) : (
                              <code className="bg-black/10 dark:bg-white/10 rounded px-1 py-0.5 text-sm" {...props}>
                                {children}
                              </code>
                            )
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                      {message.isStreaming && message.content && (
                        <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1" />
                      )}
                    </div>
                 </div>
 
                 {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
           </div>
         </ScrollArea>
 
         <div className="p-4 border-t">
           <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="min-h-[40px] max-h-[120px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-10 w-10 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 