const express = require("express");
const db = require("./db")

const router = express.Router()

// POST /api/posts
router.post("/", (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    db.update(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
                res.status(500).json({
                    errorMessage: "There was an error while saving the post to the database"
                })
        })
})


// POST /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
                res.json(post)
            })
        .catch((error) => {
            console.log(error)
            res.status(404).json({
                errorMessage: "The post with the specified ID does not exist."
            }) 
    })
    
    if(!req.body.text) {
        return res.status(400).json({
            errorMessage: "Please provide text for the comment."
        })
    }  
    
    db.insertComment(req.params.id, req.body)
        .then((comment) => {
            res.status(201).json(comment)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "There was an error while saving the comment to the database."
            })
        })      
})

//GET /api/posts
router.get("/", (req, res) => {
    const options = {
        sortBy: req.query.sortBy,
        limit: req.query.limit,
    }
    db.find(options)
        .then((posts) =>{
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The posts information could not be retrieved."
            })
        })
})

//GET /api/posts/:id
router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The post information could not be retrieved."
            })
        })
})

//GET /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
            res.json(post)
        })
    .catch((error) => {
        console.log(error)
        res.status(404).json({
            errorMessage: "The post with the specified ID does not exist."
        }) 
    })

    db.findPostComments(req.params.id)
        .then((post)=>{
            res.status(200).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The comments information could not be retrieved."
            })
        })
})

//DELETE /api/posts/:id
router.delete("/:id", (req,res) => {
    db.remove(req.params.id)
        .then((post) => {
            if(post){
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The post could not be removed."
            })
        })
})

//PUT /api/posts/:id
router.put("/:id", (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }

    db.update(req.params.id, req.body)
        .then((post)=> {
            if(post){
                res.status(200).json(user)
            }else{
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                errorMessage: "The post information could not be modified."
            })
        })
})



module.exports = router;