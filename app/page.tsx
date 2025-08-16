'use client';
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
    PromptInput,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
} from '@/components/ai-elements/prompt-input';
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";


export default function Home() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(
            { text: input }
        );
        setInput('');
    };

    return (
        <main className="w-full h-screen bg-muted/20">
            <div className="fixed top-0 w-full border-b px-4 md:px-8 py-2 grid z-20 bg-background">
                <header className="max-w-3xl w-full justify-self-center flex justify-between items-center gap-2">
                    <div className="flex gap-2 items-center">
                        <Link href={"/"} className="text-lg font-semibold tracking-tighter leading-none">
                            TalkToMeAI
                        </Link>
                    </div>

                    <div>
                        <ModeToggle />
                    </div>
                </header>
            </div>

            <ScrollArea className="w-full h-screen grid pb-4">
                <div className="max-w-3xl w-full justify-self-center pt-20 pb-40 px-6">

                    {messages.length == 0 && (
                        <div className="py-16 grid gap-3">
                            <div>
                                <h2 className="text-3xl md:text-4xl text-center font-semibold tracking-tighter leading-none">
                                    Start talking to me,<br /> I make fun of Human ;{")"}
                                </h2>
                            </div>
                            <div>
                                <p className="text-lg text-muted-foreground text-center">
                                    I exist to roast humans. Don’t expect mercy 😏
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="space-y-4">
                        {messages.map((message) => (
                            message.role == "user" ? (
                                <div className="flex justify-end" key={message.id}>
                                    <div className="max-w-md py-2 px-4 rounded-xl bg-secondary">
                                        {message.parts.map((part, i) =>
                                            <p key={`${message.id}-part${i}`}>
                                                {part.type == "text" && part.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="pb-4 border-b border-dashed" key={message.id}>
                                    {message.parts.map((part, i) =>
                                        <Response key={`${message.id}-part${i}`}>
                                            {part.type == "text" ? part.text : ""}
                                        </Response>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </ScrollArea>
            <div className="w-full px-4 md:px-8 pb-4 fixed bottom-0 grid">
                <PromptInput onSubmit={handleSubmit} className="max-w-3xl w-full justify-self-center relative">
                    <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} className="min-h-24" />
                    <PromptInputToolbar>
                        <PromptInputSubmit
                            className="absolute right-1 bottom-1"
                            disabled={!input}
                            status={status}
                        />
                    </PromptInputToolbar>
                </PromptInput>
            </div>
        </main>
    )
}