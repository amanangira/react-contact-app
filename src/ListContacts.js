import React from 'react';
import PropTypes from 'prop-types';

class ListContacts extends React.Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: ''
    }
    updateQuery(query){
        this.setState(() => ({
            query: query.trim()
        }))
    }
    clearQuery = () => {this.updateQuery('')}
    render(){
        const query = this.state.query;
        const { contacts, onDeleteContact } = this.props;

        const visibleContacts = query === '' 
        ? contacts 
        : contacts.filter((c) => ( c.name.toLowerCase().includes(query.toLowerCase()) ));
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search Contacts"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    >
                    </input>
                </div>
                <ol className="contact-list">
                    {visibleContacts.map( 
                            (user) => (
                                <li 
                                    className="contact-list-item" 
                                    key={user.id}>
                                    <div 
                                        className='contact-avatar'
                                        style={{
                                            backgroundImage: `url(${user.avatarURL})`
                                        }}
                                    >
                                    </div>
                                    <div className='contact-details'>
                                        <p>{user.name}</p>
                                        <p>{user.handle}</p>
                                    </div>
                                    <button 
                                        className='contact-remove'
                                        onClick={ () => onDeleteContact(user) }
                                    >
                                        
                                    </button>
                                </li>
                            )
                        )
                    }
                </ol>
                {contacts.length !== visibleContacts.length && (
                    <div
                        className="showing-contacts"
                    >
                        <span> Now showing {visibleContacts.length} of {contacts.length} contacts
                        <button
                            onClick={this.clearQuery}
                        >Show all</button>
                        </span>
                    </div>
                )}
            </div>
        )
    }
}

export default ListContacts