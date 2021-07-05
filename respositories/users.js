const { User } = require('../models')
module.exports = {
    getAllUsers() {
        return User.findAll()
    },
    getUsers(of) {
        return User.findAll({ offset: of * 5,limit: 5 })
    },
    updateUser(data) {
        const response= User.update(
            { username: data.username,email: data.email,password: data.password,role: data.role },
            { where: { id: data.id } }
        )
        return JSON.stringify(response);
    },
    deleteUser(data) {
        let ans= User.destroy({
            where: {
                id: data
            }
        });
    },
    addUser(user) { 
       User.create({ username: user.username,email: user.email,password: user.password,role: user.role,createdAt: new Date(),updatedAt: new Date()})
       .then(data => {
           return data
       })
       .catch(err => {
           return err
       })
    },
    getAdmins() { },
    getAuthors() { },
    getGuests() { },
    getUser(id) { },
    getUserByEmail(email) { },
    
    // D'autres méthodes jugées utiles
}
