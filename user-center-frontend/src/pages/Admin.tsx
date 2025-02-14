import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Outlet } from 'umi';
//

const Admin: React.FC = () => {
  return (
    <PageContainer>
      <Outlet></Outlet>
    </PageContainer>
  );
};
export default Admin;
