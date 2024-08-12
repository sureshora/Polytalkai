document.getElementById('sendMessageButton').addEventListener('click', function() {
    const message = document.getElementById('textAreaExample').value;
    if (message.trim() !== '') {
        const chatBox = document.querySelector('.chat-box');
        
        const newMessage = document.createElement('div');
        newMessage.classList.add('d-flex', 'flex-row', 'justify-content-end', 'mb-4');
        
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('p-3', 'me-3', 'border', 'bg-body-tertiary');
        messageBubble.style.borderRadius = '15px';
        messageBubble.innerHTML = `<p class="small mb-0">${message}</p>`;
        
        const avatar = document.createElement('img');
        avatar.src = customerUrl;
        avatar.alt = 'customer';
        avatar.style.width = '45px';
        avatar.style.height = '100%';
        
        newMessage.appendChild(messageBubble);
        newMessage.appendChild(avatar);
        
        chatBox.appendChild(newMessage);
        
        scrollToBottom();
        
        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_input: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                const botMessage = document.createElement('div');
                botMessage.classList.add('d-flex', 'flex-row', 'justify-content-start', 'mb-4');
                
                const botBubble = document.createElement('div');
                botBubble.classList.add('p-3', 'ms-3');
                botBubble.style.borderRadius = '15px';
                botBubble.style.backgroundColor = 'rgba(57, 192, 237, .2)';
                botBubble.innerHTML = `<p class="small mb-0">${data.response}</p>`;
                
                const botAvatar = document.createElement('img');
                botAvatar.src = chatBotAvatarUrl;
                botAvatar.alt = 'chatBot Avatar';
                botAvatar.style.width = '45px';
                botAvatar.style.height = '100%';
                
                botMessage.appendChild(botAvatar);
                botMessage.appendChild(botBubble);
                
                chatBox.appendChild(botMessage);
                
                scrollToBottom();
            } else {
                alert('Failed to get a response from the bot.');
            }
        })
        .catch(error => {
            console.error('Error fetching the response:', error);
            alert('An error occurred while getting the response from the bot.');
        });
        
        document.getElementById('textAreaExample').value = '';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('appointmentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const appointmentData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };

        fetch('/book_appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
            alert('An error occurred while booking the appointment.');
        });
    });
});

function scrollToBottom() {
    const chatBox = document.querySelector('.chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
}
