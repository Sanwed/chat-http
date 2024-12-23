import {ChangeEvent, FormEvent} from "react";

interface ChatFormProps {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void
  messageValue: string
}

function ChatForm({messageValue, onChange, onSubmit}: ChatFormProps) {
  return (
    <form onSubmit={onSubmit} className='chat__form'>
      <input
        onChange={onChange}
        value={messageValue}
        className='chat__input'
        type="text"
        name='message'
        placeholder='Введите сообщение'
      />
      <button className='chat__submit' type='submit'>
        Отправить
      </button>
    </form>
  )
}

export default ChatForm
