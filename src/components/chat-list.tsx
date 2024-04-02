import { UserMessage, BotMessage } from '@/components/llm/message';

export function ChatList({ messages }: { messages: any[] }) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative items-left max-w-2xl px-4 pb-12">
       {messages.map((message, index) => {
              // Determine whether to use UserMessage or BotMessage based on message.type
              const MessageComponent = message.type === 'user' ? UserMessage : BotMessage;
      
              return (
                <div key={index} className="pb-4">
                  <MessageComponent key={message.key}>{message.message}</MessageComponent>
                </div>
              );
            })}
    </div>
  );
}