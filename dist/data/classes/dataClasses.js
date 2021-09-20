class DataTable {
    #items
    #itemsIdCounter
    constructor() {
        this.#items = []
        this.#itemsIdCounter = 0
    }

    #isNewItem = (itemName) => {
        let array = this.#items.filter(item => item.name === itemName)
        return array.length > 0 ? false : true
    }

    addItem = (itemName) => {
        if (this.#isNewItem(itemName)) {
            let newItem = { id: this.#itemsIdCounter++, name: itemName }
            this.#items.push(newItem)
            return newItem.id
        } else {
            let item = this.#items.find(item => item.name === itemName)
            return item.id
        }
    }

    getItemName = id => this.#items.find(item => item.id === id) && this.#items.find(item => item.id === id).name
    getItemId = name => this.#items.find(item => item.name.toUpperCase()  === name.toUpperCase()) && this.#items.find(item => item.name.toUpperCase()  === name.toUpperCase()).id
    getItems = () => this.#items
}


module.exports = DataTable