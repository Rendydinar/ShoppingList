import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../action/ItemActions';
import PropTypes from 'prop-types';


class ShoppingList extends Component {
  // setting propTypes type
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  // lifecycle componentDidMount
  componentDidMount() {
    console.log('componentDidMount');
    this.props.getItems();
    console.log(this.props);
  }

  // handle onDeleteClick
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {
  	const { items } = this.props.item;
  	return (
  		<Container>
	       <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  { this.props.isAuthenticated ?                     <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button> : null }
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
	  	</Container>
  	);
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
