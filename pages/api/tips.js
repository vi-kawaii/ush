export default async function handler(req, res) {
  const teachers = await (
    await fetch("https://www.usue.ru/schedule/?action=teacher-list")
  ).json();

  const groups = await (
    await fetch("https://www.usue.ru/schedule/?action=group-list")
  ).json();

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${60 * 60 * 3}, stale-while-revalidate=${60 * 60 * 6 - 1}`
  );

  res.json([...teachers, ...groups.map((g) => ({ label: g }))]);
}
