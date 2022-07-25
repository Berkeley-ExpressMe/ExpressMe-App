import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Speech from 'react-speech';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import StopIcon from '@material-ui/icons/Stop';
//Import the PlayIcon ui
import PlayIcon from '@material-ui/icons/PlayArrow';

function predict_intent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent }) {
    console.log("Inside Predict Intent");
    axios.post('/expressme', {
        video_url: video_url
    }).then(onSuccessPredictIntent).catch(onErrorPredictIntent);
}

function PredictIntent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent }) {
    console.log("Displaying Intent");
    predict_intent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent });
}
function predictNlpIntent(sentenceArray, { onSuccessPredictNlpIntent }, { onErrorPredictNlpIntent }) {
    console.log("Inside Predict Intent");
    axios.post('/expressme-intent', {
        action: "NLP Text predicting Action",
        sentences: sentenceArray
    }).then(onSuccessPredictNlpIntent).catch(onErrorPredictNlpIntent);
}

export default PredictIntent;