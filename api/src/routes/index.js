export async function onRequestGet() {
  return new Response("Welcome to givemysolback API!", {
    headers: { "Content-Type": "text/plain" },
  });
}
