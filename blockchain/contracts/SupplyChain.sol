// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// This contract allows users to create and update products, 
// and also maintains a history of which addresses have interacted 
// with each product. This can provide transparency into the supply 
// chain by allowing users to see which entities have handled a product 
// at different stages of its life cycle.

contract SupplyChain {

    // Map of product IDs to product information
    mapping(uint => Product) public products;

    struct Ingredient {
        // The name of the ingredient
        string name;
        // The name of the supplier
        string supplierName;
        // Is the supplier of the ingredient certified
        bool isCertifiedSupplier;
    }

    // Struct to represent a product
    struct Product {
        // Name of the product
        string name;
        // Timestamp of when the product was created
        uint createdAt;
        // Timestamp of when the product was last updated
        uint updatedAt;
        // Current owner of the product
        address owner;
        // List of ingredients
        // Ingredient[] ingredients;
        // Is the product active
        bool isActive;
    }

    // Event to be emitted when a product is created or updated
    event ProductUpdated(
        uint indexed id,
        string name,
        uint createdAt,
        uint updatedAt,
        address owner,
        bool isActive
    );

    // Event to be emitted when a product transfers ownership
    event ProductOwnershipTransfered(
        uint indexed id,
        string name,
        address newOwner,
        uint updatedAt
    );

    // A modifier that only allows the product owner to interact with a specific function
    modifier onlyProductOwner(uint _id) {
        Product storage product = products[_id];
        require(product.owner == msg.sender, "Function can only be called by product owner!");
        _;
    }

    // Function to create a new product
    function createProduct(string memory _name) public {
        // Generate a random ID for the product
        uint id = uint(keccak256(abi.encodePacked(_name, block.timestamp)));
        // Create a new product with the given name and the current timestamp
        // products[id] = Product(_name, block.timestamp, block.timestamp, msg.sender, new Ingredient[](0), true);
        products[id] = Product(_name, block.timestamp, block.timestamp, msg.sender, true);
        // Emit an event to let clients know that the product was created
        emit ProductUpdated(id, _name, block.timestamp, block.timestamp, msg.sender, true);
    }

    // Function to update a product
    function updateProduct(uint _id, string memory _name, bool _isActive) public onlyProductOwner(_id) {
        // Retrieve the product from the mapping
        Product storage product = products[_id];
        // Update the product's name, updatedAt timestamp and isActive flag
        product.name = _name;
        product.updatedAt = block.timestamp;
        product.isActive = _isActive;
        // Emit an event to let clients know that the product was updated
        emit ProductUpdated(_id, _name, product.createdAt, block.timestamp, msg.sender, _isActive);
    }

    // Function to add an address to a product's history
    function transferOwnership(uint _id, address _newOwner) public onlyProductOwner(_id) {
        // Retrieve the product from the mapping
        Product storage _product = products[_id];
        // Update the product owner
        _product.owner = _newOwner;
        emit ProductOwnershipTransfered(_id, _product.name, _newOwner, block.timestamp);
    }

}
