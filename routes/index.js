var express = require("express");
var router = express.Router();

const userlist = [
    {
        name: "jack",
        age: 30,
    },
    {
        name: "elon",
        age: 30,
    },
    {
        name: "harry",
        age: 30,
    },
    {
        name: "hinata",
        age: 30,
    },
];

/* GET home page. */
router.get("/", function (req, res, next) {
    const { host } = req.headers;
    res.render("index", {
        title: "Express",
        host,
        forwardFor: req.headers["x-forwarded-host"],
    });
});

router.get("/check", function (req, res, next) {
    const { domain } = req.query;
    if (!domain) {
        throw new Error("MISSING_PARAM");
    }

    const [name] = domain.split(".");
    const user = userlist.find((e) => {
        return e.name === name;
    });

    if (user) {
        res.json({
            domain,
            name,
        });
    } else {
        throw new Error("NOT_FOUND");
    }
});

module.exports = router;
