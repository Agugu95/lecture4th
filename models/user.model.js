'use strict'
import { generate } from '../utils/uid.util'
import bcrypt from 'bcrypt'

// hook beforeCreate -> beforeSave -> model.user.create -> afterSave -> afterCreate
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        { // id는 자동 매칭
            uid: {
                allowNull: false,
                unique: true,
                type: 'BINARY(6)', // 12자리 6바이트
                defaultValue: () => { // 기본적으로 실행 되는 setter 함수
                    return Buffer(generate(), 'hex') // Generate의 String 값을 hex(16진수)로 변환
                    // arrow function의 this는 모듈 scope
                },
                get: function () { // 다시 Stirng으로 바꿔 줄 getter 함수
                    // 만약 Null 허용이면 반드시 if로 null 체크
                    // 여기 this는 객체의 scope
                    return Buffer(this.getDataValue('uid')).toString('hex')
                }
            },
            nickname: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING

            },
            password: {
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
            tableName: 'users',
            timestamps: true
        }
    )

    User.beforeSave(async (user, options) => { // hook으로 저장 전에 암호화를 시킴
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
        }
    })
    return User
}