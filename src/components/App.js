import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import fishes from '../sample-fishes.js'
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
	componentDidMount() {
		const { params } = this.props.match;
		//first reinstate our localStorage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

  addFish = fish => {
		// 1. Take a copy of the existing state
		const fishes = { ...this.state.fishes };
		// 2. Add our new fish to that fishes variable
	  fishes[`fish${Date.now()}`] = fish;
		// 3. Set the new fishes object to state
    this.setState({ fishes });
  };
  loadFishes = () => {
		this.setState({ fishes });
  };
	addToOrder = (key) => {
		// 1. Take a copy of the existing state
		const order = { ...this.state.order};
		// 2. Add product to order or add one more
		order[key] = order[key] + 1 || 1;
		// 3. Set the new orders object to state
		this.setState({ order });
	}
	updateFish = (key, updatedFish) => {
		// 1. Take a copy of the current state
		const fishes = { ...this.state.fishes };
		// 2. Update that state
		fishes[key] = updatedFish;
		// 3. Set that to state
		this.setState({ fishes });
	}
	deleteFish = (key) => {
		// 1. take a copy of state
		const fishes = { ...this.state.fishes };
		// 2. update the state
		fishes[key] = null;
		// 3. update state
		this.setState({ fishes });
	}
	deleteOrder = (key) => {
		//1. take a copy of state
		const order = { ...this.state.order};
		//2. update the state
		delete order[key];
		//3. save the state
		this.setState({ order });
	}
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="WE MOTHERFUCKING TESTING" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key =>
							 <Fish
								 key={key}
								 index={key}
								 details={this.state.fishes[key]}
								 addToOrder={this.addToOrder}
							 />
						 )}
					</ul>
        </div>
        <Order
					 fishes={this.state.fishes}
					 order={this.state.order}
					 deleteOrder={this.deleteOrder}
				 />
        <Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					loadFishes={this.loadFishes}
					fishes={this.state.fishes}
					deleteFish={this.deleteFish}
				/>
      </div>
    );
  }
}

export default App;
