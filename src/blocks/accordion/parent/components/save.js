const { InnerBlocks  } = wp.editor;
const save = () => {
	return (
		<div>
			<InnerBlocks.Content />
		</div>
	);
};
export default save;