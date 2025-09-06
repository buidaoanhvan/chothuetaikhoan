import { db } from "@/lib/db";
import { isAdmin } from "@/lib/role";
import { NextResponse } from "next/server";

//lấy danh sách bài viết
export async function GET() {
    try {
        const posts = await db.post.findMany();
        return NextResponse.json({
            errorCode: 0,
            message: 'Posts retrieved successfully',
            data: posts
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            errorCode: 1,
            message: 'Failed to retrieve posts',
            data: null
        }, { status: 500 });
    }
}

// thêm mới bài viết
export async function POST(req: Request) {
    try {
        const payload = await isAdmin();
        if (!payload) return payload;
        const { title, content, description, status } = await req.json();
        const post = await db.post.create({
            data: {
                title,
                content,
                description,
                authorId: payload.user.id,
                published: status
            }
        });
        return NextResponse.json({
            errorCode: 0,
            message: 'Post created successfully',
            data: post
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            errorCode: 1,
            message: 'Failed to create post',
            data: null
        }, { status: 500 });
    }
}