import { format, isValid } from "date-fns";

// 型の定義（Props: 親から受け取るデータ）
interface MessageItemProps {
  msg: any;
  onEdit: (msg: any) => void;
  onDelete: (id: string) => void;
}

export function MessageItem({ msg, onEdit, onDelete }: MessageItemProps) {
  // ここで一度だけ判定すれば、あとは isMe を使い回せる！
  const isMe = msg.sender.id === "current";

  return (
    <div className={`message-row ${isMe ? "is-me" : "is-other"}`}>
      <div className="message-container">
        {/* 相手なら左側にアバター */}
        {!isMe && (
          <img src={msg.sender.avatar} className="message-avatar-img" alt="" />
        )}

        <div className="message-bubble">
          <div className="message-header">
            <span className="sender-name">
              {isMe ? "あなた" : msg.sender.name}
            </span>
            <span className="message-time">
              {msg.timestamp && isValid(new Date(msg.timestamp))
                ? format(new Date(msg.timestamp), "HH:mm")
                : ""}
            </span>
          </div>

          <div className="message-text">{msg.content}</div>

          {/* 自分のメッセージのみ「編集・削除」ボタンを表示 */}
          {isMe && (
            <div className="message-actions">
              <button className="action-link" onClick={() => onEdit(msg)}>
                編集
              </button>
              <button className="action-link" onClick={() => onDelete(msg.id)}>
                削除
              </button>
            </div>
          )}
        </div>

        {/* 自分なら右側にアバター */}
        {isMe && (
          <img src={msg.sender.avatar} className="message-avatar-img" alt="" />
        )}
      </div>
    </div>
  );
}
