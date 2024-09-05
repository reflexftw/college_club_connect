const socket = io();

const joinBtns = document.querySelectorAll('.join-button')
const discussionBtn = document.getElementById('startBtn')
const clubInfo = document.getElementById('club-info')



const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room)
socket.on('discussion', data =>{
    showDiscussion(data)
})


socket.on('post-comment', data=>{
    console.log(data)
    showComment(data)
})
clubInfo.innerHTML =`<h2 id="club-name">${room} Club</h2>
<p id="club-description">We welcome you to our platform.</p>`

socket.emit('join-room', {username, room})

discussionBtn.addEventListener('click', e=>{
    console.log('tapped')
    e.preventDefault()
    const title = document.getElementById('discussion').value
    const description = document.getElementById('description').value

    // const d = {
    //     'room': 'Robotics',
    //     'msg': msg
    // }
    // socket.emit('discussion-start', ({
    //     room : d.room,
    //     msg : d.msg
    // }))

    socket.emit('discussion-create',({title,description,room}))
})


function showComment(data){
    const replyEl = document.getElementById('reply')
    const threadTopicsDiv = document.querySelector('.thread-topics');
    const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <div class="comment-author">${data.username}</div>
                <div class="comment-text">${data.comment}</div>
                <div class="comment-time">${data.time}</div> </br>
            `;
            replyEl.appendChild(commentDiv);
            threadTopicsDiv.appendChild(replyEl);       
}

function showDiscussion(data){
    const discussionContainer = document.getElementById('discussion-container');
    const discussionElement = discussionContainer.querySelector('.thread-topics').cloneNode(true);
    discussionElement.querySelector('#thread-title p b').textContent = data.title;
    discussionElement.querySelector('#thread-description p').textContent = data.description;
    discussionElement.querySelector('#thread-author a').textContent = data.username;
    discussionElement.querySelector('#posted-time').textContent = data.time;
    discussionContainer.appendChild(discussionElement);          
}




