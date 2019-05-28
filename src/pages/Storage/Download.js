import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import reactFile from '../../assets/react.png';


const fileDownloader = require("downloadjs");

class Download extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        filesList: [],
    };



    onClickFile = (file) => {
        console.log("Received file is: ", file);
        fileDownloader(file);
        // download(file, `dist`).then(() => {
        //     console.log('done!');
        // });
    }

    componentDidMount() {

        let allFiles = [
            <Col lg={6} md={6} sm={12} xs={12} style={{margin: "0px 0px 20px 0px"}}>
            <Card title="Card title" bordered={true}>
            Card content
            </Card>
            </Col>
            ,
            <Col lg={6} md={6} sm={12} xs={12} style={{margin: "0px 0px 20px 0px"}}>
            <Card title="Card title" bordered={true}>
            Card content
            </Card>
            </Col>
            ,
            <Col lg={6} md={6} sm={12} xs={12} style={{margin: "0px 0px 20px 0px"}}>
            <Card title="Card title" bordered={true}>
            Card content
            </Card>
            </Col>
            ,
            <Col lg={6} md={6} sm={12} xs={12} style={{margin: "0px 0px 20px 0px"}}>
            <Card title="Card title" bordered={true}>
            Card content
            </Card>
            </Col>
        ];

        let myAllFiles = [
            <Col lg={6} md={6} sm={12} xs={12} style={{margin: "0px 0px 20px 0px", cursor: "pointer"}} onClick={() => this.onClickFile(reactFile)}>
                <Card title="Card title" bordered={true}>
                    My React File
                </Card>
            </Col>
        ];

        this.setState({
            filesList: myAllFiles
        });
    }

    render() {
        return (
            <div>
                <h1 style={{fontSize: "20px"}}>MY FILES</h1>
                <br />
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={12}>
                    {this.state.filesList}
                    </Row>
                </div>,
            </div>
          );
    }
}

export default Download;
