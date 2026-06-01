import { Clock, FileText } from 'lucide-react';

interface RecentFile {
  id: string;
  name: string;
  owner: string;
  updateTime: string;
}

const mockRecentFiles: RecentFile[] = [
  { id: '1', name: '机电运维中心站台门系统故障周报[2024]PSD-GZZB-001号', owner: '有米', updateTime: '昨天 20:23' },
  { id: '2', name: '机电运维中心站台门系统故障周报（2025年02月03日～2025年02月09日）红头版本', owner: '有米', updateTime: '昨天 20:23' },
  { id: '3', name: '机电运维中心站台门系统故障周报（2025年01月27日～2025年02月02日）红头版本', owner: '有米', updateTime: '昨天 20:23' },
  { id: '4', name: '机电运维中心站台门系统故障周报（2025年01月20日～2025年01月26日）红头版本', owner: '有米', updateTime: '昨天 20:23' },
  { id: '5', name: '机电运维中心站台门系统故障周报（2025年01月13日～2025年01月19日）红头版本', owner: '有米', updateTime: '昨天 20:23' },
  { id: '6', name: '机电运维中心站台门系统故障周报（2025年01月06日～2025年01月12日）红头版本', owner: '有米', updateTime: '昨天 20:23' },
  { id: '7', name: '机电运维中心站台门系统故障周报（2024年12月9日～12月15日）红头版本', owner: '有米', updateTime: '昨天 20:23' },
];

export function RecentAccess() {
  return (
    <div className="size-full flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
          <h1 className="text-[21px] font-semibold text-[#1d1d1f]">最近访问</h1>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-xl border border-[#d2d2d7] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f5f7] border-b border-[#d2d2d7]">
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">名称</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">所有者</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">更新时间</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentFiles.map((file) => (
                <tr key={file.id} className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7]/50 transition-colors cursor-pointer">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                      <span className="text-[14px] text-[#1d1d1f]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{file.owner}</td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{file.updateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
