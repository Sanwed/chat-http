import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Message} from "../interfaces/interfaces.ts";
import MessagesList from "./MessagesList.tsx";
import ChatForm from "./ChatForm.tsx";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [messageValue, setMessageValue] = useState<string>('')

  const getAllMessages = async () => {
    try {
      const res = await fetch('http://localhost:7070/messages?from=0');
      if (res.ok) {
        const data: Message[] = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error(e)
    }
  }

  const postMessage = async () => {
    if (!currentUserId || !messageValue) return;

    try {
      const res = await fetch(' http://localhost:7070/messages', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: currentUserId, content: messageValue})
      })
      if (res.ok) {
        getAllMessages();
      }
    } catch (e) {
      console.error(e)
    }
  }

  const onMessageInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(evt.currentTarget.value)
  }

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    postMessage()
  }

  useEffect(() => {
    const getUserId = () => {
      let id = localStorage.getItem('userId');
      if (!id) {
        id = self.crypto.randomUUID();
        localStorage.setItem('userId', id)
      }
      setCurrentUserId(id);
    }
    getUserId();
    getAllMessages();
    const interval = setInterval(getAllMessages, 1000)

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className='chat'>
      <h1 className='chat__title'>Анонимный чат</h1>
      <MessagesList messages={messages} currentUserId={currentUserId as string} />
      <ChatForm onChange={onMessageInput} onSubmit={onSubmit} messageValue={messageValue} />
    </div>
  )
}

export default Chat
