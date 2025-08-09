import { NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
const middleware = (request: NextRequest) => {
	const pathname = request.nextUrl.pathname

	if (pathname !== '/') {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/']
}

export default middleware
