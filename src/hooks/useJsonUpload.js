import { useState, useRef } from 'react';

export default function useJsonUpload() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // when user selects a file
  const handleFileChange = async (e) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('json')) {
      setError(new Error('Please upload a valid JSON file.'));
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setData(parsed);
    } catch (err) {
      setError(err);
    }
    // reset input so same file can be re-selected if needed
    e.target.value = '';
  };

  // programmatically open file picker
  const openFileDialog = () => {
    inputRef.current?.click();
  };

  // hidden <input> element – to be rendered once
  const FileInput = () => (
    <input
      type="file"
      accept="application/json"
      ref={inputRef}
      style={{ display: 'none' }}
      onChange={handleFileChange}
    />
  );

  return { data, error, FileInput, openFileDialog };
}
