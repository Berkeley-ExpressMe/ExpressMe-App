import AWS from 'aws-sdk';
AWS.config.update({
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:3d1d6e8a-61a9-4c55-80d3-59eb284e5640'
    }),
    region: "us-east-1"
})
AWS.config.apiVersions = {
    s3: '2006-03-01'
};
var s3 = new AWS.S3({
    params: {
        Bucket: 'expressme-media-files'
    }
});
var base_resource_url = "https://expressme-media-files.s3.amazonaws.com/";
function UploadVideoToS3(videoBlob, { onSuccessUpload }, { onErrorUpload }) {
    var timestamp = new Date().getTime();
    var file_name = "video_" + timestamp + ".mp4"
    var file_key = "videos/" + file_name;
    s3.putObject({
        Key: file_key,
        Body: videoBlob,
        'ContentType': 'video/mp4',
        ACL: 'public-read'
    },
        (err, data) => {
            if (err) {
                console.log("Error uploading data: ", err);
                onErrorUpload(err);
            } else {
                var video_url = base_resource_url + file_key;
                console.log("Successfully uploaded video to S3", data, video_url);
                onSuccessUpload(video_url);
            }
        }
    );



}
export default UploadVideoToS3;