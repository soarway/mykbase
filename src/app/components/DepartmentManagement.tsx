import { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Search, Building2 } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface Department {
  id: string;
  name: string;
  type: string;
  code: string;
  parentId: string | null;
  children?: Department[];
  expanded?: boolean;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: '上海酷成',
    type: '公司',
    code: 'SH001',
    parentId: null,
    expanded: true,
    children: [
      {
        id: '1-1',
        name: '研发部',
        type: '部门',
        code: 'RD001',
        parentId: '1',
        expanded: false,
        children: [
          { id: '1-1-1', name: '前端组', type: '小组', code: 'FE001', parentId: '1-1' },
          { id: '1-1-2', name: '后端组', type: '小组', code: 'BE001', parentId: '1-1' },
        ],
      },
      {
        id: '1-2',
        name: '市场部',
        type: '部门',
        code: 'MK001',
        parentId: '1',
        expanded: false,
      },
      {
        id: '1-3',
        name: '人力资源部',
        type: '部门',
        code: 'HR001',
        parentId: '1',
        expanded: false,
      },
    ],
  },
];

export function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [selectedDept, setSelectedDept] = useState<Department | null>(mockDepartments[0]);
  const [addRootDialogOpen, setAddRootDialogOpen] = useState(false);
  const [addChildDialogOpen, setAddChildDialogOpen] = useState(false);
  const [newDeptForm, setNewDeptForm] = useState({
    name: '',
    code: '',
    type: '公司',
    parentId: '',
  });

  const toggleExpand = (deptId: string) => {
    const updateExpanded = (depts: Department[]): Department[] => {
      return depts.map((dept) => {
        if (dept.id === deptId) {
          return { ...dept, expanded: !dept.expanded };
        }
        if (dept.children) {
          return { ...dept, children: updateExpanded(dept.children) };
        }
        return dept;
      });
    };
    setDepartments(updateExpanded(departments));
  };

  const renderDepartmentTree = (depts: Department[], level: number = 0) => {
    return depts.map((dept) => (
      <div key={dept.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            selectedDept?.id === dept.id
              ? 'bg-[#0071e3] text-white'
              : 'hover:bg-[#0071e3]/10 text-[#1d1d1f]'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => setSelectedDept(dept)}
        >
          {dept.children && dept.children.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(dept.id);
              }}
              className="p-0.5"
            >
              {dept.expanded ? (
                <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          ) : (
            <span className="w-5"></span>
          )}
          <span className="text-[14px]">{dept.name}</span>
        </div>
        {dept.expanded && dept.children && renderDepartmentTree(dept.children, level + 1)}
      </div>
    ));
  };

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

  const getParentDepartmentName = (parentId: string | null): string => {
    if (!parentId) return '无';
    const allDepts = getAllDepartments(departments);
    const parentDept = allDepts.find(dept => dept.id === parentId);
    return parentDept ? parentDept.name : '无';
  };

  const handleAddRootDept = () => {
    setNewDeptForm({ name: '', code: '', type: '公司', parentId: '' });
    setAddRootDialogOpen(true);
  };

  const handleAddChildDept = () => {
    if (!selectedDept) {
      alert('请先选择一个部门');
      return;
    }
    setNewDeptForm({ name: '', code: '', type: '部门', parentId: selectedDept.id });
    setAddChildDialogOpen(true);
  };

  const submitNewDept = (isRoot: boolean) => {
    if (!newDeptForm.name) {
      alert('请填写部门名称');
      return;
    }

    console.log('新建部门:', newDeptForm);
    alert(`${isRoot ? '根' : '下级'}部门创建成功！`);

    if (isRoot) {
      setAddRootDialogOpen(false);
    } else {
      setAddChildDialogOpen(false);
    }
  };

  return (
    <div className="size-full flex bg-[#f5f5f7]">
      {/* Left Panel - Department Tree */}
      <div className="w-[55%] border-r border-[#d2d2d7] bg-[#fbfbfd] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#d2d2d7]">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
            <h2 className="text-[17px] font-semibold text-[#1d1d1f]">组织结构</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddRootDept}
              className="flex-1 px-4 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all duration-150 flex items-center justify-center gap-2 text-[14px] font-medium"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              添加根部门
            </button>
            <button
              onClick={handleAddChildDept}
              className="flex-1 px-4 py-2 bg-white border border-[#d2d2d7] hover:bg-[#0071e3]/10 hover:border-[#0071e3]/30 text-[#1d1d1f] rounded-lg transition-all duration-150 flex items-center justify-center gap-2 text-[14px] font-medium"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
              添加下级
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-[#d2d2d7]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="搜索部门..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
            />
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {renderDepartmentTree(departments)}
        </div>
      </div>

      {/* Right Panel - Department Details */}
      <div className="w-[45%] bg-white flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#d2d2d7]">
          <h2 className="text-[17px] font-semibold text-[#1d1d1f]">部门信息</h2>
        </div>

        {/* Form */}
        {selectedDept ? (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-5">
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">部门名称</label>
                <input
                  type="text"
                  value={selectedDept.name}
                  readOnly
                  className="w-full px-4 py-2.5 bg-[#f5f5f7] rounded-lg border border-[#d2d2d7] text-[14px] text-[#1d1d1f]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">机构类型</label>
                <input
                  type="text"
                  value={selectedDept.type}
                  readOnly
                  className="w-full px-4 py-2.5 bg-[#f5f5f7] rounded-lg border border-[#d2d2d7] text-[14px] text-[#1d1d1f]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">上级部门</label>
                <input
                  type="text"
                  value={getParentDepartmentName(selectedDept.parentId)}
                  readOnly
                  className="w-full px-4 py-2.5 bg-[#f5f5f7] rounded-lg border border-[#d2d2d7] text-[14px] text-[#1d1d1f]"
                />
              </div>

              <div className="pt-4">
                <button className="w-full py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg font-medium text-[14px] transition-all duration-150">
                  保存修改
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#86868b] text-[14px]">
            请选择一个部门查看详情
          </div>
        )}
      </div>

      {/* Add Root Department Dialog */}
      <Dialog.Root open={addRootDialogOpen} onOpenChange={setAddRootDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f] mb-4">
              添加根部门
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">部门名称</label>
                <input
                  type="text"
                  value={newDeptForm.name}
                  onChange={(e) => setNewDeptForm({ ...newDeptForm, name: e.target.value })}
                  placeholder="请输入部门名称"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">机构类型</label>
                <div className="w-full px-4 py-2.5 bg-[#0071e3] text-white rounded-lg text-[14px] font-medium text-center">
                  公司
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Dialog.Close asChild>
                  <button className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  onClick={() => submitNewDept(true)}
                  className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
                >
                  确定
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Add Child Department Dialog */}
      <Dialog.Root open={addChildDialogOpen} onOpenChange={setAddChildDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f] mb-4">
              添加下级部门
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">上级部门</label>
                <select
                  value={newDeptForm.parentId}
                  onChange={(e) => setNewDeptForm({ ...newDeptForm, parentId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                >
                  <option value="">请选择上级部门</option>
                  {getAllDepartments(departments).map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">部门名称</label>
                <input
                  type="text"
                  value={newDeptForm.name}
                  onChange={(e) => setNewDeptForm({ ...newDeptForm, name: e.target.value })}
                  placeholder="请输入部门名称"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">机构类型</label>
                <div className="w-full px-4 py-2.5 bg-[#0071e3] text-white rounded-lg text-[14px] font-medium text-center">
                  部门
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Dialog.Close asChild>
                  <button className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  onClick={() => submitNewDept(false)}
                  className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
                >
                  确定
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
