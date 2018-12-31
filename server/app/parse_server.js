/**
 * This file let you define your parse server.
 * The reason why not put all config options in .env is 
 * you may have many more options here.
 */
import path from 'path';
import { ParseServer, RedisCacheAdapter } from 'parse-server';
import dotenv from 'dotenv';

dotenv.config();
let config = process.env;
config.parseServerUrl = config.httpProtocol + "://" + config.host + ":" + config.port + config.mountPath;
let passwordPolicy;




let redisOptions = {
    host: config.rds_host,
    port: config.rds_port,
    db: config.rds_db
}
if(config.rds_passwd){
    redisOptions.password=config.rds_passwd
}
const redisCache = new RedisCacheAdapter(redisOptions);

let serverOptions = {

    appId: config.appId,
    masterKey: config.masterKey,
    appName: config.appName,
    databaseURI: config.databaseURI,
    cacheAdapter: redisCache,
    serverURL: config.parseServerUrl,
    publicServerURL:config.publicServerUrl,
    verifyUserEmails: config.verifyUserEmails == 'true' ? true : false,
    emailAdapter: {
        module: 'parsesmtp',
        options: {
            host: config.m_host,
            port: config.m_port,
            secureConnection: config.m_secureConnection == 'true' ? true : false,
            user: config.m_user,
            pass: config.m_pass,
            verificationEmailTitle: config.m_vEmailTitle,
            passwordRestTitle: config.m_RestTitle
        }


    },
    cloud:'app/'+config.cloud,
    allowClientClassCreation: config.allowClientClassCreation,
    accountLockout: { duration: ~~config.accountLockout_duration, threshold: ~~config.accountLockout_threshold },
    sessionLength: config.sessionLength,
    verbose: false

};
if (config.passwordmode_strong == 'true') {
    passwordPolicy = {
        // Two optional configs to enforce strong passwords. Either one or both can be specified.
        // If both are specified, both checks must pass to accept the password
        // 1. a RegExp object or a regex string representing the pattern to enforce
        validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
        // 2. a callback function to be invoked to validate the password
        // validatorCallback: (password) => { return validatePassword(password) },
        doNotAllowUsername: true, // optional config to disallow username in passwords
        //optional config to set a validity duration for password reset links (in seconds)
        resetTokenValidityDuration: 12 * 60 * 60, // expire after 12 hours
    }
    serverOptions.passwordPolicy = passwordPolicy;
}

const api = new ParseServer(serverOptions);


export default api; 