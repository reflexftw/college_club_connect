const moment = require('moment')

function formatDiscussions(username, title, description){
    return{
        username,
        title,
        description,
        time: moment().format('h:mm a')
    }

}

function getTime(){
    return time = moment().format('h:mm a')
}

module.exports = {
    formatDiscussions,
    getTime
}