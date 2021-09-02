import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import fileSize from "filesize";
import Dropzone from 'react-dropzone';
const tus = require("tus-js-client");

const Uploader = (props) => {
    const [filesSelected, setFilesSelected] = useState(0);
    const [filesUploaded, setFilesUploaded] = useState(0);
    const [paused, setPaused] = useState(false);
    const [queue, setQueue] = useState([]);
    const [recentList, setRecentList] = useState([]);
    const [finishedFiles, setFinishedFiles] = useState([])
    // const [connections, setConnections] = useState({});
    // const [connectionIndex, setConnectionIndex] = useState(0);

    const selectFiles = (e) => {
        let q = [];
        if (e.target) {  // From <input type="file" ... />
            q.push(...e.target.files);
        } else {  // From dropzone
            q.push(...e);
        }
        q = q.filter(f => f.size > 0);
        setQueue(q);
    }


    const processQueue = () => {
    // let q = queue;
    console.log("queue in process", queue);
    
    while(queue.length > 0){
    
        let file = queue.shift();
        console.log('File:', file);
        // if (!file) { continue; }
        
        // let connIndex = connectionIndex;

        // Create a new tus upload
        var upload = new tus.Upload(file, {
            // Endpoint is the upload creation URL from your tus server
            endpoint: "https://master.tus.io/files/",
            // Retry delays will enable tus-js-client to automatically retry on errors
            retryDelays: [0, 1000, 3000, 5000],
            // Attach additional meta data about the file for the server
            metadata: {
                filename: file.name,
                filetype: file.type
            },
            // Callback for errors which cannot be fixed using retries
            onError: (error) => {
                console.log("Failed because: " + error)
            },
            // Callback for reporting upload progress
            onProgress: (bytesUploaded, bytesTotal) => {
                var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                // if(connections[connIndex]) {
                //     let conn = {...connections}
                //     conn[connIndex]['totalBytes'] = bytesTotal;
                //     conn[connIndex]['uploadedBytes'] = bytesUploaded;
                //     setConnections(conn);
                // }

                console.log(bytesUploaded, bytesTotal, percentage + "%")
            },
            // Callback for once the upload is completed
            onSuccess: () => {
                // let conn = {...connections};

                let numFiles = filesUploaded;
                // delete conn[connIndex];

                numFiles++;
                setFilesUploaded(numFiles);
                // setConnections(conn);

                let uploads = [...finishedFiles];
                uploads.push(file);
                setFinishedFiles([...uploads]);

                console.log("Download %s from %s", upload.file.name, upload.url)
            }
        })

        // Try to resume upload if possible
        upload.findPreviousUploads().then((previousUploads) => {
            if(previousUploads.length > 0) {
                let resumable = previousUploads.pop();    // Grab last discontinued upload to resume
                //console.log('Resuming download: ', resumable);
                upload.resumeFromPreviousUpload(resumable);
            }
        });

        // Add listeners for the pause and unpause button
        var pauseButton = document.querySelector("#pauseButton")
        var unpauseButton = document.querySelector("#unpauseButton")

        pauseButton.addEventListener("click", function () {
            upload.abort();
            console.log('paused');
        })

        unpauseButton.addEventListener("click", function () {
            upload.start();
            console.log('unpaused');
        })

        // connections[connIndex] = {
        //     upload: upload,
        //     uploadUrl: null,
        //     totalBytes: 0,
        //     uploadedBytes: 0,
        //     name: file.name,
        // };

        // let conIndex = connectionIndex;
        // conIndex++;
        
        // Start the upload
        upload.start();

        // setConnectionIndex(conIndex);
        // setConnections(connections);
        
        }
    }
    
    if(queue.length > 0){
        console.log('queue: ', queue);
        processQueue();
    }

    // console.log('filesUploaded: ', filesUploaded);
    // console.log('connections: ', connections);
    // console.log('connectionIndex: ', connectionIndex);


    // const pauseUploads = () => {
    //     setPaused(true)
    //     upload.abort();
    // }

    // const start = () => {
    //     if(paused === true) {
    //         resumeUploads();
    //         return;
    //     }
    // }

    // const resumeUploads = () => {
    //     setPaused(false)
    //     upload.start();
    // }

    return (
        <div>
            <div style={{backgroundColor: 'lightgrey', paddingLeft: '5px'}}>Import Files</div>
            <Dropzone onDrop={acceptedFiles => {selectFiles(acceptedFiles); console.log('acceptedFiles', acceptedFiles);}}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>
            <div className="col-md-2">
                <Button id='unpauseButton' variant="primary">Start</Button>
                <Button id='pauseButton' variant="outline-secondary">Pause</Button>
            </div>
            <br/>
            <div style={{backgroundColor: 'lightgrey', paddingLeft: '5px'}}>Selected Media</div>
            <div className="row mt-3">
                <div className="col-md-11">
                    <UploadList uploads={finishedFiles}/>
                </div>
            </div>
        </div>
    )
}

const UploadList = (props)=> {

    let items = [];
    for(let i in props.uploads) {
        items.push(<UploadItem key={i} item={props.uploads[i]} index={i}/>);
    }
    // console.log('items: ', items);
    if(items.length > 0) {
        return <div>
            <h2>Uploading ({items.length})</h2>
            {items}
        </div>;
    } else {
        return <div></div>;
    }
}

const UploadItem = (props) => {
    return(
        <div className='row'>
            <div className='col-md-9'>
                {props.item.name}
            </div>
        </div>
    )
}

export default Uploader;
