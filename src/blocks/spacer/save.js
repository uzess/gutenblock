const Save = ( { className, attributes } ) => {

	const { height } = attributes;
	return ( <div style={ { height: parseInt( height ) } }><span className="data-height" style="display:none">{ height }</span></div> );
};

export default Save;