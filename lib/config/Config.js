/**
 * Created by xufeng.yang on 2016/4/25.
 */
module.exports = {
    develop: {//开发环境配置项
        tmplsPath: "../webapp/newFrame/develop/html",//模板地址迁移出项目      //"/develop/html",//模板地址
        staticPath: "../webapp/newFrame/develop",//静态资源路径迁移出项目     //"/develop", //静态资源路径
        apiUrl: "http://172.30.1.128:7900/oneclick-services-erp",//"http://172.30.1.118:6005",//http://172.28.10.28:6004
        serverPort: 7001,
        redisUrl: "172.30.1.107",
        redisPort: "6379",
        redisPass: '',
        loginUrl: "http://127.0.0.1:3001/login"//登录页面
    },
    test: {//测试环境配置项
        tmplsPath: "./test/html",
        staticPath: "./test",
        apiUrl: "http://172.30.1.128:7900/oneclick-services-erp",
        serverPort: 80,
        redisUrl: "172.30.1.107",
        redisPort: "6379",
        redisPass: "",
        loginUrl: "http://app.ps-test.hc.com/login"//登录页面
    },
    product: {//生产环境配置项
        tmplsPath: "./product/html",  //模板地址
        staticPath: "./product", //静态资源路径
        apiUrl: "http://10.20.1.45:7900/oneclick-services-erp",
        serverPort: 3004,
        redisUrl: "r-uf668829fbaae6a4.redis.rds.aliyuncs.com",
        redisPort: "6379",
        redisPass: 'Hanchuan1006',
        loginUrl: "https://passport.harmontronics.com/login"//登录页面
    }

};