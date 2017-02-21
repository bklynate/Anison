const React = require('react');

class IndexPage extends React.Component {
  render() {
    return <html>
    	<head>
    		<link rel="stylesheet" href="css/main.css"></link>
    	</head>
    	<body>
    		<div className="userFormArea">
    			<form className="userForm">
    				<label>Enter Your Name:</label>
		  			<input id="username" autoComplete="off" /><button>Send</button>
		  		</form>
		  		<p id="errorMsg"></p>
    		</div>
				<div className="chatArea">
  				<div className="onlineUsers">
  					<h3>Online users:</h3> 
  					<div className="users"></div>
  				</div> 
		    	<div className="chat">
		  		  <ul id="messages"></ul>
		  		  <form className="messageForm">
		  		    <input id="message" autoComplete="off" placeholder="Send Message" /><button>Send</button>
		  		  </form>
		      </div>
		    </div>

	      <script src="/socket.io/socket.io.js"></script>
			  <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
			  <script src="js/script.js"></script>
		  </body>
		</html>
  }
}

module.exports = IndexPage;
