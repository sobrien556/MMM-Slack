Module.register('MMM-Slack',{
	defaults: {
        showLatestMessageOnStartup: false,
        showUserName: true,
	maxWidth: "400px"
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
		if(this.slackMessages.length > 0)
			
		var wrapper = document.createElement("div");
         	wrapper.className = "wrapper";
         	wrapper.style.maxWidth = this.config.maxWidth;
		
		{
            var randomMessageId = Math.floor(Math.random() * this.slackMessages.length);
            messageElement.innerHTML = this.slackMessages[randomMessageId].message;
            if(this.config.showUserName) {
                var userElement = document.createElement('p');
                userElement.className = 'user';
                userElement.innerHTML = '@' + this.slackMessages[randomMessageId].user;
			    messageElement.appendChild(userElement);
            }
		}
		return messageElement;
	}
});
