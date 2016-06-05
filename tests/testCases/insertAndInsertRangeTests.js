module('List#insert and List#insertRange');
test('Insert and insertRange should insert items into a list.', function () {
	var list = new List(['Mustang', 'Mustang GT', 'Shelby GT500']);

	list.insert(1, 'Camaro');
	deepEqual(list.toArray(), ['Mustang', 'Camaro', 'Mustang GT', 'Shelby GT500'], 'Insert inserts a single item at the specified position.');

	list.insertRange(3, ['Challenger', 'Charger']);
	deepEqual(list.toArray(), ['Mustang', 'Camaro', 'Mustang GT', 'Challenger', 'Charger', 'Shelby GT500'], 'InsertRange inserts multiple items at the specified position.');
});