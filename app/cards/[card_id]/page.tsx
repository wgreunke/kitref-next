export default async function Page({
    params,
  }: {
    params: Promise<{ card_id: string }>
  }) {
    const card_id = (await params).card_id
    return <div>My Post: {card_id}</div>
  }