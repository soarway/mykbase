import { useState } from 'react';
import { Search, RotateCcw, Plus, FileText, ChevronDown, Users, Eye, EyeOff, X, Mountain, Upload, ChevronRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface Department {
  id: string;
  name: string;
  children?: Department[];
  expanded?: boolean;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: '上海酷成',
    expanded: true,
    children: [
      {
        id: '1-1',
        name: '研发部',
        expanded: false,
        children: [
          { id: '1-1-1', name: '前端组' },
          { id: '1-1-2', name: '后端组' },
        ],
      },
      { id: '1-2', name: '市场部' },
      { id: '1-3', name: '人力资源部' },
      { id: '1-4', name: '总裁办' },
      { id: '1-5', name: '工程技术部' },
      { id: '1-6', name: '智慧轨道' },
      { id: '1-7', name: '上海技服' },
    ],
  },
];

interface User {
  id: string;
  account: string;
  name: string;
  gender: string;
  phone: string;
  department: string;
  status: string;
}

const mockUsers: User[] = [
  { id: '1', account: 'shjd', name: '机电中心', gender: '男', phone: '13910000001', department: '', status: '正常' },
  { id: '2', account: '00057', name: '戴骏芒', gender: '男', phone: '13585683431', department: '总裁办', status: '正常' },
  { id: '3', account: '18187781597', name: '钟晓权', gender: '男', phone: '18187781597', department: '工程技术部', status: '正常' },
  { id: '4', account: 'laixing', name: '赖兴', gender: '男', phone: '18375982443', department: '工程技术部', status: '正常' },
  { id: '5', account: 'wangjilun', name: '汪继伦', gender: '男', phone: '13524551922', department: '工程技术部', status: '正常' },
  { id: '6', account: '61020-1', name: '张绍省小号', gender: '男', phone: '19051051635', department: '智慧轨道', status: '正常' },
  { id: '7', account: '61020', name: '张绍省大号', gender: '男', phone: '15295423199', department: '智慧轨道', status: '正常' },
  { id: '8', account: '00029', name: '张茂新', gender: '', phone: '18616578992', department: '', status: '正常' },
  { id: '9', account: '13861442638', name: '万家乐', gender: '男', phone: '13861442638', department: '上海技服', status: '正常' },
];

export function UserManagement() {
  const [users] = useState<User[]>(mockUsers);
  const [searchAccount, setSearchAccount] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchGender, setSearchGender] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [deptSelectDialogOpen, setDeptSelectDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [newUserForm, setNewUserForm] = useState({
    account: '',
    password: '',
    confirmPassword: '',
    name: '',
    employeeId: '',
    role: '',
    department: '',
    departmentId: '',
    avatar: '',
    gender: '',
    email: '',
    phone: ''
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleReset = () => {
    setSearchAccount('');
    setSearchName('');
    setSearchGender('');
    setSearchStatus('');
  };

  const toggleDeptExpand = (deptId: string) => {
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

  const handleSelectDepartment = (dept: Department) => {
    setNewUserForm({ ...newUserForm, department: dept.name, departmentId: dept.id });
    setDeptSelectDialogOpen(false);
  };

  const renderDepartmentTree = (depts: Department[], level: number = 0) => {
    return depts.map((dept) => (
      <div key={dept.id}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0071e3]/10 cursor-pointer transition-colors text-[#1d1d1f]"
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => handleSelectDepartment(dept)}
        >
          {dept.children && dept.children.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDeptExpand(dept.id);
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

  const totalPages = Math.ceil(users.length / pageSize);

  const handleAddUser = () => {
    if (!newUserForm.account || !newUserForm.password || !newUserForm.name) {
      alert('请填写必填项');
      return;
    }
    if (newUserForm.password !== newUserForm.confirmPassword) {
      alert('两次密码输入不一致');
      return;
    }
    console.log('新增用户:', newUserForm);
    alert('用户创建成功！');
    setAddUserDialogOpen(false);
    setNewUserForm({
      account: '',
      password: '',
      confirmPassword: '',
      name: '',
      employeeId: '',
      role: '',
      department: '',
      departmentId: '',
      avatar: '',
      gender: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="size-full flex flex-col bg-[#f5f5f7]">
      {/* Header */}
      <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center px-8">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
          <h1 className="text-[21px] font-semibold text-[#1d1d1f]">用户管理</h1>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-[#fbfbfd] border-b border-[#d2d2d7]/50 px-8 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Account Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-[#86868b] whitespace-nowrap">账号:</label>
            <input
              type="text"
              value={searchAccount}
              onChange={(e) => setSearchAccount(e.target.value)}
              placeholder="请输入账号"
              className="w-40 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
            />
          </div>

          {/* Name Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-[#86868b] whitespace-nowrap">名字:</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="请输入名字"
              className="w-40 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
            />
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-[#86868b] whitespace-nowrap">性别:</label>
            <select
              value={searchGender}
              onChange={(e) => setSearchGender(e.target.value)}
              className="w-40 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
            >
              <option value="">请选择性别</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-[#86868b] whitespace-nowrap">用户状态:</label>
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="w-40 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
            >
              <option value="">请选择状态</option>
              <option value="正常">正常</option>
              <option value="冻结">冻结</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white">
            <Search className="w-[16px] h-[16px]" strokeWidth={2} />
            查询
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="px-5 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#86868b] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]"
          >
            <RotateCcw className="w-[16px] h-[16px]" strokeWidth={1.5} />
            重置
          </button>

          <div className="flex-1"></div>

          {/* New User Button */}
          <button
            onClick={() => setAddUserDialogOpen(true)}
            className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white"
          >
            <Plus className="w-[16px] h-[16px]" strokeWidth={2} />
            新增
          </button>
        </div>
      </div>

      {/* User Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-xl border border-[#d2d2d7] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f5f7] border-b border-[#d2d2d7]">
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">用户账号</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">用户姓名</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">头像</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">性别</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">手机号</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">部门</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">状态</th>
                <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7]/50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                    />
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.account}</td>
                  <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.name}</td>
                  <td className="px-4 py-3">
                    <FileText className="w-6 h-6 text-[#86868b]" strokeWidth={1.5} />
                  </td>
                  <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.gender}</td>
                  <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.phone}</td>
                  <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.department}</td>
                  <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.status}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                        编辑
                      </button>
                      <button className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                        删除
                      </button>
                      <button className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                        冻结
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-[14px] text-[#86868b]">
            共 <span className="text-[#1d1d1f] font-medium">{users.length}</span> 条数据
          </div>

          <div className="flex items-center gap-4">
            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-[14px] transition-all ${
                    currentPage === page
                      ? 'bg-[#0071e3] text-white'
                      : 'bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7]'
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 7 && (
                <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                  &gt;
                </button>
              )}
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
              >
                <option value="10">10条/页</option>
                <option value="20">20条/页</option>
                <option value="50">50条/页</option>
                <option value="100">100条/页</option>
              </select>
            </div>

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

      {/* Add User Dialog */}
      <Dialog.Root open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-lg max-h-[90vh] overflow-y-auto z-50">
            <div className="sticky top-0 bg-white border-b border-[#d2d2d7] px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                新增用户
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            <div className="p-6 space-y-4">
              {/* User Account */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  用户账号<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUserForm.account}
                  onChange={(e) => setNewUserForm({ ...newUserForm, account: e.target.value })}
                  placeholder="请输入用户账号"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              {/* Login Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  登录密码<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    placeholder="登录密码"
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  确认密码<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={newUserForm.confirmPassword}
                    onChange={(e) => setNewUserForm({ ...newUserForm, confirmPassword: e.target.value })}
                    placeholder="请输入确认密码"
                    className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* User Name */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  用户姓名<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="请输入用户姓名"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">工号</label>
                <input
                  type="text"
                  value={newUserForm.employeeId}
                  onChange={(e) => setNewUserForm({ ...newUserForm, employeeId: e.target.value })}
                  placeholder="请输入工号"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">角色</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                >
                  <option value="">请选择角色</option>
                  <option value="管理员">管理员</option>
                  <option value="普通用户">普通用户</option>
                  <option value="访客">访客</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">所属部门</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUserForm.department}
                    placeholder="请选择所属部门"
                    className="flex-1 px-4 py-2.5 bg-[#f5f5f7] rounded-lg border border-[#d2d2d7] text-[14px] text-[#1d1d1f] cursor-not-allowed"
                    readOnly
                    tabIndex={-1}
                  />
                  <button
                    type="button"
                    onClick={() => setDeptSelectDialogOpen(true)}
                    className="px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
                  >
                    选择
                  </button>
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">头像</label>
                <div className="flex flex-col items-center justify-center py-8 px-4 bg-[#f5f5f7] rounded-lg border-2 border-dashed border-[#d2d2d7] hover:border-[#0071e3]/40 transition-all cursor-pointer">
                  <Mountain className="w-12 h-12 text-[#86868b] mb-2" strokeWidth={1.5} />
                  <span className="text-[14px] text-[#86868b]">上传</span>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">性别</label>
                <select
                  value={newUserForm.gender}
                  onChange={(e) => setNewUserForm({ ...newUserForm, gender: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                >
                  <option value="">请选择性别</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">邮箱</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  placeholder="请输入邮箱"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">手机号码</label>
                <input
                  type="tel"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  placeholder="请输入手机号码"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-[#d2d2d7] px-6 py-4 flex gap-3 rounded-b-2xl">
              <Dialog.Close asChild>
                <button className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                  取消
                </button>
              </Dialog.Close>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
              >
                确认
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Department Selection Dialog */}
      <Dialog.Root open={deptSelectDialogOpen} onOpenChange={setDeptSelectDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-md max-h-[70vh] overflow-hidden z-50">
            <div className="bg-white border-b border-[#d2d2d7] px-6 py-4 flex items-center justify-between">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                选择部门
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
              {renderDepartmentTree(departments)}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
