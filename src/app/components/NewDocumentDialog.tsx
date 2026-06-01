import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import 'bytemd/dist/index.css';
import 'highlight.js/styles/vs.css';

interface NewDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const plugins = [gfm(), highlight()];

export function NewDocumentDialog({ open, onOpenChange }: NewDocumentDialogProps) {
  const [documentName, setDocumentName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!documentName.trim()) {
      alert('请输入文档名称');
      return;
    }

    console.log('新建文档:', { documentName, content });
    alert('文档创建成功！');

    // 重置表单
    setDocumentName('');
    setContent('');
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[90vw] max-w-5xl h-[85vh] z-50 flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#d2d2d7]">
            <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
              新建文档
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
            {/* Document Name */}
            <div>
              <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                文档名称
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="请输入文档名称"
                className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
              />
            </div>

            {/* Markdown Editor */}
            <div className="flex-1 overflow-hidden">
              <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                文档内容
              </label>
              <div className="h-full border border-[#d2d2d7] rounded-lg overflow-hidden">
                <Editor
                  value={content}
                  plugins={plugins}
                  onChange={(v) => setContent(v)}
                  placeholder="请输入文档内容（支持 Markdown 格式）"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 px-6 py-4 border-t border-[#d2d2d7]">
            <Dialog.Close asChild>
              <button className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                取消
              </button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
            >
              保存
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
