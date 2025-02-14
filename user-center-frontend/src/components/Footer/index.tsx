import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'Author Name',
          title: 'Eric Wang',
          href: 'https://w-kaski.github.io/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> GitHub</>,
          href: 'https://github.com/W-kaski',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
