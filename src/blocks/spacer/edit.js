import { Component, Fragment, Panel } from '../../helpers';
import InspectorPanel from './inspector';

export default class Edit extends Component{

	constructor( props ){
		super( props );
	}

	render(){

		const { attributes, setAttributes, isSelected, className } = this.props;
		const height = attributes.height ? attributes.height : 10;

		const cls = isSelected ? className + ' selected' : className;
		
		return(
			<div className={ cls } style={ { height: height + 'px' } }>
				<InspectorPanel data={ this.props } />
			</div>
		);
	}
}