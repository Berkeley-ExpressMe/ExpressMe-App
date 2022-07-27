import logo from './logo.svg';
import { Player, LoadingSpinner, BigPlayButton } from 'video-react';
import './App.css';

import { makeStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Speech from 'react-speech';
import Table from '@mui/material/Table';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import CheckBox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
//Import useState and useEffect from react
import React, { useState, useEffect } from 'react';
//Import the PlayIcon ui

import RecordVideo from './components/RecordVideo';
import PredictIntent from './components/PredictIntent';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { alignProperty } from '@mui/material/styles/cssUtils';




//Add <Table /> component as a parameter to the PredictIntent function


const htmlDecode = content => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

function App() {
  function onSuccessPredictIntent(response) {
    console.log("Successfully predicted intent", response.data);
    var sentences = response.data.sentences;
    var contentToDisplay = "";
    //contentToDisplay = '<Table><TableHead><TableRow><TableCell>Action: </TableCell><TableCell align="right">Possible Intent :</TableCell></TableRow></TableHead><TableBody><TableRow>&nbsp;</TableRow>';
    var uniqueKey = 0;
    let rowData = [...data]
    //Iterate Sentences dict and display each sentence within it in a Dialog with Speech component
    for (var key in sentences) {
      var sentenceArr = sentences[key];
      console.log("The Action is ", key);
      console.log("The sentence is ", sentenceArr);
      //contentToDisplay += '<TableRow colSpan="2"><TableCell>Action :' + key + '</TableCell></TableRow><TableRow>&nbsp;</TableRow>';
      for (var index in sentenceArr) {

        uniqueKey++;
        console.log("The key to be pushed is ", uniqueKey);
        rowData.push({ id: uniqueKey, action: key, intent: sentenceArr[index] });
        console.log("The data to be pushed is ", rowData);
        //
        //setRows.push(rows, { key: index, action: key, intent: sentenceArr[index] });
      }
      //Iterate sentence array and display key and sentence in a table with ID Intent_table    
    }
    setData(rowData);
    contentToDisplay += "<TableRow>&nbsp;</TableRow></TableBody></Table>";
    //set the contentToDisplay to the table with ID Intent_table
    console.log("The content to display is ", contentToDisplay);
    //document.getElementById("results").innerHTML = contentToDisplay;
  }
  function onErrorPredictIntent(err) {
    //var contentToDisplay = '<div>Error getting Intent: ' + err + '</div>';
    console.log("Error predicting intent", err);
    //return (contentToDisplay);
  }
  function onSuccessPredictNlpIntent(response) {
    console.log("Successfully predicted nlp intent", response.data);
    var sentences = response.data.sentences;
    var contentToDisplay = "";
    //contentToDisplay = '<Table><TableHead><TableRow><TableCell>Action: </TableCell><TableCell align="right">Possible Intent :</TableCell></TableRow></TableHead><TableBody><TableRow>&nbsp;</TableRow>';
    var uniqueKey = 0;
    let rowData = [...data]
    //Iterate Sentences dict and display each sentence within it in a Dialog with Speech component
    for (var key in sentences) {
      var sentenceArr = sentences[key];
      console.log("The Action is ", key);
      console.log("The sentence is ", sentenceArr);
      //contentToDisplay += '<TableRow colSpan="2"><TableCell>Action :' + key + '</TableCell></TableRow><TableRow>&nbsp;</TableRow>';
      for (var index in sentenceArr) {

        uniqueKey++;
        console.log("The key to be pushed is ", uniqueKey);
        rowData.push({ id: uniqueKey, action: key, intent: sentenceArr[index] });
        console.log("The data to be pushed is ", rowData);
        //
        //setRows.push(rows, { key: index, action: key, intent: sentenceArr[index] });
      }
      //Iterate sentence array and display key and sentence in a table with ID Intent_table    
    }
    setData(rowData);
    contentToDisplay += "<TableRow>&nbsp;</TableRow></TableBody></Table>";
    //set the contentToDisplay to the table with ID Intent_table
    console.log("The content to display is ", contentToDisplay);
    //document.getElementById("results").innerHTML = contentToDisplay;
  }
  function onErrorPredictNlpIntent(err) {
    //var contentToDisplay = '<div>Error getting Intent: ' + err + '</div>';
    console.log("Error predicting intent", err);
    //return (contentToDisplay);
  }

  //Create a Container that holds VideoRecorder and other components
  const [data, setData] = useState([]); //table data
  useEffect(() => {
    console.log("Inside useEffect", data);
    if (data && data.length > 0) {
      console.log("Having data going to set it");
    }
  }, [data]);
  const [nlpData, setNlpData] = useState([]);

  useEffect(() => {
    console.log("Inside useEffect", nlpData);
    if (nlpData && nlpData.length > 0) {
      console.log("Having data going to set it", nlpData);
    }
  }, [nlpData]);
  const [nlpResponse, setNlpResponse] = useState([]);
  useEffect(() => {
    console.log("Inside useEffect", nlpResponse);
    if (nlpResponse && nlpResponse.length > 0) {
      console.log("Having data going to set it", nlpResponse);
    }
  }, [nlpResponse]);


  const [videoURL, setVideoURL] = useState('https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h');
  useEffect(() => {
    console.log("Inside useEffect", videoURL);
    if (videoURL && videoURL.length > 0) {
      console.log("Having video_url going to set it", videoURL);
    }
  }, [videoURL]);
  const style = {
    play: {
      hover: {
        backgroundColor: 'GhostWhite'
      },
      button: {
        cursor: 'pointer',
        pointerEvents: 'none',
        outline: 'none',
        backgroundColor: 'Gainsboro',
        border: 'solid 1px rgba(255,255,255,1)',
        borderRadius: 6
      }
    }
  };
  const renderSpeechIconForIntent = (params) => {
    return (
      <Speech text={params.row.intent} textAsButton="true" style={style} />
    )
  };
  const renderSpeechIconForAction = (params) => {
    return (
      <Speech text={params.row.action} textAsButton="true" style={style} />
    )
  }
  const [checked, setChecked] = React.useState([false]);


  const renderCheckBoxForIntent = (params) => {
    return (
      <CheckBox
        text={params.row.intent} style={style}
        checked={checked[params.row.id]}
        onChange={(event) => {
          console.log("Event and object", event);
          console.log("Event and ID", event.target.id);
          console.log("The checked state is", event.target.checked)
          let dataFromNlp = [...nlpData];
          if (event.target.checked) {
            dataFromNlp.push(params.row.intent);
            console.log("The data from nlp is ", dataFromNlp);
            let checkedArray = [...checked];
            checkedArray[params.row.id] = true;
            setChecked(checkedArray);

            //Set the checkbox to be selected                         
          } else {
            dataFromNlp = dataFromNlp.filter(item => item !== params.row.intent);
            let checkedArray = [...checked];
            checkedArray[params.row.id] = false;
            setChecked(checkedArray);

            console.log("The data after unchecking an option from nlp is ", dataFromNlp);
          }
          console.log("The final set of NLP Data to be submitted is ", dataFromNlp);
          setNlpData(dataFromNlp);
        }
        } />
    )
  }
  const columns = [
    { field: 'action', headerName: 'Predicted Action', cellStyle: { fontWeight: "Bold" }, renderCell: renderSpeechIconForAction, width: 150 },
    { field: 'intent', headerName: 'Predicted Intent', cellStyle: { fontWeight: "Bold" }, renderCell: renderSpeechIconForIntent, width: 300 },
    { field: 'SelectForNLP', headerName: 'Select an Intent to get Natural suggestions', renderCell: renderCheckBoxForIntent, width: 350 }
  ];

  const nlpColumns = [
    { field: 'action', headerName: 'Predicted Action', cellStyle: { fontWeight: "Bold" }, renderCell: renderSpeechIconForAction, width: 150 },
    { field: 'intent', headerName: 'Predicted Intent', cellStyle: { fontWeight: "Bold" }, renderCell: renderSpeechIconForIntent, width: 300 },
    { field: 'nlpIntent', headerName: 'NLP Intent', cellStyle: { fontWeight: "Bold" }, renderCell: renderSpeechIconForIntent, width: 300 }
  ];
  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  const existingVideos = [
    {
      id: '1AQh-1BSQ99GD1naWBJENhXZuP1jT3GUjdhQXh',
      title: 'Person Eating Cake Drinking Coffee And Talking',
      description: 'Video 1 Description',
      thumbnail: 'https://drive.google.com/uc?export=download&id=1AQh-1BSQ99GD1naWBJENhXZuP1jT3GUjdhQXh',
      videoUrl: 'https://drive.google.com/uc?export=download&id=1AQh-1BSQ99GD1naWBJENhXZuP1jT3GUjdhQXh',
    },
    {
      id: '1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      title: 'Video 2',
      description: 'Video 2 Description',
      thumbnail: 'https://drive.google.com/uc?export=download&id=1SaidOfC6zC0uvJQWNTmvQSdjKz-2_ekO',
      videoUrl: 'https://drive.google.com/uc?export=download&id=1SaidOfC6zC0uvJQWNTmvQSdjKz-2_ekO'
    },
    {
      id: '1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      title: 'Video 3',
      description: 'Video 3 Description',
      thumbnail: 'https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      videoUrl: 'https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
    },
    {
      id: '1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      title: 'Video 4',
      description: 'Video 4 Description',
      thumbnail: 'https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      videoUrl: 'https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
    },
    {
      id: '1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      title: 'Video 5',
      description: 'Video 5 Description',
      thumbnail: 'https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
      videoUrl: 'https://drive.google.com/uc?export=download&id=1AQh-kFSUa6r6iSNUFFI_PqrKtYpmN77h',
    }
  ];

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;    
    height: 100%;
  `;
  const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: right;
    justify-content: right;
    height: 100%;
  `;
  return (
    <div float="right">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Container style={{ flex: 1 }}>
          <Table id="Intent_table">

            <TableHead>
              <TableRow>
                <TableCell>Enter Video URL: <input type="text" size="100" id="video_url" placeholder="Enter Video URL" /></TableCell>
                <TableCell>
                  <button color="primary" onClick={() => {
                    var video_url = document.getElementById("video_url").value;
                    setVideoURL(video_url);
                    setData([]);
                    PredictIntent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent });
                    document.getElementById("video_url").value = videoURL;
                  }} >
                    <span>Predict Intent</span>
                  </button>
                </TableCell>
                <TableCell>
                  <button color="primary" onClick={() => {
                    console.log("Going to predict NLP Suggestions for ", nlpData);
                  }}>
                    <span>Predict Natural Suggestions</span>
                  </button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan="2">
                  <div style={{ width: '35%', height: '35%' }}>
                    <RecordVideo onSuccessUpload={(video_url) => PredictIntent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent })} onErrorUpload={(err) => { console.log("Error uploading file for processing", err) }} />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody><TableRow colSpan="2"><TableCell>"Click on Predict Intent (To Display Results)"</TableCell></TableRow></TableBody>
          </Table>
          <div style={{ height: '800px', width: '50%' }} align="left">
            {data && data.length > 0 && <DataGrid columns={columns} rows={data} />}
          </div>
          <div style={{ height: '800px', width: '50%' }} align="right">
            {nlpData && nlpData.length > 0 && <DataGrid columns={nlpColumns} rows={nlpData} />}
          </div>
        </Container>
        <div className="player-wrapper">
          <Player className="react-player" fluid={false} src={videoURL} playIcon="public/loading.png">
            <LoadingSpinner />
            <BigPlayButton position="center" />
          </Player>
        </div>
      </ThemeProvider>
    </div >
  );
}
export default App;
