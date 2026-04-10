import { format, isValid } from "date-fns";
import { ja } from "date-fns/locale";

interface SidebarProps {
  chats: any[];
  selectedChatId: string;
  onSelectChat: (id: any) => void;
}

{
  /* 左側：チャットリスト */
}
export function Sidebar({ chats, selectedChatId, onSelectChat }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>チャット</h2>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChatId === chat.id ? "active" : ""}`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="chat-avatar">
              {chat.participants && chat.participants[0]?.avatar ? (
                <img
                  src={chat.participants[0].avatar}
                  alt={chat.name}
                  className="avatar-img"
                />
              ) : (
                <span>{chat.name[0]}</span>
              )}
            </div>

            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-item-name">{chat.name}</span>
                <span className="chat-item-time">
                  {(() => {
                    const date = new Date(chat.lastMessage.timestamp);
                    return isValid(date)
                      ? format(date, "HH:mm", { locale: ja })
                      : "";
                  })()}
                </span>
              </div>
              <div className="chat-item-msg">{chat.lastMessage.content}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
