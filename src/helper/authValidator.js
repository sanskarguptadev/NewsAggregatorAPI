class validator {
    static validateRegistrationDetails(userInfo) {
        if(
            userInfo.hasOwnProperty("fullName") && userInfo.hasOwnProperty("email") && userInfo.hasOwnProperty("password") && userInfo.hasOwnProperty("preferences") 
        ) {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if(userInfo.fullName === '') {
                return {
                    "status": false,
                    "message": "FullName can not be empty"
                };
            } else if(userInfo.email === '') {
                return {
                    "status": false,
                    "message": "Email can not be empty"
                };
            } else if(userInfo.password === '') {
                return {
                    "status": false,
                    "message": "Password cannot be empty"
                };
            } else if(userInfo.preferences === '') {
                return {
                    "status": false,
                    "message": "Preferences cannot be empty"
                };
            } else if(!emailRegex.test(userInfo.email)) {
                return {
                    "status": false,
                    "message": "Email address is not correct"
                };
            }
            return {
                "status": true,
                "message": "User is Valid"
            };
        }
        return {
            "status": false,
            "message": "Data that you have provided is malformed please provide all the properties"
        };
    }

    static validateLoginDetails(userInfo) {
        if(
            userInfo.hasOwnProperty("email") && userInfo.hasOwnProperty("password")
        ) {
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if(userInfo.email === '') {
                return {
                    "status": false,
                    "message": "Email can not be empty"
                };
            } else if(userInfo.password === '') {
                return {
                    "status": false,
                    "message": "Password cannot be empty"
                };
            } else if(!emailRegex.test(userInfo.email)) {
                return {
                    "status": false,
                    "message": "Email address is not correct"
                };
            }
            return {
                "status": true,
                "message": "User is Valid"
            };
        }
        return {
            "status": false,
            "message": "Data that you have provided is malformed please provide all the properties"
        };
    }

    static validatePreferences(info) {
        if(
            info.length > 0
        ) { 
            if(info[0].split("").length === 0) {
                return {
                    "status": false,
                    "message": "Preferences cannot be empty"
                };
            } 
            return {
                "status": true,
                "message": "Valid"
            };
        }
        return {
            "status": false,
            "message": "Data that you have provided is malformed please provide all the preference"
        };
    }
}

module.exports = validator;