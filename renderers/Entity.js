import React, { Component } from 'react';
import MapLayoutHelper from './Helper';

export default class Entity extends Component {
    constructor(props){
        super(props);
        // get Board size to correctly calculate position
        // set position, size is set in the classes
        let ratio = MapLayoutHelper.getMapToViewRatios();
        this.x = this.props.position.x * ratio.x;
        this.y = this.props.position.y * ratio.y;
    }
}