package com.eric.usercenter.model.domain.request;

import lombok.Data;

import java.io.Serializable;

/**
 * User register request
 */
@Data
public class UserRegisterRequest implements Serializable {

    private static final long serialVersionUID = -4580909833972964014L;

    private String userAccount;

    private String password;

    private String checkPassword;

    private String identityCode;

}
