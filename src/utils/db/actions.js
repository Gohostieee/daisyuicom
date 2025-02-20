"use server"

const { currentUser } = require("@clerk/nextjs/server")
const { firestore } = require("./firebase")


export const uploadTheme = async (theme) => {
    const { id, username } = (await currentUser())
    try {
        await firestore.collection("themes").add({ ...theme, id, username })
    } catch (e) {
        return {
            error: true,
            message: e
        }
    } finally {
        return {
            error: false
        }
    }
}

export const getThemes = async () => {
    const docs = (await firestore.collection("themes").get())
    const docsData = []
    docs.forEach(doc => {
        docsData.push(doc.data())
    })
    return docsData
}