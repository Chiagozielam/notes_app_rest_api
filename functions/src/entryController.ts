import { Response } from "express"
import { db } from "./config/firebase"

type EntryType = {
    title: string,
    text: string
}

type Request = {
    body: EntryType,
    params: { entryId: string }
}

const addEntry = async (req: Request, res: Response) => {
    const { title, text } = req.body
    try{
        const entry = await db.collection('entries').doc()
        const entryObject = {
            id: entry.id,
            title,
            text
        }

        entry.set(entryObject)

        res.status(200).send({
            status: 'Success',
            message: 'entry added successfully',
            data: entryObject
        })
    }catch(error){
        res.status(500).json(error.message)
    }
}

const getAllEntries = async (req: Request, res: Response) => {
    try{
        const allEntries: EntryType[] = []
        const querySnapshot = await db.collection('entries').get()
        querySnapshot.forEach((doc: any) => allEntries.push(doc.data()))
        res.status(200).json(allEntries)
        return
    }catch(error){
        res.status(500).json(error.message)
    }
}

const updateEntries = async (req: Request, res: Response) => {
    const {body: { text, title }, params: { entryId }} = req
    try{
        const entry = db.collection('entries').doc(entryId)
        const currentData = (await entry.get()).data() || {}
        const entryObject = {
            title: title || currentData.title,
            text: text || currentData.text
        }
        await entry.set(entryObject)
        res.status(200).json({
            status: 'Success',
            message: 'updated Successfully',
            data: entryObject
        })
        return
    }catch(error){
        res.status(500).json(error.message)
    }
}

const deleteEntries = async (req: Request, res: Response) => {
    const {params: { entryId }} = req
    try{
        const entry = db.collection('entries').doc(entryId)
        await entry.delete()
        const currentData = (await entry.get()).data() || {}
        res.status(200).json({
            status: 'Success',
            message: 'deleted Successfully',
            data: currentData
        })
        return
    }catch(error){
        res.status(500).json(error.message)
    }
}

export { addEntry, getAllEntries, updateEntries, deleteEntries }
