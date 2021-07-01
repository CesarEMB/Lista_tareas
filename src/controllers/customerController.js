const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tareas', (err, tareas) => {
            if (err) {
                res.json(err);
            }
            res.render('index', {
                data: tareas
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO tareas set ?', [data], (err, tareas) => {
            res.redirect('/')
        });
    })
}

controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM tareas WHERE id = ?', [id], (err, tareas) => {
            res.render('Edit_tarea', {
                data: tareas[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newtarea = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE tareas set ? WHERE id = ?', [newtarea, id], (err, tareas) => {
            res.redirect('/')
        });
    })
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tareas WHERE id = ?', [id], (err, tareas) => {
            res.redirect('/');
        });
    })
};

controller.update_status = (req, res) => {
    const { id } = req.params;
    const newtarea = req.body;

    if (req.body.status == "true") {
        newtarea.status = false;

    } else {
        newtarea.status = true;

    }

    req.getConnection((err, conn) => {
        conn.query('UPDATE tareas set ? WHERE id = ?', [newtarea, id], (err, tareas) => {
            res.redirect('/')
        });
    })
};


module.exports = controller;