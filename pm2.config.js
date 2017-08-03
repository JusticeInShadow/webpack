/**
 * Created by Xufeng.Yang on 2017/2/22.
 */
module.exports = {
    apps: [{
        name: "financial",
        script: "./server.js",
        watch: false,
        ignore_watch: ['node_modules', 'logs'],
        error_file: './logs/pm2/err_test.log',
        out_file: './logs/pm2/out_test.log',
        env_test: {
            "NODE_ENV": "test",
        },
        env_product: {
            "NODE_ENV": "product",
        }
    }]
};