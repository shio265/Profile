import { NextResponse } from 'next/server'

const lanyardUrl = process.env.LANYARD_URL || ''
const lanyardUserId = process.env.LANYARD_USER_ID || ''

export async function GET() {
  try {
    if (!lanyardUserId) {
      return NextResponse.json(
        { errors: 'user_ids is required.' },
        { status: 400 }
      )
    }

    const response = await fetch(`${lanyardUrl}/api/v1/users/${lanyardUserId}`, {
      next: { revalidate: 10 } // Cache for 10 seconds
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Resource not found.' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch Lanyard data')
    }

    const data = await response.json()
    
    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Lanyard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

