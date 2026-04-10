interface EditModalProps {
  text: string;
  onChangeText: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export function EditModal({
  text,
  onChangeText,
  onCancel,
  onSave,
}: EditModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>メッセージを編集</h3>
        <textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          rows={3}
        />
        <div className="modal-actions">
          <button onClick={onCancel}>キャンセル</button>
          <button onClick={onSave}>保存</button>
        </div>
      </div>
    </div>
  );
}
