import { useState } from 'react';
import { MessageCircle, Plus, Send, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    title: '如何提高工作效率',
    lastMessage: '谢谢你的建议，很有帮助！',
    time: '今天 14:30',
    messages: [
      { id: '1-1', type: 'user', content: '如何提高工作效率？', timestamp: '14:25' },
      { id: '1-2', type: 'ai', content: '提高工作效率可以从以下几个方面入手：\n\n1. 时间管理：使用番茄工作法\n2. 优先级排序：先做重要且紧急的事\n3. 减少干扰：关闭不必要的通知\n4. 定期休息：保持精力充沛', timestamp: '14:26' },
      { id: '1-3', type: 'user', content: '谢谢你的建议，很有帮助！', timestamp: '14:30' },
    ],
  },
  {
    id: '2',
    title: 'Python编程问题',
    lastMessage: '了解了，谢谢！',
    time: '昨天 16:45',
    messages: [
      { id: '2-1', type: 'user', content: 'Python中如何读取CSV文件？', timestamp: '16:40' },
      { id: '2-2', type: 'ai', content: '在Python中读取CSV文件可以使用pandas库：\n\n```python\nimport pandas as pd\n\ndf = pd.read_csv("file.csv")\nprint(df.head())\n```', timestamp: '16:42' },
      { id: '2-3', type: 'user', content: '了解了，谢谢！', timestamp: '16:45' },
    ],
  },
  {
    id: '3',
    title: '健康饮食建议',
    lastMessage: '好的，我会注意的',
    time: '2天前',
    messages: [
      { id: '3-1', type: 'user', content: '请给我一些健康饮食的建议', timestamp: '10:20' },
      { id: '3-2', type: 'ai', content: '健康饮食建议：\n\n1. 多吃蔬菜水果\n2. 控制盐分摄入\n3. 适量摄入蛋白质\n4. 少吃油炸食品\n5. 保持规律饮食', timestamp: '10:21' },
      { id: '3-3', type: 'user', content: '好的，我会注意的', timestamp: '10:25' },
    ],
  },
];

export function MyAIConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [inputMessage, setInputMessage] = useState('');

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: '新会话',
      lastMessage: '',
      time: '刚刚',
      messages: [],
    };
    setConversations([newConv, ...conversations]);
    setSelectedConversation(newConv);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...selectedConversation.messages, userMessage];

    // 模拟AI响应
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '这是AI的模拟回复。实际应用中，这里会调用后台API来获取真实的AI响应。',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      };

      const newMessages = [...updatedMessages, aiMessage];
      const updatedConv = {
        ...selectedConversation,
        messages: newMessages,
        lastMessage: userMessage.content,
        time: '刚刚',
        title: selectedConversation.title === '新会话' ? inputMessage.slice(0, 20) : selectedConversation.title,
      };

      setConversations(conversations.map(c => c.id === selectedConversation.id ? updatedConv : c));
      setSelectedConversation(updatedConv);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="size-full flex overflow-hidden">
      {/* Left Sidebar - Conversation History */}
      <div className="w-[280px] border-r border-[#d2d2d7] bg-[#fbfbfd] flex flex-col">
        {/* New Conversation Button */}
        <div className="p-4 border-b border-[#d2d2d7]">
          <button
            onClick={handleNewConversation}
            className="w-full px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all duration-150 flex items-center justify-center gap-2 text-[14px] font-medium"
          >
            <Plus className="w-[16px] h-[16px]" strokeWidth={2} />
            新建会话
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`px-4 py-3 cursor-pointer border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7] transition-colors ${
                selectedConversation?.id === conv.id ? 'bg-[#f5f5f7]' : ''
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-medium text-[#1d1d1f] truncate">{conv.title}</h3>
                  <p className="text-[13px] text-[#86868b] truncate mt-0.5">{conv.lastMessage || '开始新对话'}</p>
                  <p className="text-[12px] text-[#86868b] mt-1">{conv.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0071e3]" strokeWidth={1.5} />
                <h1 className="text-[17px] font-semibold text-[#1d1d1f]">{selectedConversation.title}</h1>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {selectedConversation.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0071e3]/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-2">开始新对话</h3>
                  <p className="text-[14px] text-[#86868b] max-w-md">
                    向AI提出你的问题，获得智能回答和建议。
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-w-3xl mx-auto">
                  {selectedConversation.messages.map((message) => (
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
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-[#d2d2d7] p-6">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-end gap-3">
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
                    className="flex-1 px-4 py-3 bg-[#f5f5f7] rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="px-6 py-3 bg-[#0071e3] hover:bg-[#0077ed] disabled:bg-[#86868b] disabled:cursor-not-allowed text-white rounded-xl transition-all duration-150 flex items-center gap-2 text-[14px] font-medium shadow-sm h-fit"
                  >
                    <Send className="w-[16px] h-[16px]" strokeWidth={1.5} />
                    发送
                  </button>
                </div>
                <p className="text-[12px] text-[#86868b] mt-2">
                  按 Enter 发送，Shift + Enter 换行
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-[#86868b] text-[14px]">
            请选择或创建一个会话
          </div>
        )}
      </div>
    </div>
  );
}
