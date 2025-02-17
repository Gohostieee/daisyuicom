import { database } from "@/utils/db/firebase";

export async function POST(req) {
    const body = await req.json()
    switch (body.type) {
        case "user.created":
            const uid = body.data.id;
            const username = body.data.username;
            const createdAt = body.data.created_at;

            database.ref(`users-clerk`).child(uid).set({
                uid,
                username,
                createdAt
            })
            break;
        default:
            return Response.error()
    }
}