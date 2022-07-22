AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:3d1d6e8a-61a9-4c55-80d3-59eb284e5640',
});
AWS.config.apiVersions = {
  s3: '2006-03-01'
};
var s3 = new AWS.S3({
    params: { 
        Bucket: 'expressme-media-files'
    }
});

const S3VideoRecorder = () => {
    return (
        <VideoRecorder 
            onRecordingComplete={ (videoBlob) => {
                s3.putObject({
                    Key: "video.mp4",
                    Body: videoBlob,
                    'ContentType': 'video/mp4',
                    ACL: 'public-read'
                    }, (err) => {
                        if(err){
                            // On Error
                        } else {
                            // On Success
                        }
                    }
                )
            }}
        />   
    )
}