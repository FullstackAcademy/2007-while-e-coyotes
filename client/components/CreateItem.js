import React from 'react';
import { connect } from 'react-redux';
import { createItem } from '../store/singleItemReducer';

export class CreateItem extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            price: 0,
            inventory: 100,
            rarity: 1,
            itemType: '',
                type: ('sword', 'dagger', 'bow', 'magic'),
            itemClass: '',
                type: ('adventurer', 'villain'),
            imageUrl: '',
        };
        this.save = this.save.bind(this);
    }
    save(ev) {
        ev.preventDefault();
        this.props.createItem({ name: this.state.name, history: this.props.history });
    }
    render() {
        const { name, description, price, imageUrl, inventory, rarity, itemType, itemClass } = this.state;
        const { save } = this;
        return (
            <div>
                <form onSubmit={ save }>
                    <div>Item Name:</div>
                    <input value={ name } onChange={ ev => this.setState({ name: ev.target.value }) } />
                    <div>Item Description: </div>
                    <input value={ description } onChange={ ev => this.setState({ description: ev.target.value }) } />
                    <div>Item Price: $</div>
                    <input value={ price } onChange={ ev => this.setState({ price: ev.target.value }) } />
                    <div>Item imageUrl: </div>
                    <input value={ imageUrl } onChange={ ev => this.setState({ imageUrl: ev.target.value }) } />
                    <div>Item Inventory: </div>
                    <input value={ inventory } onChange={ ev => this.setState({ inventory: ev.target.value }) } />
                    <div>Item Rarity: </div>
                    <input value={ rarity } onChange={ ev => this.setState({ rarity: ev.target.value }) } />
                    <div>Item Type: </div>
                    <input value={ itemType } onChange={ ev => this.setState({ itemType: ev.target.value }) } />
                    <div>Item Class: </div>
                    <input value={ itemClass } onChange={ ev => this.setState({ itemClass: ev.target.value }) } />
                    <button disabled={ !name && !description && !price && !rarity }>Create Item</button>
                </form>
            </div>
        )
    }
};

const mapDispatch = (dispatch) => {
    return {
        createItem: (item) => { dispatch(createItem(item)) }
    }
};

export default connect(null, mapDispatch)(CreateItem);
