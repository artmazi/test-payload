import { getPayload } from 'payload'
import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

// Live preview / visual editor entry: logged-in admins get Draft Mode (pages render per request, drafts included),
// everyone else lands on the normal static page. /preview?path=/de/verwaltungen/use-cases
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get('path') || '/'
  // Only same-site paths, so this can't be used as an open redirect
  const path = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (user) (await draftMode()).enable()
  redirect(path)
}
