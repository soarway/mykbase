import { useState } from 'react';
import { MessageSquare, FileText } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  time: string;
  isMyComment?: boolean;
}

interface DocumentWithComments {
  id: string;
  name: string;
  owner: string;
  comments: Comment[];
}

const mockDocuments: DocumentWithComments[] = [
  {
    id: '1',
    name: '机电运维中心站台门系统故障周报[2024]PSD-GZZB-001号',
    owner: '有米',
    comments: [
      { id: '1-1', author: '张绍君(我)', content: '不现实，直接用马斯克的X平台就可以。', time: '2025-09-01', isMyComment: true },
      { id: '1-2', author: '李小龙', content: '不行，X平台要翻墙，普通人用不了', time: '2025-09-01', isMyComment: false },
      { id: '1-3', author: '刘的人', content: '花钱买VPN啊', time: '2026-02-09', isMyComment: false },
    ],
  },
  {
    id: '2',
    name: '机电运维中心站台门系统故障周报（2025年02月03日～2025年02月09日）红头版本',
    owner: '有米',
    comments: [
      { id: '2-1', author: '李小龙', content: '不现实，直接用马斯克的X平台就可以。', time: '2026-02-09', isMyComment: false },
      { id: '2-2', author: '张绍君(我)', content: '不行，X平台要翻墙，普通人用不了', time: '2026-02-09', isMyComment: true },
      { id: '2-3', author: '刘的人', content: '花钱买VPN啊', time: '2026-02-09', isMyComment: false },
    ],
  },
];

export function MyComments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalItems = mockDocuments.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="size-full flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
          <h1 className="text-[21px] font-semibold text-[#1d1d1f]">我的评论</h1>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-xl border border-[#d2d2d7] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f5f7] border-b border-[#d2d2d7]">
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">名称</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">所有者</th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-[#d2d2d7]/50">
                  <td colSpan={2} className="px-0 py-0">
                    {/* Document Header */}
                    <div className="px-6 py-3 flex items-center justify-between bg-[#f5f5f7]/30">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                        <span className="text-[14px] text-[#1d1d1f] font-medium">{doc.name}</span>
                      </div>
                      <span className="text-[14px] text-[#1d1d1f]">{doc.owner}</span>
                    </div>

                    {/* Comments */}
                    <div className="px-6 py-3 space-y-3">
                      {doc.comments.map((comment) => (
                        <div key={comment.id} className="pl-8">
                          <div className="flex items-start gap-3">
                            <span className="text-[14px] text-[#1d1d1f] font-medium min-w-[120px]">
                              {comment.author}
                            </span>
                            <span className="text-[14px] text-[#1d1d1f] flex-1">
                              {comment.content}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 pl-[132px]">
                            <span className="text-[13px] text-[#86868b]">{comment.time}</span>
                            <button className="text-[13px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                              回复
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <div className="text-[14px] text-[#86868b]">
            共 <span className="text-[#1d1d1f] font-medium">{totalItems}</span> 条
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
