import { firestore } from "@/utils/db/firebase";

export async function POST(req) {
    const body = await req.json()
    switch (body.type) {
        case "user.created":
            const uid = body.data.id;
            const username = body.data.username;
            const createdAt = body.data.created_at;
            const userSnapshot = await firestore.collection('users-clerk').doc(uid).get()
            await firestore.collection('users-clerk').doc(uid).update({
                uid,
                username,
                createdAt,
                likes: []
            })
            return Response.json('success')
            break;
        default:
            return Response.error()
    }
}
