import { useState } from 'react';
import { Search, RotateCcw, Plus, Shield, X, UserPlus, ChevronDown, ChevronRight } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface AssociatedUser {
  id: string;
  account: string;
  name: string;
  status: string;
}

interface Permission {
  id: string;
  label: string;
  checked: boolean;
  children?: Permission[];
  expanded?: boolean;
}

interface Role {
  id: string;
  name: string;
  code: string;
  createTime: string;
}

const mockRoles: Role[] = [
  { id: '1', name: '管理员', code: 'admin', createTime: '2018-12-21 18:03:39' },
  { id: '2', name: '线路报修人员', code: 'test', createTime: '2018-12-20 10:59:04' },
  { id: '3', name: '财务管理', code: 'jcjf-cw', createTime: '2024-11-14 10:26:32' },
  { id: '4', name: '人事管理', code: 'jc-hr', createTime: '2024-07-17 15:53:31' },
  { id: '5', name: '资料管理人员', code: 'jc-zl', createTime: '2023-05-22 09:56:29' },
  { id: '6', name: '线路管理人员', code: 'jc-jf', createTime: '2023-03-10 14:37:43' },
];

export function RoleManagement() {
  const [roles] = useState<Role[]>(mockRoles);
  const [searchName, setSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);
  const [associateUserDialogOpen, setAssociateUserDialogOpen] = useState(false);
  const [selectUserDialogOpen, setSelectUserDialogOpen] = useState(false);
  const [authorizationDialogOpen, setAuthorizationDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newRoleForm, setNewRoleForm] = useState({
    name: '',
    code: '',
    remark: ''
  });
  const [associatedUsers] = useState<AssociatedUser[]>([
    { id: '1', account: 'xiaolong', name: '蒋晓龙', status: '正常' },
    { id: '2', account: 'fanwei', name: '樊威', status: '正常' },
    { id: '3', account: 'shiheping', name: '史和平', status: '正常' },
    { id: '4', account: '11010', name: '王永波', status: '正常' },
    { id: '5', account: 'admin', name: '管理员', status: '正常' },
  ]);
  const [availableUsers] = useState<AssociatedUser[]>([
    { id: '6', account: '60750', name: '蒋晓龙', status: '正常' },
    { id: '7', account: '00301', name: '薛孟炎', status: '正常' },
    { id: '8', account: '00311', name: '黄红亚', status: '正常' },
    { id: '9', account: '10041', name: '刘培元', status: '正常' },
    { id: '10', account: '70101', name: '翟金平', status: '正常' },
    { id: '11', account: '00681', name: '孙莉', status: '正常' },
    { id: '12', account: '00514', name: '樊威', status: '正常' },
    { id: '13', account: '00679', name: '陈立法', status: '正常' },
    { id: '14', account: '10034', name: '杨海兵', status: '正常' },
    { id: '15', account: '50260', name: '车贤瑞', status: '正常' },
  ]);
  const [searchUserAccount, setSearchUserAccount] = useState('');
  const [searchUserName, setSearchUserName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedAvailableUsers, setSelectedAvailableUsers] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'system',
      label: '系统菜单',
      checked: true,
      expanded: true,
      children: [
        { id: 'dept', label: '部门管理', checked: true },
        { id: 'user', label: '用户管理', checked: true },
        { id: 'role', label: '角色管理', checked: true },
        { id: 'settings', label: '系统设置', checked: true },
      ],
    },
    {
      id: 'knowledge',
      label: '知识库操作',
      checked: true,
      expanded: true,
      children: [
        { id: 'manage-all', label: '管理所有知识库（包含添加、删除、改名和设权限）', checked: true },
        { id: 'view-all', label: '查看所有知识库（查看所有知识库）', checked: true },
      ],
    },
  ]);

  const handleReset = () => {
    setSearchName('');
  };

  const handleAddRole = () => {
    if (!newRoleForm.name || !newRoleForm.code) {
      alert('请填写角色名称和角色编码');
      return;
    }
    if (isEditMode) {
      console.log('编辑角色:', newRoleForm);
      alert('角色更新成功！');
    } else {
      console.log('新增角色:', newRoleForm);
      alert('角色创建成功！');
    }
    setAddRoleDialogOpen(false);
    setIsEditMode(false);
    setNewRoleForm({
      name: '',
      code: '',
      remark: ''
    });
  };

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setNewRoleForm({
      name: '',
      code: '',
      remark: ''
    });
    setAddRoleDialogOpen(true);
  };

  const handleOpenEditDialog = (role: Role) => {
    setIsEditMode(true);
    setSelectedRole(role);
    setNewRoleForm({
      name: role.name,
      code: role.code,
      remark: ''
    });
    setAddRoleDialogOpen(true);
  };

  const handleOpenAssociateDialog = (role: Role) => {
    setSelectedRole(role);
    setAssociateUserDialogOpen(true);
  };

  const handleResetUserSearch = () => {
    setSearchUserAccount('');
  };

  const handleResetUserNameSearch = () => {
    setSearchUserName('');
  };

  const handleSelectAllUsers = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(associatedUsers.map(u => u.id));
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

  const handleSelectAllAvailableUsers = (checked: boolean) => {
    if (checked) {
      setSelectedAvailableUsers(availableUsers.map(u => u.id));
    } else {
      setSelectedAvailableUsers([]);
    }
  };

  const handleSelectAvailableUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedAvailableUsers([...selectedAvailableUsers, userId]);
    } else {
      setSelectedAvailableUsers(selectedAvailableUsers.filter(id => id !== userId));
    }
  };

  const handleConfirmSelectUsers = () => {
    console.log('选择的用户:', selectedAvailableUsers);
    alert(`已选择 ${selectedAvailableUsers.length} 个用户`);
    setSelectUserDialogOpen(false);
    setSelectedAvailableUsers([]);
  };

  const handleOpenAuthorizationDialog = (role: Role) => {
    setSelectedRole(role);
    setAuthorizationDialogOpen(true);
  };

  const togglePermissionExpand = (permId: string) => {
    const updateExpanded = (perms: Permission[]): Permission[] => {
      return perms.map((perm) => {
        if (perm.id === permId) {
          return { ...perm, expanded: !perm.expanded };
        }
        if (perm.children) {
          return { ...perm, children: updateExpanded(perm.children) };
        }
        return perm;
      });
    };
    setPermissions(updateExpanded(permissions));
  };

  const togglePermissionCheck = (permId: string) => {
    const updateChecked = (perms: Permission[]): Permission[] => {
      return perms.map((perm) => {
        if (perm.id === permId) {
          const newChecked = !perm.checked;
          // If has children, update all children
          if (perm.children) {
            return {
              ...perm,
              checked: newChecked,
              children: perm.children.map(child => ({ ...child, checked: newChecked }))
            };
          }
          return { ...perm, checked: newChecked };
        }
        if (perm.children) {
          const updatedChildren = updateChecked(perm.children);
          // Check if all children are checked
          const allChecked = updatedChildren.every(child => child.checked);
          return { ...perm, children: updatedChildren, checked: allChecked };
        }
        return perm;
      });
    };
    setPermissions(updateChecked(permissions));
  };

  const handleSavePermissions = () => {
    console.log('保存权限:', permissions);
    alert('权限保存成功！');
    setAuthorizationDialogOpen(false);
  };

  const totalPages = Math.ceil(roles.length / pageSize);

  return (
    <div className="size-full flex flex-col bg-[#f5f5f7]">
      {/* Header */}
      <div className="h-14 bg-[#fbfbfd] border-b border-[#d2d2d7] flex items-center px-8">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
          <h1 className="text-[21px] font-semibold text-[#1d1d1f]">角色管理</h1>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-[#fbfbfd] border-b border-[#d2d2d7]/50 px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Role Name Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[14px] text-[#86868b] whitespace-nowrap">角色名称:</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="请输入角色名称"
              className="w-56 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
            />
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

          {/* New Role Button */}
          <button
            onClick={handleOpenAddDialog}
            className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white"
          >
            <Plus className="w-[16px] h-[16px]" strokeWidth={2} />
            新增
          </button>
        </div>
      </div>

      {/* Role Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="bg-white rounded-xl border border-[#d2d2d7] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f5f5f7] border-b border-[#d2d2d7]">
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">角色名称</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">角色编码</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">创建时间</th>
                <th className="px-6 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">操作</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7]/50 transition-colors">
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{role.name}</td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{role.code}</td>
                  <td className="px-6 py-3 text-[14px] text-[#1d1d1f]">{role.createTime}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      <button
                        onClick={() => handleOpenAssociateDialog(role)}
                        className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors"
                      >
                        关联用户
                      </button>
                      <span className="text-[#d2d2d7]">|</span>
                      <button
                        onClick={() => handleOpenAuthorizationDialog(role)}
                        className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors"
                      >
                        授权
                      </button>
                      <span className="text-[#d2d2d7]">|</span>
                      <button
                        onClick={() => handleOpenEditDialog(role)}
                        className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors"
                      >
                        编辑
                      </button>
                      <span className="text-[#d2d2d7]">|</span>
                      <button className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <div className="text-[14px] text-[#86868b]">
              共 <span className="text-[#1d1d1f] font-medium">{roles.length}</span> 条数据
            </div>

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
          </div>
        </div>
      </div>

      {/* Add Role Dialog */}
      <Dialog.Root open={addRoleDialogOpen} onOpenChange={setAddRoleDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-md z-50">
            <div className="border-b border-[#d2d2d7] px-6 py-4 flex items-center justify-between">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                {isEditMode ? '编辑角色' : '新增角色'}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            <div className="p-6 space-y-4">
              {/* Role Name */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  角色名称<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRoleForm.name}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, name: e.target.value })}
                  placeholder="请输入角色名称"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              {/* Role Code */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">
                  角色编码<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newRoleForm.code}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, code: e.target.value })}
                  placeholder="请输入角色编码"
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                />
              </div>

              {/* Remark */}
              <div>
                <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">备注</label>
                <textarea
                  value={newRoleForm.remark}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, remark: e.target.value })}
                  placeholder="请输入备注"
                  rows={4}
                  className="w-full px-4 py-2.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] resize-none"
                />
              </div>
            </div>

            <div className="border-t border-[#d2d2d7] px-6 py-4 flex gap-3">
              <Dialog.Close asChild>
                <button className="flex-1 px-4 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                  取消
                </button>
              </Dialog.Close>
              <button
                onClick={handleAddRole}
                className="flex-1 px-4 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
              >
                确认
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Associate Users Dialog */}
      <Dialog.Root open={associateUserDialogOpen} onOpenChange={setAssociateUserDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-3xl max-h-[90vh] overflow-hidden z-50">
            <div className="border-b border-[#d2d2d7] px-6 py-4 flex items-center justify-between">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                角色关联用户
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-[#d2d2d7]/50 bg-[#fbfbfd]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-[14px] text-[#86868b] whitespace-nowrap">用户账号:</label>
                  <input
                    type="text"
                    value={searchUserAccount}
                    onChange={(e) => setSearchUserAccount(e.target.value)}
                    placeholder="请输入用户账号"
                    className="w-48 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                  />
                </div>

                <button className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white">
                  <Search className="w-[16px] h-[16px]" strokeWidth={2} />
                  查询
                </button>

                <button
                  onClick={handleResetUserSearch}
                  className="px-5 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#86868b] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]"
                >
                  <RotateCcw className="w-[16px] h-[16px]" strokeWidth={1.5} />
                  重置
                </button>

                <div className="flex-1"></div>

                <button
                  onClick={() => setSelectUserDialogOpen(true)}
                  className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white"
                >
                  <UserPlus className="w-[16px] h-[16px]" strokeWidth={2} />
                  选择已有用户
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-auto max-h-[calc(90vh-220px)]">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#f5f5f7] border-b border-[#d2d2d7]">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === associatedUsers.length}
                        onChange={(e) => handleSelectAllUsers(e.target.checked)}
                        className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">用户账号</th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">用户姓名</th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">状态</th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {associatedUsers.map((user) => (
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
                      <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.status}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                            编辑
                          </button>
                          <button className="text-[14px] text-[#0071e3] hover:text-[#0077ed] transition-colors">
                            取消关联
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-[#d2d2d7] px-6 py-4 bg-[#fbfbfd] flex items-center justify-end gap-4">
              <div className="text-[14px] text-[#86868b]">
                共 <span className="text-[#1d1d1f] font-medium">{associatedUsers.length}</span> 条数据
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-[#0071e3] text-white text-[14px]">
                  1
                </button>
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]">
                  <option value="10">10条/页</option>
                  <option value="20">20条/页</option>
                  <option value="50">50条/页</option>
                </select>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Select Users Dialog */}
      <Dialog.Root open={selectUserDialogOpen} onOpenChange={setSelectUserDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-3xl max-h-[90vh] overflow-hidden z-50">
            <div className="border-b border-[#d2d2d7] px-6 py-4 flex items-center justify-between">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                用户选择列表
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-[#d2d2d7]/50 bg-[#fbfbfd]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-[14px] text-[#86868b] whitespace-nowrap">用户姓名:</label>
                  <input
                    type="text"
                    value={searchUserName}
                    onChange={(e) => setSearchUserName(e.target.value)}
                    placeholder="请输入用户姓名"
                    className="w-48 px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]"
                  />
                </div>

                <button className="px-5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] rounded-lg transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-white">
                  <Search className="w-[16px] h-[16px]" strokeWidth={2} />
                  查询
                </button>

                <button
                  onClick={handleResetUserNameSearch}
                  className="px-5 py-1.5 bg-white rounded-lg border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#86868b] transition-all duration-150 flex items-center gap-2 text-[14px] font-medium text-[#1d1d1f]"
                >
                  <RotateCcw className="w-[16px] h-[16px]" strokeWidth={1.5} />
                  重置
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-auto max-h-[calc(90vh-280px)]">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#f5f5f7] border-b border-[#d2d2d7]">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        checked={selectedAvailableUsers.length === availableUsers.length}
                        onChange={(e) => handleSelectAllAvailableUsers(e.target.checked)}
                        className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">用户账号</th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">用户姓名</th>
                    <th className="px-4 py-3 text-left text-[14px] font-medium text-[#1d1d1f]">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {availableUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#d2d2d7]/50 hover:bg-[#f5f5f7]/50 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedAvailableUsers.includes(user.id)}
                          onChange={(e) => handleSelectAvailableUser(user.id, e.target.checked)}
                          className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                        />
                      </td>
                      <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.account}</td>
                      <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.name}</td>
                      <td className="px-4 py-3 text-[14px] text-[#1d1d1f]">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination and Buttons */}
            <div className="border-t border-[#d2d2d7] px-6 py-4 bg-[#fbfbfd]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[14px] text-[#86868b]">
                  共 <span className="text-[#1d1d1f] font-medium">173</span> 条数据
                </div>
                <div className="flex items-center gap-4">
                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
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
                      4
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                      5
                    </button>
                    <span className="text-[#86868b]">...</span>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                      18
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-white border border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-[14px]">
                      &gt;
                    </button>
                  </div>

                  {/* Page Size Selector */}
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f]">
                      <option value="10">10条/页</option>
                      <option value="20">20条/页</option>
                      <option value="50">50条/页</option>
                    </select>
                  </div>

                  {/* Jump to Page */}
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#86868b]">跳至</span>
                    <input
                      type="number"
                      min="1"
                      max="18"
                      className="w-16 px-2 py-1.5 bg-white rounded-lg border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[14px] text-[#1d1d1f] text-center"
                    />
                    <span className="text-[14px] text-[#86868b]">页</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Dialog.Close asChild>
                  <button className="px-6 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                    取消
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleConfirmSelectUsers}
                  className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
                >
                  确认
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Authorization Dialog */}
      <Dialog.Root open={authorizationDialogOpen} onOpenChange={setAuthorizationDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-lg max-h-[90vh] overflow-hidden z-50">
            <div className="border-b border-[#d2d2d7] px-6 py-4 flex items-center justify-between">
              <Dialog.Title className="text-[17px] font-semibold text-[#1d1d1f]">
                角色权限配置
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors">
                  <X className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </div>

            <div className="p-6 overflow-auto max-h-[calc(90vh-160px)]">
              <h3 className="text-[14px] font-medium text-[#1d1d1f] mb-4">所拥有的权限</h3>

              {/* Permission Tree */}
              <div className="space-y-2">
                {permissions.map((perm) => (
                  <div key={perm.id}>
                    {/* Parent Permission */}
                    <div className="flex items-center gap-2 py-1">
                      {perm.children && (
                        <button
                          onClick={() => togglePermissionExpand(perm.id)}
                          className="p-0.5"
                        >
                          {perm.expanded ? (
                            <ChevronDown className="w-4 h-4 text-[#1d1d1f]" strokeWidth={1.5} />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-[#1d1d1f]" strokeWidth={1.5} />
                          )}
                        </button>
                      )}
                      <input
                        type="checkbox"
                        checked={perm.checked}
                        onChange={() => togglePermissionCheck(perm.id)}
                        className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                      />
                      <label className="text-[14px] text-[#1d1d1f] cursor-pointer select-none">
                        {perm.label}
                      </label>
                    </div>

                    {/* Children Permissions */}
                    {perm.expanded && perm.children && (
                      <div className="ml-10 space-y-1 mt-1 pl-4 border-l-2 border-[#e5e5e7]">
                        {perm.children.map((child) => (
                          <div key={child.id} className="flex items-center gap-2 py-1">
                            <input
                              type="checkbox"
                              checked={child.checked}
                              onChange={() => togglePermissionCheck(child.id)}
                              className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
                            />
                            <label className="text-[14px] text-[#86868b] cursor-pointer select-none">
                              {child.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#d2d2d7] px-6 py-4 flex gap-3 justify-end">
              <Dialog.Close asChild>
                <button className="px-6 py-2.5 bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] rounded-lg transition-all text-[14px] font-medium">
                  取消
                </button>
              </Dialog.Close>
              <button
                onClick={handleSavePermissions}
                className="px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-lg transition-all text-[14px] font-medium"
              >
                保存并关闭
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
