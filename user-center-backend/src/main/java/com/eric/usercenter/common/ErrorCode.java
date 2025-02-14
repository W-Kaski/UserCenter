package com.eric.usercenter.common;

public enum ErrorCode {

    SUCCESS(0, "ok"),
    PARAMS_ERROR(40000, "parameter error"),
    NULL_ERROR(40001, "required parameter is null"),
    NOT_LOGIN(40100, "not login"),
    NO_AUTH(40101, "no auth"),
    SYSTEM_ERROR(50000, "system error");

    private final int code;
    private final String msg;

    ErrorCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public int getCode() {
        return code;
    }
}
