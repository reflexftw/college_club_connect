const moment = require('moment')

function formatComments(username, comment){
    return{
        username,
        comment,
        time: moment().format('h:mm a')
    }

}

function getTime(){
    return time = moment().format('h:mm a')
}

module.exports = {
    formatComments,
    getTime
}