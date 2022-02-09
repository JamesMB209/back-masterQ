/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventory').del()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        {business_id: 1, drug: 'Pixel', dosage: '1000', stock: 500, price: 10, cost: 5},
        {business_id: 1, drug: 'Molly', dosage: '500', stock: 5000, price: 30, cost: 10},
        {business_id: 1, drug: 'Rabbit\'s Foot', dosage: '200', stock: 300, price: 20, cost: 10},
        {business_id: 1, drug: 'Crocodile Tears', dosage: '700', stock: 200, price: 40, cost: 12},
        {business_id: 1, drug: 'Acid', dosage: '100', stock: 200, price: 40, cost: 12},
        {business_id: 1, drug: 'LSD', dosage: '200', stock: 200, price: 50, cost: 32},
        {business_id: 1, drug: 'MDMA', dosage: '600', stock: 500, price: 50, cost: 31},
      ]);
    });
};
