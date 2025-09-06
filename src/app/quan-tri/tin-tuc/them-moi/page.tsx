"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
});

export default function ThemMoi() {
  const { replace } = useRouter();
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSavePost = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, description, status }),
    })
    const data = await res.json();
    if (data.errorCode === 0) {
      alert('Lưu bài viết thành công!');
      replace('/quan-tri/tin-tuc');
    } else {
      alert('Lưu bài viết thất bại!');
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className='flex items-center gap-4'>
          <h1 className="text-2xl font-bold">Thêm mới bài viết</h1>
          <button className="btn btn-sm btn-soft btn-primary rounded" onClick={handleSavePost}>Lưu</button>
        </div>
        <label className="flex items-center">
          <span>Xuất bản:</span>
          <input type="checkbox" defaultChecked={status} onChange={(e) => setStatus(e.target.checked)} className="toggle toggle-success ml-2" />
        </label>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Tiêu đề:</legend>
        <input type="text" className="input w-full" placeholder="Nhập tiêu đề bài viết" value={title} onChange={(e) => setTitle(e.target.value)} />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Mô tả:</legend>
        <input type="text" className="input w-full" placeholder="Nhập mô tả bài viết" value={description} onChange={(e) => setDescription(e.target.value)} />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nội dung:</legend>
        <Editor value={content} onChange={(newContent: string) => { setContent(newContent) }} className="my-quill" />
      </fieldset>
    </div>
  );
}