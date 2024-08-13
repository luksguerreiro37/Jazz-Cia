const validate = require("validate.js");
const constraints = require("./Constraints");
const editConstraints = require("./EditConstraints");

class UserSchemas {
    createUserSchema(name, mail, password, username, phone_number) {
        const userData = { name, mail, password, username, phone_number };
        const isInvalid = validate(userData, constraints);
        return isInvalid;
    }

    editUserSchema(name, mail, password, username, phone_number) {
        const userData = { name, mail, password, username, phone_number };
        const filteredUserData = Object.fromEntries(
            Object.entries(userData).filter(([_, value]) => value !== undefined && value !== "")
        );

        const isInvalid = validate(filteredUserData, editConstraints);
        
        return isInvalid;
    }
}

module.exports = new UserSchemas();
