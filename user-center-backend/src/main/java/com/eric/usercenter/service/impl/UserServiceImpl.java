package com.eric.usercenter.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eric.usercenter.common.ErrorCode;
import com.eric.usercenter.exception.BusinessException;
import com.eric.usercenter.model.domain.User;
import com.eric.usercenter.service.UserService;
import com.eric.usercenter.mapper.UserMapper;


import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.eric.usercenter.constant.UserConstant.USER_LOGIN_STATE;

/**
 * User service impl
 */
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {

    @Resource
    private UserMapper userMapper;


    private static final String SALT = "???///";


    @Override
    public long userRegister(String userAccount, String userPassword, String checkPassword, String identityCode) {

        if (StringUtils.isBlank(userAccount) || StringUtils.isBlank(userPassword)
                || StringUtils.isBlank(checkPassword) || StringUtils.isBlank(identityCode)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "necessary params are null");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "account length less than 4");
        }
        if (userPassword.length() < 8 || checkPassword.length() < 8) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "password length less than 8");
        }


        // check if the account is valid, length is between 5 and 19
        String validPatten = "^[a-zA-Z0-9_]{5,19}$";
        Matcher matcher = Pattern.compile(validPatten).matcher(userAccount);
        if (!matcher.find()) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "account format error");
        }

        // check if the password is valid
        if (!userPassword.equals(checkPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "password error");
        }

        // check if the account exists
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        long count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "account already exist");
        }


        // check identity code is valid
        queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("identityCode", identityCode);
        count = this.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "identity already exist");
        }


        // encrypt password
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

        // insert into database
        User user = new User();
        user.setUserAccount(userAccount);
        user.setPassword(encryptPassword);
        user.setIdentityCode(identityCode);
        boolean saveResult = this.save(user);

        if (!saveResult) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "save error");
        }

        return user.getId();
    }


    @Override
    public User userLogin(String userAccount, String userPassword, HttpServletRequest request) {

        if (StringUtils.isBlank(userAccount) || StringUtils.isBlank(userPassword)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "necessary params are null");
        }
        if (userAccount.length() < 4) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "account length less than 4");
        }
        if (userPassword.length() < 8) {
            return null;
        }

        // check if the account is valid, length is between 5 and 19
        String validPatten = "^[a-zA-Z0-9_]{5,19}$";
        Matcher matcher = Pattern.compile(validPatten).matcher(userAccount);
        if (!matcher.find()) {
            return null;
        }

        // encrypt password
        String encryptPassword = DigestUtils.md5DigestAsHex((SALT + userPassword).getBytes());

        // check if the account exists
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userAccount", userAccount);
        queryWrapper.eq("password", encryptPassword);
        User user = userMapper.selectOne(queryWrapper);

        if (user == null) {
            log.info("login failed, account or password is wrong");
            return null;
        }

        User safedUser = getSafedUser(user);

        // save user info in session
        request.getSession().setAttribute(USER_LOGIN_STATE, safedUser);

        return safedUser;

    }


    /**
     * logout
     *
     * @param request
     * @return
     */
    @Override
    public int userLogout(HttpServletRequest request) {
        request.getSession().removeAttribute(USER_LOGIN_STATE);
        return 1;
    }


    @Override
    public User getSafedUser(User user) {

        if (user == null) {
            return null;
        }
        // Data Masking
        User safedUser = new User();
        safedUser.setId(user.getId());
        safedUser.setUsername(user.getUsername());
        safedUser.setUserAccount(user.getUserAccount());
        safedUser.setGender(user.getGender());
        safedUser.setAvatarUrl(user.getAvatarUrl());
        safedUser.setUserRole(user.getUserRole());
        safedUser.setPhone(user.getPhone());
        safedUser.setEmail(user.getEmail());
        safedUser.setUserStatus(user.getUserStatus());
        safedUser.setCreateTime(user.getCreateTime());
        safedUser.setIdentityCode(user.getIdentityCode());
        return safedUser;
    }

}




