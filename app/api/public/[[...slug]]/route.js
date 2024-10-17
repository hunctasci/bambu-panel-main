import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const slug = pathname.replace('/api/public/', '').split('/');

  console.log('Requested slug:', slug);

  if (slug && slug.length) {
    const publicDir = join(process.cwd(), 'public');
    const filePath = join(publicDir, ...slug);

    console.log('Attempting to serve file:', filePath);

    try {
      // Check if file exists
      const stats = await stat(filePath);
      console.log('File stats:', stats);

      const data = await readFile(filePath);
      console.log('File read successfully, size:', data.length);
      
      // Set appropriate content type based on file extension
      const ext = filePath.split('.').pop().toLowerCase();
      const contentType = getContentType(ext);
      console.log('Content-Type:', contentType);
      
      return new NextResponse(data, {
        status: 200,
        headers: {
          'Content-Type': contentType,
        },
      });
    } catch (error) {
      console.error('Error reading file:', error);
      return new NextResponse('File not found', { status: 404 });
    }
  } else {
    console.log('Invalid path');
    return new NextResponse('Invalid path', { status: 404 });
  }
}

function getContentType(extension) {
  const contentTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'webp': 'image/webp',
    'pdf': 'application/pdf',
    // Add more mime types as needed
  };
  
  return contentTypes[extension] || 'application/octet-stream';
}