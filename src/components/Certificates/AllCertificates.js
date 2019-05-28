import React, { Component } from 'react';

class AllCertificates extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        blockstack_id: "1CfgtF2dzq13RcrfXXcu76FUfad7yPzu5T"
    };

    render() { 
        return (<h1>My Certificates File</h1>);
    }
}
 
export default AllCertificates;