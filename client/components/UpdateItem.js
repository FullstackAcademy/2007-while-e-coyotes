import React from 'react';
import { connect } from 'react-redux';
import { updateItem } from '../store/singleItemReducer'
import { getItems } from '../store/itemsReducer'


export class UpdateItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            price: 0,
            imageUrl: '',
        };
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        this.props.getItems();
    }
    save(ev) {
        ev.preventDefault();
        this.props.updateItems({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            imageUrl: this.state.imageUrl,
            id: this.props.match.params.id,
            history: this.props.history
        });
    }
    render() {
        const { name, description, price, imageUrl } = this.state;
        const { save } = this;
        return (
            <div>
                <form onSubmit={ save }>
                    <div>Item Name: </div>
                    <input value={ name } onChange={ ev => this.setState({ name: ev.target.value }) } />
                    <div>Item Description: </div>
                    <input value={ description } onChange={ ev => this.setState({ description: ev.target.value }) } />
                    <div>Item Price: $</div>
                    <input value={ price } onChange={ ev => this.setState({ price: ev.target.value }) } />
                    <div>Item imageUrl: </div>
                    <input value={ imageUrl } onChange={ ev => this.setState({ imageUrl: ev.target.value }) } />
                    <button>Update Item</button>
                </form>
            </div>
        )
    }
};

const mapState = ({ items }) => {
    return {
        items
    };
};

const mapDispatch = (dispatch) => {
    return {
        getItems: () => dispatch(getItems()),
        updateItem: (item) => { dispatch(updateItem(item)) }
    }
};

export default connect(mapState, mapDispatch)(UpdateItem);
