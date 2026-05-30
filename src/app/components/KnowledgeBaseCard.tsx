import { MoreVertical, FolderOpen, Settings, Shield } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface KnowledgeBaseCardProps {
  title: string;
  fileCount: number;
  storage: string;
  icon?: string;
  onClick?: () => void;
}

export function KnowledgeBaseCard({ title, fileCount, storage, onClick }: KnowledgeBaseCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-[18px] border border-[#d2d2d7] p-6 hover:shadow-[0_8px_30px_rgba(0,113,227,0.12)] hover:border-[#0071e3]/40 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
    >
      {/* More options button */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-[#f5f5f7] hover:scale-110 transition-all duration-200"
          >
            <MoreVertical className="w-[18px] h-[18px] text-[#86868b]" strokeWidth={1.5} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[180px] bg-white rounded-xl border border-[#d2d2d7] shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-1 z-50"
            sideOffset={5}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#1d1d1f] rounded-lg hover:bg-[#f5f5f7] outline-none cursor-pointer transition-colors">
              <Shield className="w-4 h-4 text-[#0071e3]" strokeWidth={1.5} />
              权限设置
            </DropdownMenu.Item>
            <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2.5 text-[14px] text-[#1d1d1f] rounded-lg hover:bg-[#f5f5f7] outline-none cursor-pointer transition-colors">
              <Settings className="w-4 h-4 text-[#0071e3]" strokeWidth={1.5} />
              基础信息设置
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#0071e3] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#0071e3]/30 transition-all duration-300">
        <FolderOpen className="w-6 h-6 text-white" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-[17px] font-semibold mb-8 text-[#1d1d1f] leading-tight">{title}</h3>

      {/* Stats */}
      <div className="space-y-1 text-[14px]">
        <div className="text-[#86868b]">
          文件总数：<span className="text-[#1d1d1f] font-medium">{fileCount}个</span>
        </div>
        <div className="text-[#86868b]">
          占用空间：<span className="text-[#1d1d1f] font-medium">{storage}</span>
        </div>
      </div>
    </div>
  );
}

export function NewKnowledgeBaseCard() {
  return (
    <button className="group bg-white rounded-[18px] border-2 border-dashed border-[#0071e3]/40 p-6 hover:bg-[#fff5f0] hover:border-[#ff6b35]/40 hover:shadow-[0_4px_20px_rgba(255,107,53,0.15)] transition-all duration-300 ease-out h-full min-h-[200px] flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-full bg-[#0071e3] group-hover:bg-[#ff6b35] flex items-center justify-center mb-4 transition-all duration-300">
        <span className="text-[32px] text-white transition-colors font-light leading-none">+</span>
      </div>
      <span className="text-[14px] font-medium text-[#0071e3] group-hover:text-[#ff6b35] transition-colors">新建知识库</span>
    </button>
  );
}
