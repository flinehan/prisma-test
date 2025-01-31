import { Click } from "prisma/client";

export async function fetchClicks() {
  const response = await fetch(`/api/clicks/list`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    console.warn(`Error fetching clicks: `, response.statusText);
    throw new Error('Error fetching clicks.');
  }

  return await response.json();
}

export async function createClick(click: Pick<Click, "perSecond">) {
  const response = await fetch('/api/clicks/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ click }),
  });
  if (!response.ok) {
    console.warn(`Error fetching clicks: `, response.statusText);
    throw new Error('Error fetching clicks.');
  }

  return await response.json();
}