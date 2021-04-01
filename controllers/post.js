const Post = require('../models/post');

function addPost(req, res) {
    const body = req.body;
    const post = new Post(body);

    post.save((err, postStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: 'Error del servidor.' });
        } else {
            if (!postStored) res.status(400).send({ code: 400, message: 'No se a podido crear el post.' });
            else res.status(200).send({ code: 200, message: 'Post creado correctamente.' });
        }
    });
}

function getPosts(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const option = {
        page,
        limit: parseInt(limit),
        sort: { date: 'desc' },
    };

    Post.paginate({}, option, (err, postsStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: 'Error del servidor.' });
        } else {
            if (!postsStored) res.status(404).send({ code: 404, message: 'No se a encontrado ningun post.' });
            else res.status(200).send({ code: 200, posts: postsStored });
        }
    });
}

function updatePost(req, res) {
    const { id } = req.params;
    const postData = req.body;

    Post.findByIdAndUpdate(id, postData, (err, postsStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: 'Error del servidor.' });
        } else {
            if (!postsStored) res.status(404).send({ code: 404, message: 'No se a encontrado ningun post.' });
            else res.status(200).send({ code: 200, message: 'Post actualizado correctamente.' });
        }
    });
}

function deletePost(req, res) {
    const { id } = req.params;

    Post.findByIdAndRemove(id, (err, postDelete) => {
        if (err) {
            res.status(500).send({ code: 500, message: 'Error del servidor.' });
        } else {
            if (!postDelete) res.status(404).send({ code: 404, message: 'Post no encontrado.' });
            else res.status(200).send({ code: 200, message: 'El post ha sido eliminado correctamente.' });
        }
    });
}

function getPost(req, res) {
    const { url } = req.params;

    Post.findOne({ url }, (err, postStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: 'Error del servidor.' });
        } else {
            if (!postStored) res.status(404).send({ code: 404, message: 'No se a encontrado ningun post.' });
            else res.status(200).send({ code: 200, post: postStored });
        }
    });
}

module.exports = {
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
};
