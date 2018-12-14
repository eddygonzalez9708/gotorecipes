import React, { Component } from 'react'
import '../../App.css'
import { Alert, Button } from 'reactstrap'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

class SingleRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deleted: false,
      modalIsOpen: false
    }
  }

  openModal =() => {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal =() => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#00'
  }

  closeModal =() => {
    this.setState({ modalIsOpen: false })
  }

  componentDidMount () {
    // id is undefined so I commented the code below
    // const id = this.props.match.params.id
    // axios
    //   .get(`http://localhost:5555/recipes/${id}`)
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  deleteRecipe = () => {
    axios
      .delete(`http://localhost:5555/recipes/${this.state.recipe.id}`)
      .then(response => {
        console.log('Deleting!', response)
        this.setState({ deleted: true })
      })
      .catch(error => console.log(error))
  }

  render () {
    return this.state.deleted ? (
      <Redirect to='/recipes' />
    ) : (
      <div>
        <div className='recipe-card'>
          <div className='flex-wrapper'>
            <div>
              <img
                src='https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg'
                alt='Healthy eggs'
                className='recipe-image'
              />
            </div>
            <div>
              <div className='delete-flex'>
                <h3>Healthy eggs</h3>
                <div>
                  <i className='far fa-edit fa-2x' />
                  <i
                    className='far fa-trash-alt fa-2x delete-icon'
                    onClick={this.openModal} />
                </div>
              </div>
              <div>
                <p className='recipe-description'>Fried eggs with beans and spinach, topped with salsa and hot sauce</p>
                <h5>Instructions</h5>
                <p className='recipe-instructions'>Add oil and spinach to a frying pan. Once the spinach has started shrivelling up, break your desired number of eggs into the frying pan. Soon after, add beans. Once cooked, top with salsa and hot sauce.</p>
                <h5>Ingredients</h5>
                <p className='recipe-ingredients'>eggs, black beans, spinach, salsa, hot sauce</p>
                <h5>Preptime</h5>
                <p className='recipe-preptime'>15 minutes</p>
              </div>
            </div>
          </div>
          <Alert color='info'>
            This meal is intended for <strong>breakfast</strong> but
            rules are meant to be broken.
          </Alert>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <div>
              <h4 ref={subtitle => (this.subtitle = subtitle)}>
                Are you sure you want to delete the <br /> Healthy eggs?
              </h4>
              <div className='modal-buttons'>
                <Button color='danger' onClick={this.deleteRecipe} className='margin-right'>
                  Yes, delete this recipe.
                </Button>
                <Button onClick={this.closeModal}>No, keep it.</Button>
              </div>
            </div>
          </Modal>
        </div>
        <Link to='/recipes'>
          <div className='searchbar'>View all the recipes...</div>
        </Link>
      </div>
    )
  }
}

export default SingleRecipe
