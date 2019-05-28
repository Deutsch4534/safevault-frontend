import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import 'antd/dist/antd.css';



const Dragger = Upload.Dragger;
const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      // generateHash();
        console.log("Info is: ", info);
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);

      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class FileUpload extends Component {
    constructor(props) {
        super(props);
    }

    state = {

    };

    render() {
        return (

            <div>
                <h1>Upload files.</h1>
                <br />
                <br />
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                    </p>
                </Dragger>,
            </div>

        );
    }
}

export default FileUpload;
