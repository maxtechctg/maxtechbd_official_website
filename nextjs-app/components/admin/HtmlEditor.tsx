'use client';

import { useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function HtmlEditor({ value, onChange, placeholder }: HtmlEditorProps) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Type or paste your content here!',
    height: 400,
    theme: 'default',
    toolbarAdaptive: false,
    toolbarButtonSize: 'middle' as const,
    buttons: [
      'source', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'superscript', 'subscript', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'video', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize', 'print'
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    removeButtons: ['about'],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html' as const,
    style: {
      font: '14px Arial, sans-serif',
    }
  }), [placeholder]);

  return (
    <div className="html-editor-wrapper">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent: string) => onChange(newContent)}
      />
      <style jsx global>{`
        .html-editor-wrapper .jodit-container {
          border-radius: 8px;
          border: 1px solid #dee2e6;
        }
        .html-editor-wrapper .jodit-toolbar__box {
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }
        .html-editor-wrapper .jodit-workplace {
          background: #fff;
        }
      `}</style>
    </div>
  );
}
