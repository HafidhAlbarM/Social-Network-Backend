exports.createPostValidator = (req, res, next) => {
    req.check('title', "Write a title").notEmpty();
    req.check('title', "Title must be between 4 to 150 characters").isLength({
        min: 4, max:150
    });

    req.check('body', "Write a body").notEmpty();
    req.check('body', "Body must be between 4 to 150 characters").isLength({
        min: 4, max:2000
    });

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError});
    }

    //memproses ke middleware berikutnya
    next();
}

exports.createUserValidator = (req, res, next) => {
    req.check('name', "Name is required").notEmpty();

    req.check('email', "Email must be between 3 to 32 character")
    .matches(/.+\@.+\../)
    .withMessage("not a valid email address")
    .isLength({
        min: 4,
        max: 200
    });

    req.check('password', "Password is required").notEmpty();

    req.check('password')
    .isLength({min: 6})
    .withMessage("Password must containt minimal 6 character");

    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map( error => error.msg )[0];
        return res.status(400).json({error: firstError});
    }

    next();
}