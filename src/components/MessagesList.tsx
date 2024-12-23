import {Message as MessageInterface} from "../interfaces/interfaces.ts";
import Message from "./Message.tsx";

interface MessagesListProps {
  messages: MessageInterface[],
  currentUserId: string
}

function MessagesList({messages, currentUserId}: MessagesListProps) {
  return (
    <div className='chat__messages'>
      {messages && messages.map(({id, userId, content}) => (
        <Message key={id} currentUserId={currentUserId} userId={userId} content={content} />
      ))}
    </div>
  )
}

export default MessagesList
