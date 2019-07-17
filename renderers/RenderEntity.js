import React, {Component} from 'react';
import MapHelper from './Helper';

export default class RenderEntity extends Component {
    constructor(props){
        super(props);
        // get Board size to correctly calculate position
        // set position, size is set in the classes
        MapHelper.register(this);
        this.updateRatio();
    }

    updateRatio(){
        this.ratio = MapHelper.getMapToViewRatios();
    }
}