"use client";

import { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, Send, Languages, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetDescription
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatbotResponseAction } from '@/app/actions';
import { languages } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
};

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const { language, setLanguage, t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const res = await getChatbotResponseAction({ userQuestion: input, userLanguage: language });
        
        if (res.data) {
            const botMessage: Message = { id: (Date.now() + 1).toString(), text: res.data.chatbotResponse, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } else {
             const errorMessage: Message = { id: (Date.now() + 1).toString(), text: (res.error as string) || "Sorry, something went wrong.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        }

        setIsLoading(false);
    };

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
                        size="icon"
                        aria-label="Open chatbot"
                    >
                        <Bot className="h-8 w-8 text-primary-foreground" />
                    </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle>{t('chatbot_title')}</SheetTitle>
                        <SheetDescription>{t('chatbot_description')}</SheetDescription>
                    </SheetHeader>
                    <div className="flex items-center gap-2 p-2 border-b">
                         <Languages className="h-5 w-5 text-muted-foreground" />
                         <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('select_language')} />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map(lang => (
                                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <ScrollArea className="flex-1 my-4" ref={scrollAreaRef}>
                        <div className="space-y-4 pr-4">
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground p-8">
                                    <p>{t('chatbot_start_conversation')}</p>
                                </div>
                            )}
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex items-end gap-2",
                                        message.sender === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {message.sender === 'bot' && (
                                         <Avatar className="h-8 w-8">
                                             <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                                         </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-xs rounded-lg px-4 py-2 text-sm md:max-w-md",
                                            message.sender === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        {message.text}
                                    </div>
                                     {message.sender === 'user' && (
                                         <Avatar className="h-8 w-8">
                                             <AvatarFallback><User size={18}/></AvatarFallback>
                                         </Avatar>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-end gap-2 justify-start">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot size={18}/></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>{t('thinking')}...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <SheetFooter>
                        <form
                            className="flex w-full items-center gap-2"
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t('type_your_question')}
                                disabled={isLoading}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSend(); }}}
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}
