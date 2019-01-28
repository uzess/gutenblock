import { Panel, Component, Inspector, RangeControl, __ } from '../../helpers';
export default class InspectorPanel extends Component{
	
	constructor( props ){
		super( props );
	}

	render(){

		const { setAttributes, attributes } = this.props.data;
		const height = attributes.height ? attributes.height : 100;

		return(
			<Inspector>
				<Panel title={ __( 'Spacer Settings', 'evision-blocks' ) } initial-open={true}>
					<RangeControl
				        label={ __( 'Space', 'evision-blocks' ) }
				        value={ height }
				        onChange={ ( height ) => { setAttributes( { height } ) } }
				        min={ 2 }
				        max={ 1000 }
				    />
				</Panel>
			</Inspector>
		);
	}
}