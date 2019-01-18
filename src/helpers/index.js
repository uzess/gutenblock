const {Fragment} = wp.element;
export const WithSelected = ( { show, children } ) =>  show ? <Fragment>{ children }</Fragment> : false;