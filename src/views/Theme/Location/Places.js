import React, { Component,PropTypes  } from "react";
import {PlacesStyle} from './PlacesStyle.js';

class Places extends Component {
    static propTypes = {
        text: PropTypes.string
      };
    
      static defaultProps = {};
    
      //shouldComponentUpdate = shouldPureComponentUpdate;
    
      render() {
        return (
           <div style={PlacesStyle}>
              {this.props.text}
           </div>
        );
      }
    }

export default Places;