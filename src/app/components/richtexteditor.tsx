'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles

// Define the ref type for the RichTextEditor component
export type RichTextEditorHandle = {
    getContent: () => string;
};

const RichTextEditor = forwardRef<RichTextEditorHandle>((_, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const [editorContent, setEditorContent] = useState<string>('');

    useEffect(() => {
        if (editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                    ],
                },
                placeholder: 'Write job description...',
            });

            if (quillRef.current) {
                quillRef.current.on('text-change', () => {
                    const content = quillRef.current?.root.innerHTML;
                    if (content) {
                        setEditorContent(content);
                    }
                });
            }
        }

        return () => {
            quillRef.current = null; // Cleanup to avoid memory leaks
        };
    }, []);

    // Expose the getContent function to the parent component
    useImperativeHandle(ref, () => ({
        getContent: () => {
            if (quillRef.current) {

                return quillRef.current.root.innerHTML; // Return the HTML content
            }
            return '';
        },
    }));

    return (
        <>
            <div
                ref={editorRef}
                style={{ height: '300px' }}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            <textarea
                className="border p-4 rounded bg-gray-50 hidden"
                id='description'
                name='description'
                defaultValue={editorContent}
            />
        </>
    );
});

RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;