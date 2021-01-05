class registerUser {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }


    register() {
        var response = {};
        var registerBody = this.body;
        return new Promise((resolve, reject) => {
            // VALIDATION FUNCTION
            getReturnValidateSchema(registerBody, registerSchema, (err, validationErrors) => {
                if (validationErrors) {
                    response.responseTimestamp = new Date();
                    response.errors = [];
                    validationErrors.forEach((vError) => {
                        response.errors.push({
                            code: 'vError',
                            message: vError.dataPath + ' ' + vError.message
                        });
                    });
                    return this.failureHandler(response, reject);
                } else {
                    return this.registerWork(registerBody, response, resolve, reject);
                }
            })
        })

    }

    registerWork(registerBody, response, resolve, reject) {
        var query = { "email": registerBody.email };
        var mongoD = new mongoQuery();
        mongoD.findOne('users', query, (err, result, data) => {
            if (err) {
                response.message = message.SERVER_ERROR;
                response.code = 500;
                response.error = err;
                return this.failureHandler(response, reject)
            }
            if (result) {
                response.message = message.EMAIL_EXISTS;
                response.code = 200;
                response.result = "Success"
                return resolve(response);
            } else {
                var tmpToken = randtoken.generate(30);
                var user = new User();
                user.email = registerBody.email;
                user.firstName = registerBody.firstName;
                user.lastName = registerBody.lastName;
                user.vcode = tmpToken;
                user.password = encryptDecrypt.setPassword(registerBody.email, registerBody.password)
                mongoD.insert(user, (err, result, data) => {
                    if (err) {
                        response.message = err.message;
                        response.code = 404;
                        return this.failureHandler(response, reject)
                    }
                    if (result) {
                        var registerEmail = new sendEmail(registerBody.email, 'accountActivation', tmpToken)
                        registerEmail.email()
                            .then(sent => {
                                sent.message = message.SUCCESSFULL_REGISTRATION;
                                return resolve(sent)
                            })
                            .catch(sentErr => {
                                return reject(sentErr)
                            })
                    }
                })
            }
        })
    }

    failureHandler(response, reject) {
        response.responseTimestamp = new Date();
        response.result = 'Failed';
        return reject(response);
    }
}