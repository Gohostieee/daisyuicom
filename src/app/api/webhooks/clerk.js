import { firestore } from "@/utils/db/firebase";

export async function POST(req) {
    const body = await req.json()
    console.log("what,", body, body.type)
    switch (body.type) {
        case "user.created":
            const uid = body.data.id;
            const username = body.data.username;
            const createdAt = body.data.created_at;
            console.log({
                uid,
                username,
                createdAt
            })
            await firestore.collection('users-clerk').doc(uid).set({
                uid,
                username,
                createdAt
            })
            return Response.json('success')
            break;
        default:
            return Response.json('error')
    }
}