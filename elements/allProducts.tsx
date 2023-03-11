const allProducts = () => {
  let listOfProducts = [
    {
      category: 'warzywa i owoce',
      products: [
        {name: 'banany', checked: false},
        {name: 'pomarańcze', checked: false},
        {name: 'cytryna', checked: false},
        {name: 'cebula', checked: false},
        {name: 'jabłka', checked: false},
        {name: 'ziemniaki', checked: false},
        {name: 'pomidory', checked: false},
      ],
    },
    {
      category: 'nabiał',
      products: [
        {name: 'mleko', checked: false},
        {name: 'kefir', checked: false},
        {name: 'jogurt', checked: false},
        {name: 'masło', checked: false},
        {name: 'śmietana', checked: false},
        {name: 'ser', checked: false},
      ],
    },
    {
      category: 'mięso i wędliny',
      products: [
        {name: 'kabanosy', checked: false},
        {name: 'kiełbasa', checked: false},
        {name: 'wędlina', checked: false},
        {name: 'parówki', checked: false},
        {name: 'filet z kurczaka', checked: false},
        {name: 'mięso mielone', checked: false},
      ],
    },
    {
      category: 'napoje',
      products: [
        {name: 'sok', checked: false},
        {name: 'woda niegazowana', checked: false},
        {name: 'woda gazowana', checked: false},
        {name: 'oranżada', checked: false},
        {name: 'wino czerwone', checked: false},
        {name: 'wino białe', checked: false},
        {name: 'herbata', checked: false},
        {name: 'kawa', checked: false},
        {name: 'kakao', checked: false},
      ],
    },
    {
      category: 'przekąski',
      products: [
        {name: 'paluszki', checked: false},
        {name: 'popcorn', checked: false},
        {name: 'talarki', checked: false},
        {name: 'herbatniki', checked: false},
        {name: 'prażynki', checked: false},
      ],
    },
    {
      category: 'kosmetyki',
      products: [
        {name: 'dezodorant', checked: false},
        {name: 'mydło', checked: false},
        {name: 'żel pod prysznic', checked: false},
        {name: 'pasta do zębów', checked: false},
        {name: 'żel do golenia', checked: false},
        {name: 'szampon', checked: false},
        {name: 'odżywka', checked: false},
        {name: 'lakier', checked: false},
        {name: 'płyn micelarny', checked: false},
        {name: 'maszynka do golenia', checked: false},
      ],
    },
    {
      category: 'inne',
      products: [
        {name: 'karma dla kota', checked: false},
        {name: 'karma dla psa', checked: false},
      ],
    },
  ];

  listOfProducts.map(cat => {
    cat.products.sort((one, two) => (one.name < two.name ? -1 : 1));
  });

  return listOfProducts;
};

export default allProducts;
