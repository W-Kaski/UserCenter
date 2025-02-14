package com.eric.usercenter.service;

import com.eric.usercenter.model.domain.User;
import com.baomidou.mybatisplus.extension.service.IService;
import jakarta.servlet.http.HttpServletRequest;

import java.net.http.HttpClient;

/**
 * User service
 *
 * @author Eric
 */
public interface UserService extends IService<User> {

    /**
     * User login
     *
     * @param userAccount   user account
     * @param userPassword  user password
     * @param checkPassword check password
     * @return user id
     */
    long userRegister(String userAccount, String userPassword, String checkPassword, String identityCode);


    /**
     * User login
     *
     * @param userAccount   user account
     * @param userPassword  user password
     * @return user
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);


    int userLogout(HttpServletRequest request);

    /**
     * Data Masking
     * @param user
     * @return
     */
    User getSafedUser(User user);
}
