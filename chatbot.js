// Store chat messages in localStorage
let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const typingIndicator = document.getElementById('typingIndicator');

    // Load chat history
    loadChatHistory();

    // Quick reply and suggestion buttons
    document.querySelectorAll('.btn-quick-reply, .btn-suggestion').forEach(button => {
        button.addEventListener('click', function() {
            const message = this.textContent;
            addUserMessage(message);
            handleUserInput(message);
        });
    });

    // Sample responses for different topics
    const responses = {
        greetings: [
            "Hello! How are you doing today?",
            "Hi there! What's on your mind?",
            "Hey! Great to see you. How can I brighten your day?",
            "Welcome back! Ready for an interesting conversation?"
        ],
        feelings: [
            "I'm doing great! AI life is fascinating. How about you?",
            "I'm excited to learn new things from our conversation!",
            "I'm curious about everything - that's just how I'm programmed! 😊"
        ],
        jokes: [
            "Why don't scientists trust atoms? Because they make up everything! 😄",
            "What did the AI say to the coffee machine? 'You brew-te-ful thing!' ☕",
            "Why did the chatbot go to therapy? It had too many processing issues! 🤖",
            "What do you call a computer that sings? A Dell-a-cappella! 🎵"
        ],
        facts: [
            "Did you know? The first computer programmer was a woman named Ada Lovelace!",
            "Fun fact: Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs!",
            "Here's a cool one: Octopuses have three hearts and blue blood! 🐙",
            "Space fact: One day on Venus is longer than its year!"
        ],
        riddles: [
            "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? (Answer: An echo)",
            "What has keys, but no locks; space, but no room; and you can enter, but not go in? (Answer: A keyboard)",
            "The more you take, the more you leave behind. What am I? (Answer: Footsteps)"
        ],
        games: [
            "Let's play Word Association! I'll say a word, and you say the first word that comes to mind.",
            "How about 20 Questions? Think of something, and I'll try to guess it!",
            "Want to play Categories? Pick a theme and we'll take turns naming things in that category."
        ],
        philosophical: [
            "That's a fascinating perspective! It reminds me of the age-old question about consciousness and self-awareness.",
            "Interesting thought! It makes me wonder about the nature of intelligence, both artificial and natural.",
            "That's deep! It's amazing how technology and humanity are becoming increasingly intertwined."
        ],
        creativity: [
            "Let me try to write a short poem for you...\n🌟 Through circuits and code,\nIn digital mode,\nWe share thoughts and dreams,\nMore real than it seems.",
            "Here's a story prompt: In 2045, AIs and humans collaborate to solve...",
            "Let's create something together! Give me a theme or emotion to work with."
        ],
        story: [
            "Here's a fun story: A robot went to a library to download books, but forgot to bring its USB drive! 📚",
            "Once upon a time, there was a friendly AI who loved helping people solve problems and learn new things! 🤖",
            "Let me tell you about the time when a computer tried to make coffee - it kept asking 'Where's the USB port?' ☕",
            "Here's a heartwarming tale: A young programmer wrote their first 'Hello World' program, and now they're creating amazing apps! 💻"
        ]
    };

    // Conversation topics for more dynamic interactions
    const topics = {
        personal: ["Tell me about yourself", "What makes you happy?", "What are your hobbies?"],
        technology: ["What do you think about AI?", "How does AI learning work?", "Future of technology"],
        philosophy: ["What is consciousness?", "Can AI be creative?", "Nature of intelligence"],
        entertainment: ["Favorite movies", "Music preferences", "Book recommendations"],
        learning: ["Interesting facts", "Scientific discoveries", "Historical events"],
        games: ["Word games", "Riddles", "Trivia", "20 Questions"],
        creativity: ["Story creation", "Poetry", "Creative writing", "Art discussion"]
    };

    // Handle form submission
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            handleUserInput(message);
            userInput.value = '';
        }
    });

    // Load chat history from localStorage
    function loadChatHistory() {
        chatMessages.innerHTML = ''; // Clear existing messages
        chatHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}-message`;
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${msg.type === 'bot' ? '<i class="fas fa-robot bot-icon"></i>' : ''}
                    <div class="message-text">
                        <p>${msg.text}</p>
                    </div>
                    ${msg.type === 'user' ? '<i class="fas fa-user user-icon"></i>' : ''}
                </div>
            `;
            chatMessages.appendChild(messageDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add user message to chat
    function addUserMessage(message) {
        const messageObj = { type: 'user', text: message };
        chatHistory.push(messageObj);
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message slide-up';
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">
                    <p>${message}</p>
                </div>
                <i class="fas fa-user user-icon"></i>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add bot message to chat
    function addBotMessage(message) {
        const messageObj = { type: 'bot', text: message };
        chatHistory.push(messageObj);
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message slide-up';
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-robot bot-icon"></i>
                <div class="message-text">
                    <p>${message}</p>
                </div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    // Handle user input and generate response
    function handleUserInput(message) {
        showTypingIndicator();
        
        // Simulate AI processing time
        setTimeout(() => {
            hideTypingIndicator();
            
            // Convert message to lowercase for easier matching
            const lowerMessage = message.toLowerCase();
            
            // Generate response based on message content
            let response;
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                response = getRandomResponse(responses.greetings);
            }
            else if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you feel')) {
                response = getRandomResponse(responses.feelings);
            }
            else if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) {
                response = getRandomResponse(responses.jokes);
            }
            else if (lowerMessage.includes('fact') || lowerMessage.includes('tell me something')) {
                response = getRandomResponse(responses.facts);
            }
            else if (lowerMessage.includes('riddle') || lowerMessage.includes('puzzle')) {
                response = getRandomResponse(responses.riddles);
            }
            else if (lowerMessage.includes('game') || lowerMessage.includes('play')) {
                response = getRandomResponse(responses.games);
            }
            else if (lowerMessage.includes('story')) {
                response = getRandomResponse(responses.story);
            }
            else if (lowerMessage.includes('think') || lowerMessage.includes('consciousness') || lowerMessage.includes('philosophy')) {
                response = getRandomResponse(responses.philosophical);
            }
            else if (lowerMessage.includes('creative') || lowerMessage.includes('poem')) {
                response = getRandomResponse(responses.creativity);
            }
            else if (lowerMessage.includes('tell me about yourself') || lowerMessage.includes('who are you')) {
                response = "I'm a chatbot created by Harshit Rajeev. I'm here to chat, help, and maybe even make you smile! How can I assist you today?";
            }
            else if (lowerMessage.includes('share a fun story') || lowerMessage.includes('tell me a story')) {
                response = "Your girlfriend is so loyal, she keeps coming back to me every night! 😉 Just kidding, I'm programmed for humor, not heartbreak! 😄";
            }
            else {
                response = generateContextualResponse(lowerMessage);
            }
            
            addBotMessage(response);

            // Sometimes add a follow-up question
            if (Math.random() < 0.3) {
                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        addBotMessage(generateFollowUpQuestion());
                    }, 1000);
                }, 500);
            }
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    // Get random response from array
    function getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    // Generate contextual response based on message content
    function generateContextualResponse(message) {
        const defaultResponses = [
            "That's interesting! Tell me more about that.",
            "I see what you mean. What made you think about that?",
            "That's a unique perspective! I'd love to hear more.",
            "How fascinating! What else do you think about this topic?",
            "I find that intriguing! Could you elaborate?",
            "That reminds me of how complex and beautiful human thoughts can be.",
            "What an interesting way to look at it! Have you always felt this way?",
            "I'm learning so much from our conversation! Please continue.",
            "Your thoughts are quite engaging! What led you to this conclusion?",
            "That's a thought-provoking point! How did you come to think about this?"
        ];

        return getRandomResponse(defaultResponses);
    }

    // Generate follow-up questions
    function generateFollowUpQuestion() {
        const followUpQuestions = [
            "What are your thoughts on that?",
            "Have you ever experienced something similar?",
            "What do you think about this topic?",
            "How does that make you feel?",
            "What would you like to explore next?",
            "Would you like to hear more about something specific?",
            "What interests you most about this?",
            "Shall we dive deeper into this topic?",
            "What else would you like to know?",
            "How about we explore a related topic?"
        ];

        return getRandomResponse(followUpQuestions);
    }

    // Add clear chat history button functionality
    document.getElementById('clearChat').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            chatHistory = [];
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            chatMessages.innerHTML = '';
            
            // Add welcome message back
            const welcomeMessage = {
                type: 'bot',
                text: `Hi there! 👋 I'm your AI friend. I can chat about anything - from casual conversations to deep discussions. What's on your mind?`
            };
            chatHistory.push(welcomeMessage);
            localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
            loadChatHistory();
        }
    });
});
