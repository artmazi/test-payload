import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Helper to set nested object properties via dot notation
function setNestedProperty(obj: any, path: string, value: any) {
  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      // If next key is a number, create array, else object
      current[key] = isNaN(Number(keys[i + 1])) ? {} : []
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
  return obj
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config })
    
    // Authenticate request using Payload's token
    const reqHeaders = await headers()
    const { user } = await payload.auth({ headers: reqHeaders })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: You must be logged in to edit.' }, { status: 401 })
    }

    const body = await req.json()
    const { collection, id, path, value } = body

    if (!collection || !id || !path) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Fetch the existing document
    const doc = await payload.findByID({
      collection,
      id,
      depth: 0,
    })

    if (!doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // 2. Update the specific path
    const updatedData = setNestedProperty(doc, path, value)

    // 3. Save it back to Payload
    const result = await payload.update({
      collection,
      id,
      data: updatedData,
    })

    return NextResponse.json({ success: true, doc: result })
  } catch (error: any) {
    console.error('Custom Edit API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
