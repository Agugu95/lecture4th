'use strict'
module.exports = (sequelize, DataTypes) => {
    const Dog = sequelize.define(
        'Dog', // id는 자동 매칭
        {
            uid: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
            },
            dogName: {
                allowNull: false,
                type: DataTypes.STRING

            },
            dogType: {
                allowNull: false,
                type: DataTypes.STRING
            },
            dogAge: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED // sequlize 데이터 타입, 음수 없는 int
            },
            dogSex: {
                allowNull: false,
                type: DataTypes.STRING
            },
            profileImg: {
                allowNull: true,
                defaultValue: null,
                type: DataTypes.STRING,
                validate: {
                    isUrl: true
                }
            }
        },
        {
            tableName: 'dogs',
            timestamps: true
        }
    )
    return Dog
}