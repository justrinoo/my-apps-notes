const conn = require('../database/mydb');

const findAll = (callback) => {
    conn.query({
        sql: 'SELECT * FROM article'
    },
        function (err, result) {
            callback(err, result);
        }
    )
}

const store = (post, callback) => {
    conn.query({
        sql: 'INSERT INTO article SET ?',
        values: {
            name: post.name,
            address: post.address,
            nohandphone: post.nohandphone,
            role: post.role,
        },
    },
        function (err, result) {
            callback(err, result);
        },
    );
}

function update(id, post, callback) {
    console.log(id)
    conn.query({
        sql: 'UPDATE article SET ? where id = ?',
        values: [{ ...post }, id]
    }, function (err, result) {
        callback(err, result[0]);
    },
    );

}

const findOne = (id, callback) => {
    conn.query({
        sql: 'SELECT * FROM article WHERE id = ?',
        values: [id]
    }, function (err, result) {
        callback(err, result[0])
    }
    )
}

function destroy(id, callback) {
    conn.query({
        sql: 'DELETE FROM  article WHERE id = ?',
        values: [id],
    }, function (err, result) {
        callback(err, result);
    })
}

module.exports = {
    store,
    findAll,
    update,
    destroy,
    findOne
};