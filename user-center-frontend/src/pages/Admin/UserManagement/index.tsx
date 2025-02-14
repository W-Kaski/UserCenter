import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';

import { useRef } from 'react';
import { Image } from 'antd';
import { searchUsers } from '@/services/ant-design-pro/api';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'UserAccount',
    dataIndex: 'userAccount',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'AvatarUrl',
    dataIndex: 'avatarUrl',
    render: (_, record) => {
      return (
        <div>
          <Image src={record.avatarUrl} style={{ width: 30, height: 30 }} alt="avatar" />
        </div>
      );
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  },

  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'CreateTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
  },
  {
    title: 'UserRole',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: 'Users', status: 'Default' },
      1: {
        text: 'Admin',
        status: 'Success',
      },
    },
  },
  {
    title: 'IdentityCode',
    dataIndex: 'identityCode',
  },

  {
    title: 'Operation',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
    />
  );
};
