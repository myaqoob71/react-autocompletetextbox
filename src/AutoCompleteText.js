import React from 'react';
import { attribute } from 'postcss-selector-parser';
import './AutoCompleteText.css';

export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        // this.items = [
        //     'ReactJS',
        //     'Redux',
        //     'Angular',
        //     'Java',
        //     'JavaScript',
        //     'Machine Learning',
        //     'Artificial Intelligence',
        //     'Big Data',
        //     'Data Analysis'
        // ]
        this.state = {
            suggestions: [],
            text: ''
        }
    }

    onTextChanged = (e) => {
        const {items} = this.props;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0) {
            //RegExp constructor creates a regular expression object for matching text with a pattern
            const regex = new RegExp(`^${value}`,'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState({suggestions, text: value});
    }

    suggestionSelected(value) {
        this.setState( () => ({
            text: value,
            suggestions:  []
        }))
    }

    renderSuggestions() {
        // destructing suggestions attribute from the state object
        const {suggestions} = this.state;
        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li> )}
            </ul>
        )
    }

    render() {
        const {text} = this.state;
        return(
            <div className="AutoCompleteText">
                {/* assigning the method for onChange attribute */}
                <input type="text" value={text} onChange={this.onTextChanged}/> 
                {this.renderSuggestions()}
            </div>
        )
    }
}