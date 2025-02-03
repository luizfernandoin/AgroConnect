const PRODUCTS = {
    graos: [
      {
        id: '1',
        image: require('../src/assets/Produtocafe.png'),
        title: 'Café',
        price: 'R$ 17,89',
        description: 'Café 100% arábica, torrado e moído, ideal para um café fresco e encorpado.',
        producer: 'Produtor A',
        category: 'Grãos e cereais',
        isFavorite: true,
        nota: 4.5,
        reviews: [
          { id: '1', user: 'João', rating: 5, comment: 'Ótimo café, sabor excelente!' },
          { id: '2', user: 'Maria', rating: 4, comment: 'Muito bom, mas achei um pouco caro.' }
        ]
      },
      {
        id: '2',
        image: require('../src/assets/produto.jpg'),
        title: 'Feijão',
        price: 'R$ 12,50',
        description: 'Feijão carioca selecionado, rico em proteínas e perfeito para refeições saudáveis.',
        producer: 'Produtor B',
        category: 'Grãos e cereais',
        isFavorite: true,
        nota: 3.5,
        reviews: [
          { id: '1', user: 'Carlos', rating: 4, comment: 'Feijão muito bom, bem selecionado.' },
          { id: '2', user: 'Ana', rating: 3, comment: 'Bom, mas podia ser mais barato.' }
        ]
      },
      {
        id: '3',
        image: require('../src/assets/produto.jpg'),
        title: 'Arroz',
        price: 'R$ 4,99',
        description: 'Arroz branco tipo 1, grãos inteiros e soltinhos para suas receitas.',
        producer: 'Produtor C',
        category: 'Grãos e cereais',
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Lucas', rating: 4, comment: 'Arroz de ótima qualidade.' },
          { id: '2', user: 'Fernanda', rating: 5, comment: 'Muito bom, sempre compro desse.' }
        ]
      },
      {
        id: '10',
        image: require('../src/assets/produto.jpg'),
        title: 'Milho',
        price: 'R$ 3,50',
        description: 'Milho seco para pipoca ou uso em receitas diversas.',
        producer: 'Produtor J',
        category: 'Grãos e cereais',
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Paulo', rating: 5, comment: 'Milho perfeito para pipoca!' },
          { id: '2', user: 'Juliana', rating: 4, comment: 'Bom, mas achei que alguns grãos não estouraram.' }
        ]
      }
    ],
    frutas: [
      {
        id: '4',
        image: require('../src/assets/produto.jpg'),
        title: 'Jaca',
        price: 'R$ 13,50',
        description: 'Jaca madura e fresca, com sabor doce e polpa suculenta.',
        producer: 'Produtor D',
        category: 'Frutas',
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Joana', rating: 4, comment: 'Jaca deliciosa, bem fresca.' },
          { id: '2', user: 'Felipe', rating: 5, comment: 'Excelente qualidade, muito doce.' }
        ]
      },
      {
        id: '5',
        image: require('../src/assets/produto.jpg'),
        title: 'Manga',
        price: 'R$ 6,00',
        description: 'Manga doce e aromática, rica em vitamina C e fibras.',
        producer: 'Produtor E',
        category: 'Frutas',
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Marcela', rating: 5, comment: 'Manga deliciosa, super doce.' },
          { id: '2', user: 'Ricardo', rating: 4, comment: 'Muito boa, mas podia ser maior.' }
        ]
      },
      {
        id: '6',
        image: require('../src/assets/produto.jpg'),
        title: 'Goiaba',
        price: 'R$ 5,00',
        description: 'Goiaba fresca e nutritiva, ótima para consumo in natura ou em doces.',
        producer: 'Produtor F',
        category: 'Frutas',
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Ana Paula', rating: 5, comment: 'Goiaba perfeita, muito saborosa.' },
          { id: '2', user: 'Cláudio', rating: 4, comment: 'Boa, mas achei algumas duras.' }
        ]
      },
      {
        id: '11',
        image: require('../src/assets/produto.jpg'),
        title: 'Banana',
        price: 'R$ 4,00',
        description: 'Banana prata, rica em potássio e ideal para um lanche saudável.',
        producer: 'Produtor K',
        category: 'Frutas',
        nota: 5,
        reviews: [
          { id: '1', user: 'Beatriz', rating: 5, comment: 'Banana maravilhosa, muito boa.' },
          { id: '2', user: 'Jorge', rating: 5, comment: 'Excelente, bem doce.' }
        ]
      }
    ],
    vegetais: [
      {
        id: '7',
        image: require('../src/assets/produto.jpg'),
        title: 'Cebola',
        price: 'R$ 5,50',
        description: 'Cebolas frescas, ideais para temperar e realçar o sabor das refeições.',
        producer: 'Produtor G',
        category: 'Vegetais',
        nota: 4,
        reviews: [
          { id: '1', user: 'Roberta', rating: 4, comment: 'Cebolas frescas e de boa qualidade.' },
          { id: '2', user: 'Bruno', rating: 4, comment: 'Muito boas, mas algumas estavam pequenas.' }
        ]
      },
      {
        id: '8',
        image: require('../src/assets/produto.jpg'),
        title: 'Batata',
        price: 'R$ 6,00',
        description: 'Batatas selecionadas, versáteis e perfeitas para diversas receitas.',
        producer: 'Produtor H',
        category: 'Vegetais',
        isFavorite: true,
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Marcos', rating: 4, comment: 'Batatas boas, bem selecionadas.' },
          { id: '2', user: 'Laura', rating: 5, comment: 'Perfeitas para fritar e cozinhar.' }
        ]
      },
      {
        id: '9',
        image: require('../src/assets/produto.jpg'),
        title: 'Cenoura',
        price: 'R$ 4,20',
        description: 'Cenouras frescas e crocantes, ricas em vitaminas e antioxidantes.',
        producer: 'Produtor I',
        category: 'Vegetais',
        nota: 4.5,
        reviews: [
          { id: '1', user: 'Gustavo', rating: 5, comment: 'Cenouras ótimas, bem frescas.' },
          { id: '2', user: 'Fernanda', rating: 4, comment: 'Boa qualidade, mas algumas estavam finas.' }
        ]
      },
      {
        id: '12',
        image: require('../src/assets/produto.jpg'),
        title: 'Alface',
        price: 'R$ 2,50',
        description: 'Alface fresca e crocante, ideal para saladas e sanduíches.',
        producer: 'Produtor L',
        category: 'Vegetais',
        isFavorite: true,
        nota: 4,
        reviews: [
          { id: '1', user: 'José', rating: 4, comment: 'Alface muito boa, bem crocante.' },
          { id: '2', user: 'Luciana', rating: 4, comment: 'Gostei, mas algumas folhas estavam murchas.' }
        ]
      }
    ]
  };
  
export default PRODUCTS;
  