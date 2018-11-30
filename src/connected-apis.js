import express from "express";


// TODO for now this simply forwards the api calls but we could wrap this via graphql
// TODO test if apis are live by pinging them every now and then, have a status message in case the api does not respond returned
// Forward calls to apis


const registeredAPIs = {
    "stl-converter": 'http://localhost:3033/'
}

function handleRedirect(req, res) {

    const apiName = req.params.name

    const redirectURL = registeredAPIs[apiName]

    if (redirectURL) {
        res.redirect(redirectURL + req.params.route);
    } else {
        const obj = {
            error: "api not found"
        }
        res.json(obj);
    }

}
export
const apiRouter=express.Router()

// TODO fallbacks for 404/invalid routes
/* apiRouter.get("*", function (req, res) {

        res.json(registeredAPIs);

}) */

apiRouter.use("/:name/:route", handleRedirect)
