module.exports = (sequelize, DataType) => {
    const InKind = sequelize.define("InKind", {
        firstName: {
            type: DataType.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataType.STRING,
            allowNull: false,
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
        },
        number: {
            type: DataType.BIGINT,
            allowNull: false,
        },
        address: {
            type: DataType.STRING,
            allowNull: false,
        },
        type: {
            type: DataType.STRING,
            allowNull: false,
        },
        quantity: {
            type:DataType.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataType.FLOAT,
            allowNull: false,
        },
        rName: {
            type: DataType.STRING,
            allowNull: false,
        },
        rNum: {
            type: DataType.BIGINT,
            allowNull: false,
        },
        request: {
            type: DataType.BOOLEAN,
            allowNull: false,
        },
        username: {
            type: DataType.STRING,
            allowNull: false,
        },
    });

    return InKind;
};