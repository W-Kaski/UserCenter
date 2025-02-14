package com.eric.usercenter.service;


import com.eric.usercenter.model.domain.User;
import jakarta.annotation.Resource;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


/**
 * User service test
 *
 * @author Eric
 */
@SpringBootTest
public class UserServiceTest {

    @Resource
    private UserService userService;

    @Test
    public void testAddUser() {
        User user = new User();
        user.setUsername("testHello");
        user.setUserAccount("123");
        user.setGender(0);
        user.setAvatarUrl("https://static1.srcdn.com/wordpress/wp-content/uploads/2024/11/8a68e967-32c1-46e6-a2c4-ba68d57143bd-1.jpeg");
        user.setPassword("xxx");
        user.setPhone("abc");
        user.setEmail("testEMAIL");
        user.setIsDelete(0);

        boolean result = userService.save(user);
        System.out.println(user.getId());
        Assertions.assertTrue(result);
    }

    @Test
    void userRegister() {
        String userAccount = "a1412342";
        String userPassword = "";
        String checkPassword = "123";
//        long result = userService.userRegister(userAccount, userPassword, checkPassword);
//        Assertions.assertEquals(-1, result);
//        userAccount = "123";
//        userPassword = "12345678";
//        checkPassword = "12345678";
//        result = userService.userRegister(userAccount, userPassword, checkPassword);
//        Assertions.assertEquals(-1, result);
//        userAccount = "12345678";
//        userPassword = "12345678";
//        checkPassword = "12345678";
//        result = userService.userRegister(userAccount, userPassword, checkPassword);
//        Assertions.assertEquals(-1, result);
//        userAccount = "a23456789";
//        userPassword = "12345678";
//        checkPassword = "12345678";
//        result = userService.userRegister(userAccount, userPassword, checkPassword);
//        Assertions.assertTrue(result > 0);
    }
}