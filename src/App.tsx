import { useState, useRef } from "react";
import { dummyUsers, dummyMessages, dummyChats } from "./data";
import "./App.css";
import { MessageItem } from "./components/MessageItem";
import { Sidebar } from "./components/Sidebar";
import { MessageInput } from "./components/MessageInput";
import { ChatHeader } from "./components/ChatHeader";
import { EditModal } from "./components/EditModal";

// 「有効なチャットIDのリスト」を型として定義
type ChatId = keyof typeof dummyMessages;
type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
};

function App() {
  // 【State の定義】
  // ① どのチャットを選択しているかの管理
  const [selectedChatId, setSelectedChatId] = useState<ChatId>("1");

  // ② メッセージデータの管理（初期値としてダミーデータを入れる）
  const [allMessages, setAllMessages] = useState(dummyMessages);

  // 編集中のメッセージIDを入れる。nullなら編集していない状態
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  //編集中のテキストを一時的に保存する
  const [editText, setEditText] = useState("");

  // ID管理を useRef に変更
  const nextMessageId = useRef<number>(1000);

  // 【関数の定義】
  // 現在選択されているチャットの情報
  const currentChat = dummyChats.find((chat) => chat.id === selectedChatId);
  // 現在選択されているチャットのメッセージ一覧
  const currentMessages = allMessages[selectedChatId] || [];

  const handleSendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return; // 空っぽなら何もしない

    const currentUser = dummyUsers.find((u) => u.id === "current");

    // 新しいメッセージを作成
    const newMessage: Message = {
      id: nextMessageId.current.toString(), // useRefのIDを使用
      content: trimmedText,
      sender: {
        id: "current",
        name: currentUser?.name || "自分",
        avatar: currentUser?.avatar || "",
      }, // 自分として送信
      timestamp: new Date(),
    };

    // 全メッセージデータを更新
    setAllMessages((prev) => ({
      ...prev, // 今までの全データに付け加え,,,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage], // 今のチャットに新しいメッセージを追加
    }));

    nextMessageId.current += 1; // カウントアップ
  };

  // 削除機能
  const handleDelete = (messageId: string) => {
    if (!window.confirm("このメッセージを削除しますか？")) return;

    // フィルタリング：指定したID以外のメッセージだけを残す
    const updatedMessages = currentMessages.filter((m) => m.id !== messageId);
    setAllMessages({
      ...allMessages,
      [selectedChatId]: updatedMessages,
    });
  };

  // 編集

  // 編集ボタンを押した時の処理
  const handleEditClick = (message: Message) => {
    setEditingMessageId(message.id); // どのメッセージかを記録
    setEditText(message.content); // 今の内容を編集用入力欄にコピー
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return;

    const updatedMessages = currentMessages.map((m) =>
      m.id === editingMessageId ? { ...m, content: editText } : m,
    );

    setAllMessages({
      ...allMessages,
      [selectedChatId]: updatedMessages,
    });

    setEditingMessageId(null); // モーダルを閉じる
  };

  return (
    <div className="app-container">
      {/* 左側：チャットリスト */}
      <Sidebar
        chats={dummyChats}
        selectedChatId={selectedChatId}
        onSelectChat={(id) => setSelectedChatId(id)}
      />

      {/* 右側：メインウィンドウ */}
      <main className="main-content">
        <ChatHeader title={currentChat?.name} />

        <div className="message-list">
          {/* ここにメッセージのやり取りが並ぶ */}
          {/* 今選択されている相手とのメッセージを1つずつ取り出す */}
          {currentMessages.map((msg) => (
            <MessageItem
              key={msg.id}
              msg={msg}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <div className="message-input-container">
          {/* メッセージ入力 */}
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </main>

      {/* editingMessageId がある時のみ表示 */}
      {editingMessageId && (
        <EditModal
          text={editText}
          onChangeText={setEditText}
          onCancel={() => setEditingMessageId(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default App;
