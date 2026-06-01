import { useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Upload, Camera, User } from 'lucide-react';

interface ChangeAvatarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangeAvatarDialog({ open, onOpenChange }: ChangeAvatarDialogProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!previewUrl) {
      alert('请先选择头像图片');
      return;
    }

    // 模拟头像上传
    alert('头像修改成功');
    handleClose();
  };

  const handleClose = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onOpenChange(false);
  };

  // 预设头像列表
  const presetAvatars = [
    { id: 1, color: '#0071e3', text: '有' },
    { id: 2, color: '#34c759', text: '木' },
    { id: 3, color: '#ff9500', text: '张' },
    { id: 4, color: '#ff3b30', text: '李' },
    { id: 5, color: '#af52de', text: '王' },
    { id: 6, color: '#5856d6', text: '刘' },
  ];

  const handlePresetSelect = (avatar: typeof presetAvatars[0]) => {
    // 创建一个canvas来生成预设头像图片
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = avatar.color;
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(avatar.text, 100, 100);
      setPreviewUrl(canvas.toDataURL());
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-lg z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#d2d2d7]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0071e3]/10 flex items-center justify-center">
                <Camera className="w-4 h-4 text-[#0071e3]" strokeWidth={1.5} />
              </div>
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                修改头像
              </Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="头像预览"
                      className="w-32 h-32 rounded-full object-cover border-4 border-[#f5f5f7]"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-[#f5f5f7] flex items-center justify-center border-4 border-[#e8e8ed]">
                      <User className="w-16 h-16 text-[#86868b]" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                <p className="mt-4 text-[13px] text-[#86868b]">
                  {previewUrl ? '头像预览' : '请选择或上传头像'}
                </p>
              </div>

              {/* Upload Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={handleUploadClick}
                  className="w-full px-4 py-3 bg-[#0071e3]/10 hover:bg-[#0071e3]/15 text-[#0071e3] rounded-xl transition-all duration-150 flex items-center justify-center gap-2 text-[14px] font-medium border border-[#0071e3]/20"
                >
                  <Upload className="w-4 h-4" strokeWidth={1.5} />
                  上传本地图片
                </button>
                <p className="mt-2 text-[12px] text-[#86868b] text-center">
                  支持 JPG、PNG 格式，大小不超过 5MB
                </p>
              </div>

              {/* Preset Avatars */}
              <div>
                <h3 className="text-[14px] font-medium text-[#1d1d1f] mb-3">
                  或选择预设头像
                </h3>
                <div className="grid grid-cols-6 gap-3">
                  {presetAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => handlePresetSelect(avatar)}
                      className="aspect-square rounded-full flex items-center justify-center text-white font-semibold text-[18px] hover:ring-4 hover:ring-[#0071e3]/20 transition-all duration-150"
                      style={{ backgroundColor: avatar.color }}
                    >
                      {avatar.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#d2d2d7]">
            <Dialog.Close asChild>
              <button className="px-5 py-2 bg-white rounded-xl border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-all duration-150 text-[14px] font-medium">
                取消
              </button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl transition-all duration-150 text-[14px] font-medium shadow-sm"
            >
              确认修改
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
