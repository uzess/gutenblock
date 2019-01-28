import { Component, Fragment, Panel, HeightResizer } from '../../helpers';
import InspectorPanel from './inspector';

export default class Edit extends Component{

	constructor( props ){
		super( props );
	}

	render(){

		const { attributes, setAttributes, isSelected, className, toggleSelection } = this.props;
		const height = attributes.height ? attributes.height : 100;
		const cls = isSelected ? className + ' selected' : className;

		return(
			<div className={ cls }>
				<InspectorPanel data={ this.props } />
				<HeightResizer defaultHeight={ 100 } toggleSelection={ toggleSelection } height={ height } cb={ setAttributes } />
			</div>
		);
	}
}