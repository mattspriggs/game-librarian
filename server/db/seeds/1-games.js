export async function seed(knex) {
  // inserts seed entries
  await knex('games').insert([
    {
      title: 'Legend of Zelda: Tears of the Kingdom',
      platform: 'Nintendo Switch',
    },
    { title: 'Alan Wake 2', platform: 'Xbox Series X' },
    {
      title: 'Armored Core VI: The Fires of Rubicon',
      platform: 'Playstation 5',
    },
    {
      title: 'Monster Hunter Rise',
      platform: 'Nintendo Switch',
    },
    {
      title: "Asgard's Wrath 2",
      platform: 'Quest 2',
    },
    {
      title: 'Monster Hunter: World',
      platform: 'Playstation 5',
    },
    {
      title: 'Monster Hunter: World',
      platform: 'Xbox Series X',
    },
    {
      title: 'AI: The Somnium Files - The nirvAna Initiative',
      platform: 'Nintendo Switch',
    },
    {
      title: 'AI: The Somnium Files',
      platform: 'Nintendo Switch',
    },
    {
      title: 'The Witcher 3: Wild Hunt',
      platform: 'Xbox Series X',
    },
    {
      title: 'The Witcher 3: Wild Hunt',
      platform: 'PC - Steam Deck - Verified',
    },
  ])
}
