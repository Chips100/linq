module('List#reverse');
test('Reverse should reverse the items of a list.', function () {
	var list = new List(['Mustang', 'Camaro', 'Mustang GT', 'Challenger', 'Charger', 'Shelby GT500']);

	list.reverse();
	deepEqual(list.toArray(), ['Shelby GT500', 'Charger', 'Challenger', 'Mustang GT', 'Camaro', 'Mustang'], 'Reverses the complete list.');
});

test('Reverse should reverse the items in a specified range of a list.', function () {
	var list = new List(['Mustang', 'Camaro', 'Mustang GT', 'Challenger', 'Charger', 'Shelby GT500']);

	list.reverse(2, 3);
	deepEqual(list.toArray(), ['Mustang', 'Camaro', 'Charger', 'Challenger', 'Mustang GT', 'Shelby GT500'], 'Reverses the items in the specified range of the list.');
});