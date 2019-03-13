const { RichText } = wp.editor;
const { Component, Fragment } = wp.element;
const save = ( { attributes } ) => {
	const {title} = attributes;
	return <Fragment>
		{ ! RichText.isEmpty( title ) && <RichText.Content
			tagName="div"
			value={ title }
		/>}
	</Fragment>
};
export default save;