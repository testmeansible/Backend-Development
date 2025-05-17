const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");


router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", 
    body("email").trim().isLength({ min: 13 }).isEmail(),
    body("password").trim().isLength({ min: 5 }).isAlphanumeric(),
    body("username").trim().isLength({ min: 5 }).isAlphanumeric(),
    (req, res) => {
        const errors = validationResult(req);
        console.log(errors);    
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: "Invalid Data"
            })
        }  
    // console.log(req.body);
    res.send(errors);
    // res.send("user is registered");
    // res.redirect("/user/register");
});

module.exports = router;