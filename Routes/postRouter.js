const express = require('express');
const db = require('../data/db.js');

// To create a router, express.Router
const router = express.Router();


router.get('/', (req, res) => {
    // find() returns a promise that resolves to an array of all 
    // the posts contained in the database.
    db.find()
    .then(post => res.status(200).json(post))
    .catch(err => {
        console.log(err);
        res.status(500).json({err: 'cannot get post info'});
    });
    
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    // this method expects an id as it's only parameter and returns the
    // post corresponding to the id provided or an empty array if no post 
    // with that id is found
    .then(post => {
        console.log(post);
        res.status(200).json(post);

    });

});


router.post('/', (req, res) => {
    const { title, contents} = req.body;
    if (!title || !contents){
        return res.status(400).json({err: "need title and content"});
    }
    db.insert({title, contents})
    // calling insert passing it a post object will add it to the database 
    // and return an object with the id of the inserted post. The object looks 
    // like this: { id: 123 }
    .then(id => res.status(200).json(id));
});





router.put('/:id', (req, res) => {
    const {id} = req.params
    const { title, contents} = req.body;
    if (!title && !contents){
        return res.status(400).json({err: "need title and content"});
    } else {
        db.update(id, {title, contents})
//  accepts two arguments, the first is the id of the post to update and 
// the second is an object with the changes to apply. It returns the count of 
// updated records. If the count is 1 it means the record was updated correctly
            .then(post => {
                console.log(post)
                if (!post) {
                    return (
                        res.status(404).json({err: 'post does not exist'})

                    )                    
                } else {
                    res.status(200).json(post);
                }
                
            })
    
    
        
        .catch(err => {
            console.log(err);
            res.status(500).json({err: 'error updating'});
        });
}});


router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(204).end();
                // 204 means successful deltetion 
            } else {
                res.status(404).json({err: 'post with this id does not exist'});
            }

        })
        .catch(err => {
            console.log('delete router', err);
            res.status(500).json({err: 'error deleting post'});
        });

});


router.get('/:post_id/comments', (req, res) => {
    // findpostcomments in db.js
    const {post_id} = req.params;
    db.findPostComments(post_id)
    // the findPostComments accepts a postId as its first parameter 
    // and returns all comments on the post associated with the post id.
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            console.log('get comments', err);
            res.status(500).json({err: 'err getting comments'});
        });
});


// Ask Daisy
router.get('/:post_id/comments', (req, res) => {
    
    const {id} = req.params;
    db.findCommentById(id)
   
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            console.log('get comments', err);
            res.status(500).json({err: 'err getting comments'});
        });
});


router.post('/:post_id/comments', (req, res) => {
    const {post_id} = req.params;
    const {text} = req.body;

    db.insertComment({ text, post_id})
        .then(commentid => {
            res.status(200).json(commentid);
        })
        .catch(err => {
            console.log('insertcomment', err);
            res.status(500).json({err: 'err adding comment'});
        });
});


// To export this file
module.exports = router;

