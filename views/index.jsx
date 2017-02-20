const React = require('react');

class IndexPage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

module.exports = IndexPage;
