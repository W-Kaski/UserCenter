package com.eric.usercenter.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.eric.usercenter.common.BaseResponse;
import com.eric.usercenter.common.ErrorCode;
import com.eric.usercenter.common.ResultUtils;
import com.eric.usercenter.exception.BusinessException;
import com.eric.usercenter.model.domain.User;
import com.eric.usercenter.model.domain.request.UserLoginRequest;
import com.eric.usercenter.model.domain.request.UserRegisterRequest;
import com.eric.usercenter.service.UserService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.eric.usercenter.constant.UserConstant.ADMIN_ROLE;
import static com.eric.usercenter.constant.UserConstant.USER_LOGIN_STATE;

/**
 * User interface
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest) {
        if (userRegisterRequest == null) {
//            return ResultUtils.error(ErrorCode.PARAMS_ERROR);
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "");
        }

        String userAccount = userRegisterRequest.getUserAccount();
        String password = userRegisterRequest.getPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        String identityCode = userRegisterRequest.getIdentityCode();

        if (userAccount == null || password == null || checkPassword == null) {
            return null;
        }
        long result = userService.userRegister(userAccount, password, checkPassword, identityCode);
        return ResultUtils.success(result);
    }


    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request) {
        if (userLoginRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "");
        }

        String userAccount = userLoginRequest.getUserAccount();
        String password = userLoginRequest.getPassword();

        if (userAccount == null || password == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "");
        }
        User user = userService.userLogin(userAccount, password, request);
        return ResultUtils.success(user);
    }

    @PostMapping("/logout")
    public BaseResponse<Integer> userLogout(HttpServletRequest request) {
        if (request == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "");
        }
        Integer result = userService.userLogout(request);
        return ResultUtils.success(result);
    }

    @GetMapping("/current")
    public BaseResponse<User> getCurrentUser(HttpServletRequest request) {
        Object Obj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) Obj;
        if (user == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "");
        }
        long id = user.getId();
        user = userService.getById(id);

        user = userService.getSafedUser(user);
        return ResultUtils.success(user);
    }

    @GetMapping("/search")
    public BaseResponse<List<User>> searchUsers(String username, HttpServletRequest request) {
        if (!isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH, "you are not admin");
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotBlank(username)) {
            queryWrapper.like("username", username);

        }

        List<User> userList = userService.list(queryWrapper);

        userList = userList.stream().map(user -> userService.getSafedUser(user)).collect(Collectors.toList());

        return ResultUtils.success(userList);
    }


    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteUser(@RequestBody long id, HttpServletRequest request) {
        if (!isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH, "you are not admin");
        }

        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "delete user fail");
        }
        boolean flag = userService.removeById(id);
        return ResultUtils.success(flag);
    }


    /**
     * check if the user is admin
     *
     * @param request
     * @return
     */
    private boolean isAdmin(HttpServletRequest request) {
        // only admin can search
        Object Obj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User) Obj;

        return user != null && user.getUserRole() == ADMIN_ROLE;
    }

}
