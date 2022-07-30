import VideoRecorder from 'react-video-recorder';
import UploadVideoToS3 from './UploadVideoToS3';

function RecordVideo({ onSuccessUpload }, { onErrorUpload }) {
    return (
        <VideoRecorder isFlipped={false}
            onRecordingComplete={(videoBlob) => {
                console.log(videoBlob);
                UploadVideoToS3(videoBlob, onSuccessUpload = { onSuccessUpload }, onErrorUpload = { onErrorUpload });
            }}
        />
    );
}
export default RecordVideo;