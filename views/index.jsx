const React = require('react');

class IndexPage extends React.Component {
  render() {
    return <body>
    				<div>Hello {this.props.name}</div> 
			    	<div className="chat">
			  		  <ul id="messages"></ul>
			  		  <form action="">
			  		    <input id="message" autoComplete="off" placeholder="Send Message" /><button>Send</button>
			  		  </form>
			      </div>
			      <script src="/socket.io/socket.io.js"></script>
					  <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
					  <script src="js/script.js"></script>
		      </body>
  }
}

module.exports = IndexPage;
