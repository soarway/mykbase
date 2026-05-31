import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Lightbulb } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  children?: Department[];
}

interface NewKnowledgeBaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: '上海酷成',
    children: [
      { id: '1-1', name: '研发部' },
      { id: '1-2', name: '市场部' },
      { id: '1-3', name: '人力资源部' },
    ],
  },
];

export function NewKnowledgeBaseDialog({ open, onOpenChange }: NewKnowledgeBaseDialogProps) {
  const [knowledgeBaseName, setKnowledgeBaseName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);

  const getAllDepartments = (depts: Department[]): Department[] => {
    let result: Department[] = [];
    depts.forEach((dept) => {
      result.push(dept);
      if (dept.children) {
        result = result.concat(getAllDepartments(dept.children));
      }
    });
    return result;
  };

  const handleSubmit = () => {
    if (!knowledgeBaseName) {
      alert('请输入知识库名称');
      return;
    }
    if (!selectedDepartment) {
      alert('请选择所属部门');
      return;
    }

    console.log('新建知识库:', { knowledgeBaseName, description, selectedDepartment });
    alert('知识库创建成功！');

    // 重置表单
    setKnowledgeBaseName('');
    setDescription('');
    setSelectedDepartment('');
    onOpenChange(false);
  };

  const getDepartmentName = (deptId: string): string => {
    const allDepts = getAllDepartments(mockDepartments);
    const dept = allDepts.find(d => d.id === deptId);
    return dept ? dept.name : '';
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 w-full max-w-lg z-50">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                新建知识库
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            <div className="space-y-5">
              {/* Icon and Name */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-[#0071e3]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                    知识库名称:
                  </label>
                  <input
                    type="text"
                    value={knowledgeBaseName}
                    onChange={(e) => setKnowledgeBaseName(e.target.value)}
                    placeholder="请输入知识库名称"
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  知识库简介:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请输入知识库简介"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] resize-none"
                  rows={3}
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  所属部门
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={getDepartmentName(selectedDepartment)}
                    readOnly
                    placeholder="请选择部门"
                    className="flex-1 px-4 py-2.5 bg-[#f5f5f7] rounded-lg border border-[#d2d2d7] text-[14px] text-[#1d1d1f] cursor-not-allowed"
                    tabIndex={-1}
                  />
                  <button
                    onClick={() => setDepartmentDialogOpen(true)}
                    className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
                  >
                    选择
                  </button>
                </div>
                <p className="text-[12px] text-[#86868b] mt-2">
                  卸门选择后，下级部门均有查看权限
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Dialog.Close asChild>
                  <button className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
                >
                  新建知识库
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Department Selection Dialog */}
      <Dialog.Root open={departmentDialogOpen} onOpenChange={setDepartmentDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 w-full max-w-md z-[60]">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                选择部门
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {getAllDepartments(mockDepartments).map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setSelectedDepartment(dept.id);
                    setDepartmentDialogOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                    selectedDepartment === dept.id
                      ? 'bg-[#0071e3] text-white'
                      : 'hover:bg-[#f5f5f7] text-[#1d1d1f]'
                  }`}
                >
                  <span className="text-[14px]">{dept.name}</span>
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
