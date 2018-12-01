/* global $ */

const produtos = [
  { cor: 'Plum',
    nome: 'Limpeza',
    items: ['Omo',
      'Veja',
      'Vanish',
      'Esponja',
      'Saco de lixo',
      'Detergente',
      'Álcool'] },
  { cor: 'LightSalmon',
    nome: 'Frutas e Verduras',
    items: ['Cebola',
      'Tomate',
      'Aspargos',
      'Alho',
      'Alface',
      'Legumes p/ Sopa',
      'Banana',
      'Maçã',
      'Abacate'] },
  { cor: 'PaleGreen',
    nome: 'Massas e Cereais',
    items: ['Arroz',
      'Kome',
      'Macarrão',
      'Farinha de Trigo',
      'Tofu',
      'Massa de Tomate'] },
  { cor: 'Aqua',
    nome: 'Frios e Congelados',
    items: ['Presunto',
      'Peito de Peru',
      'Mussarela',
      'Waffle',
      'Pizza',
      'Massa de Pizza',
      'Iogurte',
      'Actimel',
      'Suco de Laranja',
      'Suco de Uva'] }
];

//  $('.group-container').append('<div class="group cell limp"></div>');
//  produtos.forEach(grupo => {
for (let i = 0; i < produtos.length; i++) {
  let grupo = produtos[i];
  $('.group-container').append('<div class="group cell" id="' + grupo.nome +
                                '"></div>');
  console.log('ready: ' + grupo.nome);
  $('#' + grupo.nome).append('<h3>' + grupo.nome + '</h3>');
  $('#' + grupo.nome).css('background-color', grupo.cor);
}
