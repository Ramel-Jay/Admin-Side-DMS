module.exports = (sequelize, DataType) => {
    const News = sequelize.define("News", {
        caption: {
            type: DataType.STRING, 
        },
        image: {
            type: DataType.STRING
        },
    });
    return News;
}