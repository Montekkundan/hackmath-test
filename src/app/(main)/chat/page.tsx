'use client';

import { useCompletion } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import Textarea from 'react-textarea-autosize';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { IconArrowElbow, IconPlus } from '@/components/ui/icons';
import { ChatList } from '@/components/chat-list';
import { Footer } from './footer';
import { EmptyScreen } from './empty-screen';

interface Message {
    type: 'user' | 'bot';
    message: string;
    key: string;
}
function Completion() {

    const {
        completion,
        input,
        stop,
        isLoading,
        handleInputChange,
        handleSubmit,
    } = useCompletion();
    const [conversation, setConversation] = useState<Message[]>([]);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const { formRef, onKeyDown } = useEnterSubmit();
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                if (
                    e.target &&
                    ['INPUT', 'TEXTAREA'].includes((e.target as any).nodeName)
                ) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (inputRef?.current) {
                    inputRef.current.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputRef]);
    const handleFormSubmit = async (e: any) => {
        e.preventDefault();
        const userMessageKey = `user_${new Date().getTime()}`;
        const userMessage: Message = {
            type: 'user',
            message: input,
            key: userMessageKey,
        };

        setConversation((prevConversation) => [...prevConversation, userMessage]);
        handleSubmit(e);
        handleInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLTextAreaElement>);

        // Optionally, reset focus to the textarea after submission
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const submitFromEmptyScreen = (message: string) => {
        // Update the input
        handleInputChange({ target: { value: message } } as React.ChangeEvent<HTMLTextAreaElement>);
        
        // Ensure the state update is processed before submitting the form
        setTimeout(() => {
            if (formRef.current) {
                const formSubmitEvent = new Event('submit', { cancelable: true, bubbles: true });
                formRef.current.dispatchEvent(formSubmitEvent);
            }
        }, 0);
    };

    useEffect(() => {
        if (completion) {
            setConversation((prevConversation) => {
                const newMessage: Message = {
                    type: 'bot',
                    message: completion,
                    key: `bot_${new Date().getTime()}`,
                };

                // Check if the last message is from the bot and still being typed
                if (
                    prevConversation.length > 0 &&
                    prevConversation[prevConversation.length - 1].type === 'bot'
                ) {
                    // If the last message is from the bot, update it
                    return prevConversation.map((msg, idx) =>
                        idx === prevConversation.length - 1 ? newMessage : msg
                    );
                } else {
                    // If the last message is not from the bot, append a new one
                    return [...prevConversation, newMessage];
                }
            });
        }
    }, [completion]);
    return (
        <div className="ml-12  w-full sm:max-w-xl md:max-w-xl lg:max-w-3xl sm:px-4 py-24 flex flex-col stretch">

            {conversation.length === 0 && (
                <EmptyScreen submitMessage={submitFromEmptyScreen} />
            )}
            <ChatList messages={conversation} />

            <ChatScrollAnchor trackVisibility={true} />
            <div className="fixed lg:ml-16 inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
                <div className="mx-auto sm:max-w-2xl md:max-w-3xl sm:px-4">
                    <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
                        <form ref={formRef} onSubmit={handleFormSubmit}>
                            <div className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="superOutline"
                                                size="icon"
                                                className="absolute left-0 w-8 h-8 p-0 rounded-full top-4 bg-background sm:left-4"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.location.reload();
                                                }}
                                            >
                                                <IconPlus />
                                                <span className="sr-only">New Chat</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>New Chat</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Textarea
                                    ref={inputRef}
                                    tabIndex={0}
                                    onKeyDown={onKeyDown}
                                    placeholder="Send a message."
                                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                                    autoFocus
                                    spellCheck={false}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    name="message"
                                    rows={1}
                                    value={input}
                                    onChange={handleInputChange}
                                />
                                <div className="absolute right-0 top-4 sm:right-4">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button type="submit" size="icon" disabled={isLoading}>
                                                    <IconArrowElbow />
                                                    <span className="sr-only">Send message</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Send message</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </form>
                        <Footer className="hidden sm:block" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Completion