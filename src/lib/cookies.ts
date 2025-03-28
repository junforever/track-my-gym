'use server';
import { cookies } from 'next/headers';

export async function getCookie(cookieName: string, onFailValue = '') {
  const cookieValue = (await cookies()).get(cookieName)?.value;
  return cookieValue || onFailValue;
}

export async function setCookie(cookieName: string, cookieValue: string) {
  (await cookies()).set(cookieName, cookieValue);
}
