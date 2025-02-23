"use server"

const { currentUser, auth } = require("@clerk/nextjs/server")
const { firestore } = require("./firebase")
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

export const uploadTheme = async (theme) => {
    const { id, username } = (await currentUser())
    try {
        await firestore.collection("themes").add({ ...theme, id, username, likes: 0 })
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
    let index = 0;
    docs.forEach((doc) => {
        docsData.push({ ...doc.data(), id: doc.id, order: index })
        index++
    })
    console.log(docsData)
    return docsData
}

export const likeTheme = async (themeID) => {
    let id;
    try {
        id = (await currentUser()).id
    } catch (e) {
        console.error(e)
        return {
            error: true,
            message: e
        }
    }

    let increment;
    const ref = firestore.collection("themes").doc(`/${themeID}/userLikes/${id}`)
    const refSnapshot = await ref.get()
    const userRef = firestore.collection("users-clerk").doc(id)

    if (refSnapshot.exists) {
        ref.delete()
        userRef.update({
            likes: FieldValue.arrayRemove(themeID)
        })
        increment = -1;
    } else {
        ref.set({ id })
        userRef.update({
            likes: FieldValue.arrayUnion(themeID)
        })
        increment = 1;
    }

    const themeRef = firestore.collection("themes").doc(`/${themeID}`)
    themeRef.update({
        likes: FieldValue.increment(increment)
    })

    return {
        error: false,
        increment: increment
    };
}

export async function getUserData(uid) {
    return await (await firestore.collection("users-clerk").doc(uid).get()).data()
}