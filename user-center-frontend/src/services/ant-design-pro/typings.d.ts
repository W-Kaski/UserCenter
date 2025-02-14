// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    id: number;
    username?: string;
    userAccount: string;
    password?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
    gender?: string;
    userStatus?: number;
    identityCode?: string;
    createTime?: Date;
    userRole?: number;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  /**
   * common response
   */
  type BaseResponse<T> = {
    code: number;
    message: string;
    data: T;
  }
  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };


  type RegisterParams = {
    userAccount?: string;
    password?: string;
    checkPassword?: string;
    identityCode?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
