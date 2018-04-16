import React from 'react';

class StorePicker extends React.Component {
  myInput = React.createRef();

  goToStore = (event) => {
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store name</h2>
        <input
           type="text"
           ref={this.myInput}
           required
           placehorder="store name">
        </input>
        <button type="submit">Go to store</button>
      </form>
    )
  }
}

export default StorePicker;
