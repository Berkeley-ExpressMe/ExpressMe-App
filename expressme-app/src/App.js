import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Speech from 'react-speech';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';

//Import the PlayIcon ui

import RecordVideo from './components/RecordVideo';
import PredictIntent from './components/PredictIntent';


var contentToDisplay = "";

function onSuccessPredictIntent(response) {
  console.log("Successfully predicted intent", response.data);
  var sentences = response.data.sentences;
  contentToDisplay = "";
  contentToDisplay = '<Table><TableHead><TableRow><TableCell>Action: </TableCell><TableCell align="right">Possible Intent :</TableCell></TableRow></TableHead><TableBody><TableRow>&nbsp;</TableRow>';
  //Iterate Sentences dict and display each sentence within it in a Dialog with Speech component
  for (var key in sentences) {
    var sentenceArr = sentences[key];
    console.log("The Action is ", key);
    console.log("The sentence is ", sentenceArr);
    contentToDisplay += '<TableRow colSpan="2"><TableCell>Action :' + key + '</TableCell></TableRow><TableRow>&nbsp;</TableRow>';
    for (var index in sentenceArr) {
      contentToDisplay += '<TableRow colSpan="2"><TableCell>' + sentenceArr[index] + '"</TableCell></TableRow><TableRow>&nbsp;</TableRow>';
    }
    //Iterate sentence array and display key and sentence in a table with ID Intent_table    
  }
  contentToDisplay += "<TableRow>&nbsp;</TableRow></TableBody></Table>";
  //set the contentToDisplay to the table with ID Intent_table
  console.log("The content to display is ", contentToDisplay);
  document.getElementById("results").innerHTML = contentToDisplay;


}
function onErrorPredictIntent(err) {
  //var contentToDisplay = '<div>Error getting Intent: ' + err + '</div>';
  console.log("Error predicting intent", err);
  //return (contentToDisplay);
}
const htmlDecode = content => {
  let e = document.createElement("div");
  e.innerHTML = content;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

function App() {
  //Create a Container that holds VideoRecorder and other components
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `;
  return (
    <Container>

      <Table id="Intent_table">

        <TableHead>
          <TableRow>
            <TableCell>Enter Video URL: <input type="text" size="100" id="video_url" placeholder="Enter Video URL" /></TableCell>
            <TableCell>
              <button color="primary" onClick={() => {
                var video_url = document.getElementById("video_url").value;
                PredictIntent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent });
              }} >
                <span>Predict Intent</span>
              </button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody><TableRow colSpan="2"><TableCell>"Displaying Results"</TableCell></TableRow></TableBody>

      </Table>
      <div id="results"
      />
    </Container>
  );
}
export default App;