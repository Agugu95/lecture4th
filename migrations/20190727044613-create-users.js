'use strict'

module.exports = { // mygrated 명령어
  up: (queryInterface, Sequelize) => { // 타임스탬프에 맞추어 DB 싱크
    return queryInterface.createTable('users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        uid: {
          allowNull: false,
          type: 'BINARY(6)' // 12자짜리 바이너리 스트링 6바이트
        },
        nickname: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING

        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        profileImg: {
          allowNull: true,
          defaultValue: null,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  },

  down: (queryInterface, Sequelize) => { // 내역 되돌리기 (undo droptable)
    return queryInterface.dropTable('users')

  }
}
