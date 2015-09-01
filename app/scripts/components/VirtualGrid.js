import React from 'react';
import Utils from '../utils'

class VirtualGrid extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.getVirtualState(this.props);
    }

    getSizes(view, list) {
        list.height = list.height || list.bottom - list.top;
        
        return {
            top: Math.max(0, Math.min(view.top - list.top)),
            bottom: Math.max(0, Math.min(list.height, view.bottom - list.top))
        };
    }
    
    getItems(viewTop, viewHeight, listTop, itemHeight, itemCount, buffer, columns) {
        if (itemCount === 0 || itemHeight === 0) return {
            itemsInView: 0
        };
        
        let listHeight = itemHeight * itemCount;
        
        let listBox = {
            top: listTop,
            height: listHeight,
            bottom: listTop + listHeight
        };

        let bufferHeight = (buffer/columns) * itemHeight;
        viewTop -= bufferHeight;
        viewHeight += bufferHeight * 2;

        let viewBox = {
            top: viewTop,
            bottom: viewTop + viewHeight
        };
        
        if (viewBox.bottom < listBox.top) return {
            itemsInView: 0
        };
        
        if (viewBox.top > listBox.bottom) return {
            itemsInView: 0
        };
        
        let listViewBox = this.getSizes(viewBox, listBox);
        let firstItemIndex = Math.max(0,  Math.floor(listViewBox.top / itemHeight));
        let lastItemIndex = Math.ceil(listViewBox.bottom / itemHeight) - 1;
        let itemsInView = lastItemIndex - firstItemIndex + 1;

        let result = {
            firstItemIndex: firstItemIndex,
            lastItemIndex: lastItemIndex,
            itemsInView: itemsInView,
        };
        
        return result;
    }

    getVirtualState(props) {
        let state = {
            items: [],
            bufferStart: 0,
            height: 0
        };
        
        if (typeof props.container === 'undefined' || props.items.length === 0 || props.itemHeight <= 0){
            return state;
        }
        
        let items = props.items;
        state.height = (props.items.length/props.columns) * props.itemHeight;

        let container = props.container;
        let viewHeight;

        if(typeof container.innerHeight !== 'undefined'){
            viewHeight = container.innerHeight;
        }else{
            viewHeight = container.clientHeight;
        }
        
        if (viewHeight <= 0){
            return state;
        }
        
        let list = React.findDOMNode();
        let offsetTop = Utils.topDifference(list, container);
        
        let viewTop;
        if(typeof container.scrollY !== 'undefined'){
            viewTop = container.scrollY;
        }else{
            viewTop = container.scrollTop;
        }

        let renderStats = this.getItems(viewTop, viewHeight, offsetTop, props.itemHeight, items.length, props.buffer, props.columns);
        
        if (renderStats.itemsInView.length === 0){
             return state;
        }

        state.items = items.slice(renderStats.firstItemIndex * props.columns, renderStats.lastItemIndex * props.columns);
        state.bufferStart = renderStats.firstItemIndex * props.itemHeight;
        
        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.bufferStart !== nextState.bufferStart) return true;
        if (this.state.height !== nextState.height) return true;
        
        let equal = Utils.areArraysEqual(this.state.items, nextState.items);
        return !equal;
    }

    componentWillReceiveProps(nextProps) {
        let state = this.getVirtualState(nextProps);

        this.props.container.removeEventListener('scroll', this.onScrollDebounced);
        this.onScrollDebounced = Utils.debounce(this.onScroll.bind(this), 0, false);
        nextProps.container.addEventListener('scroll', this.onScrollDebounced);
        this.setState(state);
    }

    componentWillMount() {
        this.onScrollDebounced = Utils.debounce(this.onScroll.bind(this), 0, false);
    }

    componentDidMount() {
        let state = this.getVirtualState(this.props);
        this.setState(state);
        this.props.container.addEventListener('scroll', this.onScrollDebounced);
    }

    componentWillUnmount() {
        this.props.container.removeEventListener('scroll', this.onScrollDebounced);
    }

    onScroll() {
        let state = this.getVirtualState(this.props);
        this.setState(state);
    }

    visibleItems() {
        return this.state.items;
    }

    render() {
        return (
            React.createElement(this.props.tagName, React.__spread({},  this.props, {style: {boxSizing: 'border-box', height: this.state.height, paddingTop: this.state.bufferStart}}), 
                this.state.items.map(this.props.renderItem)
            )
        );
    }
}

VirtualGrid.propTypes = {
    items: React.PropTypes.array.isRequired,
    itemHeight: React.PropTypes.number.isRequired,
    columns: React.PropTypes.number.isRequired,
    renderItem: React.PropTypes.func.isRequired,
    container: React.PropTypes.object.isRequired,
    tagName: React.PropTypes.string.isRequired,
    buffer: React.PropTypes.number
}

VirtualGrid.defaultProps = {
    container: typeof window !== 'undefined' ? window : undefined,
    tagName: 'div',
    buffer: 0
}

export default VirtualGrid