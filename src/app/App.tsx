import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { KnowledgeBaseCard, NewKnowledgeBaseCard } from './components/KnowledgeBaseCard';
import { Login } from './components/Login';
import { DepartmentManagement } from './components/DepartmentManagement';
import { UserManagement } from './components/UserManagement';
import { RoleManagement } from './components/RoleManagement';
import { KnowledgeBaseDetail } from './components/KnowledgeBaseDetail';
import { NewKnowledgeBaseDialog } from './components/NewKnowledgeBaseDialog';
import { RecentAccess } from './components/RecentAccess';
import { MyFavorites } from './components/MyFavorites';
import { MyLikes } from './components/MyLikes';
import { MyComments } from './components/MyComments';
import { Search, Plus, Home as HomeIcon } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedKnowledgeBase, setSelectedKnowledgeBase] = useState<string | null>(null);
  const [newKnowledgeBaseDialogOpen, setNewKnowledgeBaseDialogOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');

    if (loggedIn === 'true' && loginTime) {
      const currentTime = Date.now();
      const sessionDuration = 8 * 60 * 60 * 1000; // 8小时（以毫秒为单位）

      if (currentTime - parseInt(loginTime) < sessionDuration) {
        setIsLoggedIn(true);
      } else {
        // 会话过期，清除登录状态
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('loginTime', Date.now().toString());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    setIsLoggedIn(false);
    setActiveItem('home');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const handleKnowledgeBaseClick = (title: string) => {
    setSelectedKnowledgeBase(title);
  };

  const handleBackToHome = () => {
    setSelectedKnowledgeBase(null);
    setActiveItem('home');
  };

  const handleSidebarItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (itemId === 'home') {
      setSelectedKnowledgeBase(null);
    }
  };

  const renderMainContent = () => {
    if (activeItem === 'department') {
      return <DepartmentManagement />;
    }

    if (activeItem === 'user') {
      return <UserManagement />;
    }

    if (activeItem === 'role') {
      return <RoleManagement />;
    }

    if (activeItem === 'recent') {
      return <RecentAccess />;
    }

    if (activeItem === 'favorites') {
      return <MyFavorites />;
    }

    if (activeItem === 'likes') {
      return <MyLikes />;
    }

    if (activeItem === 'comments') {
      return <MyComments />;
    }

    if (selectedKnowledgeBase) {
      return <KnowledgeBaseDetail knowledgeBaseName={selectedKnowledgeBase} onBack={handleBackToHome} />;
    }

    return (
      <>
        {/* Top Bar */}
        <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-8">
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
            <h1 className="text-[21px] font-semibold text-[#1d1d1f]">知识库首页</h1>
          </div>
          <div className="flex items-center gap-6 text-[13px] text-[#86868b]">
            <span>知识库: <span className="font-semibold text-[#1d1d1f]">12</span>个</span>
            <span className="w-px h-4 bg-[#d2d2d7]"></span>
            <span>文件数: <span className="font-semibold text-[#1d1d1f]">4032</span>个</span>
            <span className="w-px h-4 bg-[#d2d2d7]"></span>
            <span>占用空间: <span className="font-semibold text-[#1d1d1f]">234GB</span></span>
          </div>
        </div>

        {/* Search and Actions Bar */}
        <div className="bg-[#fbfbfd] border-b border-[#d2d2d7]/50 px-8 py-4">
          <div className="flex items-center gap-4">
            {/* File Name Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[14px] text-[#86868b] whitespace-nowrap">文件名:</label>
              <input
                type="text"
                placeholder=""
                className="w-56 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
              />
            </div>

            {/* Uploader Filter */}
            <div className="flex items-center gap-2">
              <label className="text-[14px] text-[#86868b] whitespace-nowrap">上传人:</label>
              <input
                type="text"
                placeholder=""
                className="w-56 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
              />
            </div>

            {/* Search Button */}
            <button className="px-4 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#86868b] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]">
              <Search className="w-[16px] h-[16px]" strokeWidth={1.5} />
              搜索文件
            </button>

            <div className="flex-1"></div>

            {/* New Knowledge Base Button */}
            <button
              onClick={() => setNewKnowledgeBaseDialogOpen(true)}
              className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white"
            >
              <Plus className="w-[16px] h-[16px]" strokeWidth={2} />
              新建知识库
            </button>
          </div>
        </div>

        {/* Knowledge Bases Grid */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
            {knowledgeBases.map((kb) => (
              <KnowledgeBaseCard
                key={kb.id}
                title={kb.title}
                fileCount={kb.fileCount}
                storage={kb.storage}
                onClick={() => handleKnowledgeBaseClick(kb.title)}
              />
            ))}
            <NewKnowledgeBaseCard onClick={() => setNewKnowledgeBaseDialogOpen(true)} />
          </div>
        </div>
      </>
    );
  };

  const knowledgeBases = [
    { id: 1, title: '我的个人知识库', fileCount: 125, storage: '209MB' },
    { id: 2, title: '行政部知识库', fileCount: 125, storage: '209MB' },
    { id: 3, title: '人力资源部知识库', fileCount: 125, storage: '209MB' },
    { id: 4, title: '技术部知识库', fileCount: 125, storage: '209MB' },
    { id: 5, title: '财务部知识库', fileCount: 125, storage: '209MB' },
    { id: 6, title: '公司行业知识库', fileCount: 125, storage: '209MB' },
  ];

  return (
    <div className="size-full flex bg-[#f5f5f7]">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeItem}
        onItemClick={handleSidebarItemClick}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderMainContent()}
      </div>

      {/* New Knowledge Base Dialog */}
      <NewKnowledgeBaseDialog
        open={newKnowledgeBaseDialogOpen}
        onOpenChange={setNewKnowledgeBaseDialogOpen}
      />
    </div>
  );
}