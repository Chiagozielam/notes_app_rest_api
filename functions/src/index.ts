import * as functions from "firebase-functions";
import * as express from "express"
import { addEntry, deleteEntries, getAllEntries, updateEntries } from "./entryController"

const app = express()


app.get("/", (req, res) => {
    res.status(200).send('Hey there!')
})
app.post('/entries', addEntry)
app.get('/entries', getAllEntries)
app.patch('/entries/:entryId', updateEntries)
app.delete('/entries/:entryId', deleteEntries)


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.app = functions.https.onRequest(app);
