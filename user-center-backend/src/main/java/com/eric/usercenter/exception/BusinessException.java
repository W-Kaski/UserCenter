package com.eric.usercenter.exception;

import com.eric.usercenter.common.ErrorCode;

public class BusinessException extends RuntimeException{



    private final int code;
    private final String Description;
    public BusinessException(ErrorCode errorCode, String Description) {
        super(errorCode.getMsg());
        this.code = errorCode.getCode();
        this.Description = Description;
    }

    public BusinessException(String message, int code, String Description) {
        super(message);
        this.code = code;
        this.Description = Description;
    }

    public int getCode() {
        return code;
    }

    public String getDescription() {
        return Description;
    }

    public String getMessage() {
        return super.getMessage();
    }
}