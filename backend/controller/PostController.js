const connectDB = require("../config/db");


exports.create = async (req, res) => {
    try {
        const { postName } = req.body;

        if (!postName) {
            return res.status(400).json({
                message: "Input a Post Name"
            });
        }

        const checkQuery = "SELECT * FROM post WHERE postName = ?";

        connectDB.query(checkQuery, [postName], (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: "Unable to check post"
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Post already exists"
                });
            }

            const createQuery =
                "INSERT INTO post (postName) VALUES (?)";

            connectDB.query(
                createQuery,
                [postName],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Couldn't create Post"
                        });
                    }

                    return res.status(201).json({
                        message: "Successfully created Post",
                        post: {
                            id: result.insertId,
                            postName
                        }
                    });

                }
            );

        });

    } catch (err) {

        return res.status(500).json({
            message: `Internal Server Error: ${err.message}`
        });

    }
};


exports.getPost = async (req, res) => {

try {

const query =
"SELECT * FROM post";

connectDB.query(
query,

(err, results)=>{

if(err){

return res
.status(500)
.json({

message:
"Failed to fetch posts"

});

}

return res
.status(200)
.json({

message:
"Posts retrieved",

results

});

});

}catch(err){

return res
.status(500)
.json({

message:
err.message

});

}

};