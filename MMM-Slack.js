Module.register('MMM-Slack',{
	defaults: {
        showLatestMessageOnStartup: false,
        showUserName: true,
	width: "400px",
	height: "400px",
	fontSize: "10px",
	wordSpacing: "3px",
	letterSpacing: "2px",
	lineHeight: "3px"
	},
	
	getStyles: function() {
		return ['slack.css'];
	},

	start: function() {
		this.slackMessages = [];
		this.openSlackConnection();
        var self = this;
        setInterval(function() {
            self.updateDom(1000);
        }, 10000);
	},

	openSlackConnection: function() {
		this.sendSocketNotification('START_CONNECTION', {config: this.config});
	},

	socketNotificationReceived: function(notification, payload) {
		if(notification === 'SLACK_DATA'){
			if(payload != null) {
				this.slackMessages = payload;
				this.updateDom(2.5 * 1000);
			}
		}
	},

	getDom: function() {			
         	
		var messageElement = document.createElement('div');
		messageElement.className = 'light xlarge';
		messageElement.style.width = this.config.width;
		messageElement.style.height = this.config.height;
		messageElement.style.fontSize = this.config.fontSize;
		messageElement.style.wordSpacing = this.config.wordSpacing;
		messageElement.style.letterSpacing = this.config.letterSpacing;
		messageElement.style.lineHeight = this.config.lineHeight;
		if(this.slackMessages.length > 0)
			
		{
            var randomMessageId = Math.floor(Math.random() * this.slackMessages.length);
            messageElement.innerHTML = this.slackMessages[randomMessageId].message;
            if(this.config.showUserName) {
                var userElement = document.createElement('p');
                userElement.className = 'user';
		userElement.style.fontSize = this.config.fontSize;
                userElement.innerHTML = '@' + this.slackMessages[randomMessageId].user;
			    messageElement.appendChild(userElement);
            }
		}
		return messageElement;
	}
});
