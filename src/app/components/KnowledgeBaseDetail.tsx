import { useState } from 'react';
import { Search, Plus, Upload, Download, MessageCircle, FileText, Folder, User, Settings, Send, X, FolderUp } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'document';
  owner: string;
  updateTime: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const mockFiles: FileItem[] = [
  { id: '1', name: '三级分类', type: 'folder', owner: '有米', updateTime: '昨天 21:25' },
  { id: '2', name: '📝 工作周报', type: 'folder', owner: '有米', updateTime: '昨天 20:32' },
  { id: '3', name: '机电运维中心站台门系统故障周报[2024]PSD-GZZB-001号', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '4', name: '机电运维中心站台门系统故障周报（2025年02月03日～2025年02月09日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '5', name: '机电运维中心站台门系统故障周报（2025年01月27日～2025年02月02日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '6', name: '机电运维中心站台门系统故障周报（2025年01月20日～2025年01月26日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '7', name: '机电运维中心站台门系统故障周报（2025年01月13日～2025年01月19日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '8', name: '机电运维中心站台门系统故障周报（2025年01月06日～2025年01月12日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '9', name: '机电运维中心站台门系统故障周报（2024年12月9日～12月15日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
  { id: '10', name: '机电运维中心站台门系统故障周报（2024年12月30日～2025年1月5日）红头版本', type: 'document', owner: '有米', updateTime: '昨天 20:23' },
];

interface KnowledgeBaseDetailProps {
  knowledgeBaseName: string;
  onBack: () => void;
}

export function KnowledgeBaseDetail({ knowledgeBaseName, onBack }: KnowledgeBaseDetailProps) {
  const [searchFileName, setSearchFileName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentFolderPath, setCurrentFolderPath] = useState<string[]>([]); // 当前文件夹路径

  const totalPages = Math.ceil(mockFiles.length / pageSize);
  const isInSubfolder = currentFolderPath.length > 0; // 是否在子文件夹中

  const handleGoBack = () => {
    // 返回上一级目录
    setCurrentFolderPath(prev => prev.slice(0, -1));
  };

  const handleFolderClick = (folderName: string) => {
    // 进入文件夹
    setCurrentFolderPath(prev => [...prev, folderName]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newUserMessage]);
    setInputMessage('');

    // 模拟AI响应
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '这是AI的模拟回复。实际应用中，这里会调用后台API来获取大模型的真实响应。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="size-full flex overflow-hidden">
      {/* Left Side - File List */}
      <div className={`flex flex-col overflow-hidden transition-all duration-300 ${aiPanelOpen ? 'w-[60%]' : 'w-full'}`}>
        {/* Top Bar */}
        <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <span className="text-[21px]">🗂️</span>
            <h1 className="text-[21px] font-semibold text-[#1d1d1f]">{knowledgeBaseName}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-[#0071e3]/10 transition-colors">
              <User className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#0071e3]/10 transition-colors">
              <Settings className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-[#fbfbfd] border-b border-[#d2d2d7]/50 px-8 py-4">
          <div className="flex items-center gap-4">
            {/* File Name Search */}
            <div className="flex items-center gap-2">
              <label className="text-[14px] text-[#86868b] whitespace-nowrap">文件名:</label>
              <input
                type="text"
                value={searchFileName}
                onChange={(e) => setSearchFileName(e.target.value)}
                className="w-96 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
              />
            </div>

            {/* Search Button */}
            <button className="px-4 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#86868b] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]">
              <Search className="w-[16px] h-[16px]" strokeWidth={1.5} />
              搜索文件
            </button>

            <div className="flex-1"></div>

            {/* Action Buttons */}
            <button className="px-4 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]">
              <Plus className="w-[16px] h-[16px]" strokeWidth={2} />
              新建
            </button>
            <button className="px-4 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]">
              <Upload className="w-[16px] h-[16px]" strokeWidth={1.5} />
              上传
            </button>
            <button className="px-4 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]">
              <Download className="w-[16px] h-[16px]" strokeWidth={1.5} />
              导入
            </button>
            <button
              onClick={() => setAiPanelOpen(!aiPanelOpen)}
              className={`px-4 py-1.5 rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium ${
                aiPanelOpen
                  ? 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
                  : 'bg-[#0071e3] text-white hover:bg-[#0077ed]'
              }`}
            >
              <MessageCircle className="w-[16px] h-[16px]" strokeWidth={1.5} />
              问AI
            </button>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="bg-white rounded-xl border border-[#d2d2d7] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f5f5f7] border-b border-[#d2d2d7]">
                  <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">名称</th>
                  {!aiPanelOpen && (
                    <>
                      <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">所有者</th>
                      <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">更新时间</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Return to parent folder row */}
                {isInSubfolder && (
                  <tr
                    onClick={handleGoBack}
                    className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <FolderUp className="w-5 h-5 text-[#0071e3] group-hover:text-[#0077ed]" strokeWidth={1.5} />
                        <span className="text-[17px] font-medium text-[#86868b] group-hover:text-[#1d1d1f]">..</span>
                      </div>
                    </td>
                    {!aiPanelOpen && (
                      <>
                        <td className="px-6 py-3 text-[14px] text-[#86868b]"></td>
                        <td className="px-6 py-3 text-[14px] text-[#86868b]"></td>
                      </>
                    )}
                  </tr>
                )}

                {/* File list */}
                {mockFiles.map((file) => (
                  <tr
                    key={file.id}
                    onClick={() => {
                      if (file.type === 'folder') {
                        handleFolderClick(file.name);
                      }
                    }}
                    className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        {file.type === 'folder' ? (
                          <Folder className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                        ) : (
                          <FileText className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                        )}
                        <span className="text-[14px] text-[#1d1d1f]">{file.name}</span>
                      </div>
                    </td>
                    {!aiPanelOpen && (
                      <>
                        <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{file.owner}</td>
                        <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{file.updateTime}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <div className="text-[14px] text-[#86868b]">
              共 <span className="text-[#1d1d1f] font-medium">22</span> 条
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                &lt;
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                &lt;&lt;
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#0071e3] text-white text-[14px]">
                1
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                2
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                3
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                &gt;
              </button>
              <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
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

      {/* Right Side - AI Chat Panel */}
      {aiPanelOpen && (
        <div className="w-[40%] border-l border-[#d2d2d7] bg-white flex flex-col">
          {/* AI Panel Header */}
          <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
              <h2 className="text-[17px] font-semibold text-[#1d1d1f]">AI助手</h2>
            </div>
            <button
              onClick={() => setAiPanelOpen(false)}
              className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors"
            >
              <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-[#0071e3]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">开始与AI对话</h3>
                <p className="text-[14px] text-[#86868b] max-w-xs">
                  您可以询问关于知识库中文件的任何问题，AI会基于知识库内容为您提供帮助。
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-[#0071e3] text-white'
                        : 'bg-[#f5f5f7] text-[#1d1d1f]'
                    }`}
                  >
                    <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-[12px] mt-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-[#86868b]'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#d2d2d7] p-6">
            <div className="space-y-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="输入您的问题..."
                className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#86868b]">
                  按 Enter 发送，Shift + Enter 换行
                </p>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] disabled:bg-[#86868b] disabled:cursor-not-allowed text-white rounded-xl transition-all duration-150 flex items-center gap-2 text-[14px] font-medium shadow-sm"
                >
                  <Send className="w-[16px] h-[16px]" strokeWidth={1.5} />
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
