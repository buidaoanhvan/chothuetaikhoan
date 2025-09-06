import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";


export const isAdmin = async (): Promise<any | NextResponse> => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
        return NextResponse.json({
            errorCode: 1,
            message: 'Unauthorized',
            data: null
        }, { status: 401 });
    }
    return session;
};