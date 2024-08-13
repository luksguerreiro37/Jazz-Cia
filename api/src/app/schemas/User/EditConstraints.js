const editConstraints = {
    name: {
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        length: {
            maximum: 50,
            message: "deve ter no máximo 50 caracteres",
        },
    },
    mail: {
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        email: {
            email: true,
            message: "deve ser um email válido",
        },
        length: {
            maximum: 255,
            message: "deve ter no máximo 255 caracteres",
        },
    },
    password: {
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        length: {
            minimum: 8,
            message: "deve ter pelo menos 8 caracteres",
        },
    },
    username: {
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        length: {
            maximum: 50,
            message: "deve ter no máximo 50 caracteres",
        },
    },
    phone_number: {
        type: {
            type: "string",
            message: "deve ser uma string",
        },
        format: {
            pattern: /^[+]?[0-9]{10,15}$/,
            message: "deve ser um número de telefone válido",
        },
        length: {
            maximum: 20,
            message: "deve ter no máximo 20 caracteres",
        },
    },
};

module.exports = editConstraints;
