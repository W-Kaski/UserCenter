package com.eric.usercenter.common;

import lombok.Data;

import java.io.Serializable;


/**
 * Base response
 *
 * @param <T>
 */
@Data
public class BaseResponse<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private int code;

    private String message;

    private T data;

    public BaseResponse(int code, T data, String message) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public BaseResponse(int code, T data) {
        this.code = code;
        this.message = "";
        this.data = data;
    }

    public BaseResponse(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.message = errorCode.getMsg();
        this.data = null;
    }

    public BaseResponse(int code, String message) {
        this.code = code;
        this.message = message;
        this.data = null;
    }


    public BaseResponse(ErrorCode errorCode, String message) {
        this.code = errorCode.getCode();
        this.message = message;
        this.data = null;
    }

}
