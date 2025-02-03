const MINHAS_COMPRAS = [
    { 
        id: '1', 
        title: 'Milho-Verde', 
        category: 'Cereal', 
        farm: 'João Silva', 
        price: 'R$ 9,00', 
        quantidade: '2', 
        status: 'Pedido Concluído', 
        image: require('../src/assets/produto.jpg'), 
        showAvaliarButton: false, 
        pagamento: {
            tipo: 'Cartão de Crédito',
            dataPedido: '12/01/2025',
            dataPagamento: '12/01/2025',
            dataEntrega: '15/01/2025',
        },
        entrega: {
            endereco: 'Rua das Flores, 123, Centro, São Paulo - SP, 01000-000',
            tipoEntrega: 'Padrão',
            usuario: 'João Silva',
            telefone: '(11) 98765-4321',
        },
    },
    { 
        id: '2', 
        title: 'Manga', 
        category: 'Fruta', 
        farm: 'Verde Campo', 
        price: 'R$ 6,00', 
        quantidade: '3', 
        status: 'Pedido Concluído', 
        image: require('../src/assets/produto.jpg'), 
        showAvaliarButton: false, 
        pagamento: {
            tipo: 'Cartão de Crédito',
            dataPedido: '12/01/2025',
            dataPagamento: '12/01/2025',
            dataEntrega: '15/01/2025',
        },
        entrega: {
            endereco: 'Rua das Flores, 123, Centro, São Paulo - SP, 01000-000',
            tipoEntrega: 'Padrão',
            usuario: 'João Silva',
            telefone: '(11) 98765-4321',
        },
    },
];

export default MINHAS_COMPRAS;
