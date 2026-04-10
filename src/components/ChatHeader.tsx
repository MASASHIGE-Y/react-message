interface ChatHeaderProps {
  title?: string;
}

export function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <h3>{title || "チャットを選択してください"}</h3>
    </header>
  );
}
