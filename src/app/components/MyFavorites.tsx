import { useState } from 'react';
import { Star, FileText } from 'lucide-react';

interface FavoriteFile {
  id: string;
  name: string;
  owner: string;
  favoriteTime: string;
}

const mockFavoriteFiles: FavoriteFile[] = [
  { id: '1', name: '机电运维中心站台门系统故障周报[2024]PSD-GZZB-001号', owner: '有米', favoriteTime: '昨天 20:23' },
  { id: '2', name: '机电运维中心站台门系统故障周报（2025年02月03日～2025年02月09日）红头版本', owner: '有米', favoriteTime: '昨天 20:23' },
  { id: '3', name: '机电运维中心站台门系统故障周报（2025年01月27日～2025年02月02日）红头版本', owner: '有米', favoriteTime: '昨天 20:23' },
  { id: '4', name: '机电运维中心站台门系统故障周报（2025年01月20日～2025年01月26日）红头版本', owner: '有米', favoriteTime: '昨天 20:23' },
  { id: '5', name: '机电运维中心站台门系统故障周报（2025年01月13日～2025年01月19日）红头版本', owner: '有米', favoriteTime: '昨天 20:23' },
  { id: '6', name: '机电运维中心站台门系统故障周报（2025年01月06日～2025年01月12日）红头版本', owner: '有米', favoriteTime: '昨天 20:23' },
  { id: '7', name: '机电运维中心站台门系统故障周报（2024年12月9日～12月15日）红头版本', owner: '有米', favoriteTime: '昨天 20:23' },
];

export function MyFavorites() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [favorites, setFavorites] = useState<FavoriteFile[]>(mockFavoriteFiles);

  const totalPages = Math.ceil(favorites.length / pageSize);

  const handleUnfavorite = (id: string, name: string) => {
    if (confirm(`确定要取消收藏"${name}"吗？`)) {
      setFavorites(favorites.filter(file => file.id !== id));
    }
  };

  return (
    <div className="size-full flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
          <h1 className="text-[21px] font-semibold text-[#1d1d1f]">我的收藏</h1>
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
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">收藏时间</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">操作</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((file) => (
                <tr key={file.id} className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7]/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                      <span className="text-[14px] text-[#1d1d1f]">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{file.owner}</td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{file.favoriteTime}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleUnfavorite(file.id, file.name)}
                      className="px-4 py-1.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#86868b] rounded-lg transition-all text-[14px] text-[#1d1d1f]"
                    >
                      取消收藏
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <div className="text-[14px] text-[#86868b]">
            共 <span className="text-[#1d1d1f] font-medium">{favorites.length}</span> 条
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;&lt;
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-[14px] ${
                  currentPage === page
                    ? 'bg-[#0071e3] text-white'
                    : 'bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;&gt;
            </button>
          </div>

          {/* Page Size Selector */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          {/* Jump to Page */}
          <div className="flex items-center gap-2">
            <span className="text-[14px] text-[#86868b]">跳至</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              className="w-16 px-2 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] text-center"
            />
            <span className="text-[14px] text-[#86868b]">页</span>
          </div>
        </div>
      </div>
    </div>
  );
}
