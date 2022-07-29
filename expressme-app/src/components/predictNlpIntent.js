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

export const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

function predict_intent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent }) {
    console.log("Inside Predict Intent");
    console.log("The development environment is: ", process.env.NODE_ENV, isDev());
    //var expressMeURL = isDev() ? "/expressme" : "https://qldrp0kt07.execute-api.us-east-1.amazonaws.com/expressme";
    //The changes is to make sure that we are having edge function on Vercel to make calls
    var expressMeURL = isDev() ? "/expressme" : "/expressme";
    console.log("The expressMeURL is: ", expressMeURL);
    axios.post(expressMeURL,
        {
            video_url: video_url
        }).then(onSuccessPredictIntent).catch(onErrorPredictIntent);
}

function PredictIntent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent }) {
    console.log("Displaying Intent");
    predict_intent(video_url, { onSuccessPredictIntent }, { onErrorPredictIntent });
}
function predictNlpIntent(sentenceArray, { onSuccessPredictNlpIntent }, { onErrorPredictNlpIntent }) {
    console.log("Inside Predict NLP Intent");
    console.log("The development environment is: ", process.env.NODE_ENV, isDev());
    //var expressMeURL = isDev() ? "/expressme-intent" : "https://0p2q6srktf.execute-api.us-east-1.amazonaws.com/expressme-intent";
    var expressMeURL = isDev() ? "/expressme-intent" : "/expressme-intent";
    console.log("The expressMeURL-Intent is: ", expressMeURL);
    axios.post(expressMeURL, {
        action: "NLP Text predicting Action",
        sentences: sentenceArray
    }).then(onSuccessPredictNlpIntent).catch(onErrorPredictNlpIntent);
}

export default predictNlpIntent;