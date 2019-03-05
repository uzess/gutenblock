export const adjustWidth = ( ele, width) => {
	jQuery( ele ).find( '[data-type="riseblock/column"]' ).each( ( i, ele ) => {
		jQuery( ele ).css({ width: width[ i ] + '%' });
	});
}