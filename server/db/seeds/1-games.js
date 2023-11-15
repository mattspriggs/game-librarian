export async function seed(knex) {
  // inserts seed entries
  await knex('table_name').insert([
    {
      id: 1,
      title: 'Legend of Zelda: Tears of the Kingdom',
      platform: 'Nintendo Switch',
      played: false,
    },
    { id: 2, title: 'Alan Wake 2', platform: 'Xbox Series X', played: false },
    {
      id: 3,
      title: 'Armored Core VI: The Fires of Rubicon',
      platform: 'Playstation 5',
      played: true,
    },
  ])
}
