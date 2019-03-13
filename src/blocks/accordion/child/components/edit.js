const { Component, Fragment } = wp.element;
const { RichText } = wp.editor;
export default class Edit extends Component{
	render(){
		const {
			className,
			attributes: {
				title,
				content
			},
			setAttributes,
		} = this.props;
		return <Fragment>
			<RichText
				tagName="p"
				value={title}
				onChange={ ( title ) => {
					setAttributes( { title } );
				} }
				placeholder={  'Heading…' }
			/>
		</Fragment>;
	}
}