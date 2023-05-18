var inventory = [];

document.getElementById('item-form').addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();

    var itemName = document.getElementById('item-name').value;
    var itemQuantity = parseInt(document.getElementById('item-quantity').value);

    var existingItem = findExistingItem(itemName);
    if (existingItem) {
        existingItem.quantity += itemQuantity;
    } else {
        var newItem = { itemName: itemName, quantity: itemQuantity };
        inventory.push(newItem);
    }

    updateInventoryTable();

    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
}

function findExistingItem(itemName) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].itemName === itemName) {
            return inventory[i];
        }
    }
    return null;
}

// ...

function updateInventoryTable() {
    var table = document.getElementById('inventory-table');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing tbody content

    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];

        var row = tbody.insertRow(-1);

        var itemNameCell = row.insertCell(0);
        itemNameCell.textContent = item.itemName;

        var itemQuantityCell = row.insertCell(1);
        itemQuantityCell.textContent = item.quantity;

        var itemActionsCell = row.insertCell(2);
        var minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', createUpdateQuantityHandler(row, item, -1));
        itemActionsCell.appendChild(minusButton);

        var plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', createUpdateQuantityHandler(row, item, 1));
        itemActionsCell.appendChild(plusButton);
    }
}

function createUpdateQuantityHandler(row, item, quantityChange) {
    return function () {
        updateItemQuantity(row, item, quantityChange);
    };
}

// ...

function updateItemQuantity(row, item, quantityChange) {
    item.quantity += quantityChange;
    if (item.quantity < 0) {
        item.quantity = 0;
    }
    row.cells[1].textContent = item.quantity;
}

window.addEventListener('load', function () {
    // Example initial items
    inventory.push({ itemName: 'Blue Roll', quantity: 0 });
    inventory.push({ itemName: 'Cups', quantity: 0 });
    inventory.push({ itemName: 'Napkins', quantity: 0 });
    inventory.push({ itemName: 'Lids', quantity: 0 });

    updateInventoryTable();
});
