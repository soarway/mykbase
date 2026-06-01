import { useState } from 'react';
import { Settings, Trash2, Plus, FolderOpen, Clock, Eye, HardDrive } from 'lucide-react';

export function SystemSettings() {
  const [uploadRetentionDays, setUploadRetentionDays] = useState('3');
  const [defaultPublic, setDefaultPublic] = useState(false);
  const [scanDirectories, setScanDirectories] = useState([
    '/home/doc',
    '/var/data/documents',
  ]);
  const [newDirectory, setNewDirectory] = useState('');

  const handleAddDirectory = () => {
    if (newDirectory.trim() && !scanDirectories.includes(newDirectory.trim())) {
      setScanDirectories([...scanDirectories, newDirectory.trim()]);
      setNewDirectory('');
    }
  };

  const handleRemoveDirectory = (index: number) => {
    setScanDirectories(scanDirectories.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    alert('系统设置已保存');
  };

  const handleReset = () => {
    setUploadRetentionDays('3');
    setDefaultPublic(false);
    setScanDirectories(['/home/doc']);
    setNewDirectory('');
  };

  return (
    <div className="size-full flex flex-col overflow-hidden bg-[#f5f5f7]">
      {/* Top Bar */}
      <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
          <h1 className="text-[21px] font-semibold text-[#1d1d1f]">系统设置</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* File Management Section */}
          <div className="bg-white rounded-2xl border border-[#d2d2d7] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#d2d2d7] bg-[#fbfbfd]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0071e3]/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#0071e3]" strokeWidth={1.5} />
                </div>
                <h2 className="text-[17px] font-semibold text-[#1d1d1f]">文件管理</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Upload Retention */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <label className="text-[15px] font-medium text-[#1d1d1f] block mb-1">
                    文件删除保护期
                  </label>
                  <p className="text-[13px] text-[#86868b]">
                    上传时间小于设定天数的文件将不允许删除
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-6">
                  <input
                    type="number"
                    value={uploadRetentionDays}
                    onChange={(e) => setUploadRetentionDays(e.target.value)}
                    min="0"
                    className="w-24 px-4 py-2 bg-[#f5f5f7] rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] text-center"
                  />
                  <span className="text-[14px] text-[#86868b]">天</span>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base Settings Section */}
          <div className="bg-white rounded-2xl border border-[#d2d2d7] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#d2d2d7] bg-[#fbfbfd]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#34c759]/10 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-[#34c759]" strokeWidth={1.5} />
                </div>
                <h2 className="text-[17px] font-semibold text-[#1d1d1f]">知识库设置</h2>
              </div>
            </div>
            <div className="p-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={defaultPublic}
                  onChange={(e) => setDefaultPublic(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                />
                <div className="flex-1">
                  <span className="text-[15px] font-medium text-[#1d1d1f] block mb-1">
                    新建知识库默认公开
                  </span>
                  <p className="text-[13px] text-[#86868b]">
                    创建新的知识库时，默认对所有人可见
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Scan Directories Section */}
          <div className="bg-white rounded-2xl border border-[#d2d2d7] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#d2d2d7] bg-[#fbfbfd]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ff9500]/10 flex items-center justify-center">
                  <HardDrive className="w-4 h-4 text-[#ff9500]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h2 className="text-[17px] font-semibold text-[#1d1d1f]">扫描目录</h2>
                  <p className="text-[13px] text-[#86868b] mt-0.5">
                    系统将自动扫描以下目录中的文件并导入到知识库
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Directory List */}
              {scanDirectories.length > 0 ? (
                <div className="space-y-2">
                  {scanDirectories.map((dir, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-3 bg-[#f5f5f7] rounded-xl border border-[#d2d2d7] group hover:border-[#0071e3]/30 transition-all"
                    >
                      <FolderOpen className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                      <span className="flex-1 text-[14px] text-[#1d1d1f] font-mono">
                        {dir}
                      </span>
                      <button
                        onClick={() => handleRemoveDirectory(index)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                        title="删除目录"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" strokeWidth={1.5} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-[#86868b]" strokeWidth={1.5} />
                  </div>
                  <p className="text-[14px] text-[#86868b]">暂无扫描目录</p>
                </div>
              )}

              {/* Add Directory */}
              <div className="pt-4 border-t border-[#d2d2d7]">
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  添加新目录
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newDirectory}
                    onChange={(e) => setNewDirectory(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddDirectory();
                      }
                    }}
                    placeholder="例如: /home/documents"
                    className="flex-1 px-4 py-2.5 bg-[#f5f5f7] rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] font-mono"
                  />
                  <button
                    onClick={handleAddDirectory}
                    disabled={!newDirectory.trim()}
                    className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] disabled:bg-[#86868b] disabled:cursor-not-allowed text-white rounded-xl transition-all duration-150 flex items-center gap-2 text-[14px] font-medium shadow-sm"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2} />
                    添加
                  </button>
                </div>
                <p className="text-[12px] text-[#86868b] mt-2">
                  按 Enter 键快速添加目录
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-white rounded-xl border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] transition-all duration-150 text-[14px] font-medium"
            >
              重置
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl transition-all duration-150 text-[14px] font-medium shadow-sm"
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
