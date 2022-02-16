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
        {business_id: 1, drug: 'Melatonin', dosage: '1000', stock: 500, price: 10, cost: 5},
        {business_id: 1, drug: 'Jardiance', dosage: '500', stock: 5000, price: 30, cost: 10},
        {business_id: 1, drug: 'Ativan', dosage: '200', stock: 300, price: 20, cost: 10},
        {business_id: 1, drug: 'Benzonatate', dosage: '700', stock: 200, price: 40, cost: 12},
        {business_id: 1, drug: 'Methadone', dosage: '100', stock: 200, price: 40, cost: 12},
        {business_id: 1, drug: 'Onpattro', dosage: '200', stock: 200, price: 50, cost: 32},
        {business_id: 1, drug: 'Ibuprofen', dosage: '600', stock: 500, price: 50, cost: 31},
        {business_id: 1, drug: 'Naloxone', dosage: '600', stock: 100, price: 100, cost: 38},
        {business_id: 1, drug: 'Metoprolol', dosage: '200', stock: 200, price: 50, cost: 19},
        {business_id: 1, drug: 'Entyvio', dosage: '800', stock: 200, price: 50, cost: 19},
        {business_id: 1, drug: 'Cyclobenzaprine', dosage: '600', stock: 250, price: 30, cost: 19},
      ]);
    });
};
