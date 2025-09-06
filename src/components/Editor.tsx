'use client';
import { useState, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Editor({ value, onChange }: any) {
    const [editorValue, setEditorValue] = useState(value);
    const quillRef = useRef<ReactQuill>(null);

    const handleEditorChange = (content: any) => {
        setEditorValue(content);
        onChange(content);
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.url) {
                const quill = quillRef.current?.getEditor();
                const range = quill?.getSelection();
                if (quill && range) {
                    quill.insertEmbed(range.index, 'image', data.url);
                }
            }
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 4, 5, 6, false] }],
                [{
                    color: []
                }, {
                    background: []
                }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                ['clean'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                [{ align: ['', 'center', 'right', 'justify'] }],
            ],
            handlers: {
                image: handleImageUpload,
            },
        },
    };

    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editorValue}
            onChange={handleEditorChange}
            modules={modules}
            placeholder='Nội dung...'
            className="my-quill"
        />
    );
}
