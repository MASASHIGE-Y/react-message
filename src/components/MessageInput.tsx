import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText); // 親にテキストを渡す
    setInputText(""); // 入力欄を空にする
  };

  return (
    <div className="message-input-container">
      <textarea
        placeholder="メッセージを入力 . . ."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        rows={1}
      />
      <button onClick={handleSend} disabled={!inputText.trim()}>
        送信
      </button>
    </div>
  );
}
