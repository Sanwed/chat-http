import {Message as MessageInterface} from "../interfaces/interfaces.ts";

interface MessageProps extends Omit<MessageInterface, 'id'> {
  currentUserId: string
}

function Message({userId, content, currentUserId}:MessageProps) {
  return (
    <div className={`chat__message ${userId === currentUserId && 'chat__message--personal'}`}>
      {content}
    </div>
  )
}

export default Message
