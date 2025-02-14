package com.eric.usercenter.model.domain;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;


/**
 * @TableName user
 */
@TableName(value = "user")
@Data
public class User implements Serializable {
    /**
     *
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     *
     */
    private String username;

    /**
     *
     */
    private String userAccount;

    /**
     *
     */
    private Integer gender;

    /**
     *
     */
    private String avatarUrl;

    /**
     *
     */
    private String password;

    /**
     *
     */
    private String phone;

    /**
     *
     */
    private String email;

    /**
     *
     */
    private Integer userStatus;

    /**
     *
     */
    private Date createTime;

    /**
     *
     */
    private Date updateTime;

    /**
     *
     */
    @TableLogic
    private Integer isDelete;

    /**
     * 0 : normal user  1 : admin
     */
    private Integer userRole;

    /**
     *
     */
    private String IdentityCode;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

