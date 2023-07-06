const mssql = require("mssql");
const config = require("../config/config");
const upload = require('../utills/upload');

async function getFeed(req, res) {
    console.log(req.session?.user.UserId)
    const UserId = req.session?.user.UserId
    try {
        let sql = await mssql.connect(config)

        if (sql.connected) {
            const request = sql.request();

            request.input('SpecificUserId', UserId)

            let result = await request.execute('GetPostsFromFollowedUsers');
            console.log(result)

            res.json({
                success: true,
                message: "Retrieved posts from followed users",
                data: result.recordset
            })
        }
    } catch (error) {
        res.send(error.message)

    }

}

async function getUserPosts(req, res) {
    const UserId = req.session?.user.UserId
    try {
        let sql = await mssql.connect(config)

        if (sql.connected) {
            const request = sql.request();

            request.input('SpecificUserId', UserId)

            let result = await request.execute('GetPostsFromSpecific');
            console.log(result)

            res.json({
                success: true,
                message: "Retrieved posts for specific user",
                data: result.recordset
            })
        }
    } catch (error) {
        res.send(error.message)

    }

}



async function createPost(req, res) {
    const UserId = req.session?.user.UserId
    const { Content, ImageUrls, VideoUrls } = req.body;

    try {
        let sql = await mssql.connect(config);
        if (sql.connected) {

            let uploadedImageUrls = [];
            if (ImageUrls) {
                const imageUrlsArray = ImageUrls.split(',');
                if (imageUrlsArray.length === 1) {
                    const imageUrl = await upload(imageUrlsArray[0], 'image');
                    uploadedImageUrls.push(imageUrl);
                } else {
                    uploadedImageUrls = await Promise.all(imageUrlsArray.map((path) => upload(path, 'image')));
                }
            }

            // Upload videos
            let uploadedVideoUrls = [];
            if (VideoUrls) {
                const videoUrlsArray = VideoUrls.split(',');
                if (videoUrlsArray.length === 1) {
                    const videoUrl = await upload(videoUrlsArray[0], 'video');
                    uploadedVideoUrls.push(videoUrl);
                } else {
                    uploadedVideoUrls = await Promise.all(videoUrlsArray.map((path) => upload(path, 'video')));
                }
            }


            const request = sql.request();

            


            request.input('UserId', UserId)
                .input('Content', Content)
                .input('ImageUrls', uploadedImageUrls.join(','))
                .input('VideoUrls', uploadedVideoUrls.join(','))

                let result = await request.execute('AddPost');    
                

            res.json({
                data: result
            })

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}




module.exports = { getFeed, getUserPosts, createPost };